# 🎯 Frontend Quick Reference - New Backend Features

## 🔑 MANDATORY: Idempotency Keys

**ALL write operations (POST/PUT/PATCH/DELETE) now require:**
```typescript
headers: {
  'Idempotency-Key': crypto.randomUUID(), // or any unique 16-128 char string
}
```

**Why?** Prevents duplicate operations if request is retried.  
**Safe to retry?** Yes! Same key = same cached response.

---

## 📬 New Notifications API

### **Get Unread Notifications**
```typescript
GET /make-server-49b28b8a/notifications/unread
Headers: Authorization: Bearer {token}

Response:
{
  "notifications": [
    {
      "id": "uuid",
      "individual_id": "uuid",
      "notification_type": "journey_completed",
      "title": "Journey Complete!",
      "body": "You completed Sprint 1",
      "action_url": "/journey/abc",
      "is_read": false,
      "created_at": "2026-01-09T10:00:00Z"
    }
  ],
  "count": 5
}
```

### **Mark as Read**
```typescript
POST /make-server-49b28b8a/notifications/read
Headers: 
  Authorization: Bearer {token}
  Idempotency-Key: {uuid}
Body: { "id": "notification-uuid" }

Response: { "success": true, "notification": {...} }
```

### **Acknowledge Delivery**
```typescript
POST /make-server-49b28b8a/notifications/ack
Headers:
  Authorization: Bearer {token}
  Idempotency-Key: {uuid}
Body: { "outbox_id": "uuid" }

Response: { "success": true, "delivery": {...} }
```

---

## 🔄 Realtime Subscriptions

### **User Notifications (REALTIME)**
```typescript
const channel = supabase
  .channel(`user:${profileId}:notifications`, { config: { private: true } })
  .on('postgres_changes', 
    { 
      event: '*', 
      schema: 'public', 
      table: 'in_app_notifications',
      filter: `individual_id=eq.${profileId}`
    },
    (payload) => {
      // New notification arrived!
      const notification = payload.new;
      showToast(notification.title);
      refetchNotifications();
    }
  )
  .subscribe();
```

### **User Feed Updates (REALTIME)**
```typescript
const channel = supabase
  .channel(`user:${profileId}:feed`, { config: { private: true } })
  .on('postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'user_feed_queue_v2',
      filter: `individual_id=eq.${profileId}`
    },
    (payload) => {
      // Feed updated!
      refetchFeed();
    }
  )
  .subscribe();
```

### **Room Messages (REALTIME)**
```typescript
const channel = supabase
  .channel(`room:${roomId}:messages`, { config: { private: true } })
  .on('postgres_changes',
    { event: 'INSERT', schema: 'realtime', table: 'messages' },
    (payload) => {
      // New message in room
      addMessage(payload.new);
    }
  )
  .subscribe();
```

### **Org Announcements (REALTIME)**
```typescript
const channel = supabase
  .channel(`org:${orgId}:notifications`, { config: { private: true } })
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'org_announcements' },
    (payload) => {
      // Org-wide update
      showBanner(payload.new);
    }
  )
  .subscribe();
```

---

## 📊 Journey Status Endpoint (NEW)

### **Get Progress Without Full Scene Data**
```typescript
GET /make-server-49b28b8a/journey/instance/{instanceId}/status
Headers: Authorization: Bearer {token}

Response:
{
  "instance_id": "abc-123",
  "status": "active",
  "current_scene_number": 5,
  "next_scene_number": 6,
  "total_scenes": 13,
  "completed_scenes": 4,
  "progress_percent": 31,
  "started_at": "2026-01-09T10:00:00Z",
  "updated_at": "2026-01-09T12:30:00Z",
  "next_scene_available_at": "2026-01-10T10:00:00Z"
}
```

**Perfect for:**
- Progress bars
- Status badges
- Dashboard stats
- "Next scene unlocks in 6 hours" countdown

---

## 🚨 NEW Error Responses

### **422 - Validation Failed** (NEW!)
```typescript
Response: 422
{
  "error": "Validation failed",
  "field_errors": [
    { "field": "email", "message": "email has invalid format" },
    { "field": "name", "message": "name is required" },
    { "field": "age", "message": "age must be at least 0" }
  ]
}
```

**How to handle:**
```typescript
if (response.status === 422) {
  const { field_errors } = await response.json();
  
  field_errors.forEach(({ field, message }) => {
    setFieldError(field, message);
  });
}
```

### **Other Errors:**
- `400` - Bad Request (malformed JSON, invalid syntax)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (valid token but no permission)
- `404` - Not Found
- `500` - Internal Server Error

---

## ✅ INTEGRATION CHECKLIST

### **Step 1: Add Idempotency Keys**
```typescript
// ❌ BEFORE (will fail now)
fetch('/api/journey/start', {
  method: 'POST',
  body: JSON.stringify({ template_id: 'abc' })
});

// ✅ AFTER (required)
fetch('/api/journey/start', {
  method: 'POST',
  headers: {
    'Idempotency-Key': crypto.randomUUID(),
  },
  body: JSON.stringify({ template_id: 'abc' })
});
```

### **Step 2: Handle 422 Errors**
```typescript
const response = await fetch('/api/...');

if (response.status === 422) {
  const { field_errors } = await response.json();
  // Show field-specific errors in UI
  field_errors.forEach(err => {
    showFieldError(err.field, err.message);
  });
  return;
}
```

### **Step 3: Subscribe to Notifications**
```typescript
useEffect(() => {
  if (!profileId) return;

  const channel = supabase
    .channel(`user:${profileId}:notifications`)
    .on('postgres_changes', { ... }, handleNotification)
    .subscribe();

  return () => { channel.unsubscribe(); };
}, [profileId]);
```

### **Step 4: Use Journey Status**
```typescript
const { data: status } = useSWR(
  `/api/journey/instance/${instanceId}/status`,
  fetcher,
  { refreshInterval: 30000 } // Poll every 30s
);

// Show progress: {status.completed_scenes} / {status.total_scenes}
// Show percent: {status.progress_percent}%
```

---

## 🎨 UI Components to Build

### **Notification Bell**
```typescript
const [unread, setUnread] = useState([]);

// Fetch on mount
useEffect(() => {
  fetch('/api/notifications/unread')
    .then(r => r.json())
    .then(data => setUnread(data.notifications));
}, []);

// Subscribe to realtime
useEffect(() => {
  const channel = supabase
    .channel(`user:${profileId}:notifications`)
    .on('postgres_changes', { ... }, (payload) => {
      setUnread(prev => [payload.new, ...prev]);
    })
    .subscribe();
    
  return () => channel.unsubscribe();
}, [profileId]);

// Mark as read on click
const markAsRead = async (id) => {
  await fetch('/api/notifications/read', {
    method: 'POST',
    headers: { 'Idempotency-Key': crypto.randomUUID() },
    body: JSON.stringify({ id })
  });
  
  setUnread(prev => prev.filter(n => n.id !== id));
};
```

### **Journey Progress Bar**
```typescript
const { data: status } = useSWR(`/api/journey/instance/${id}/status`);

return (
  <div>
    <div className="progress-bar">
      <div style={{ width: `${status?.progress_percent}%` }} />
    </div>
    <p>{status?.completed_scenes} / {status?.total_scenes} scenes complete</p>
    {status?.next_scene_available_at && (
      <p>Next scene unlocks: <Countdown to={status.next_scene_available_at} /></p>
    )}
  </div>
);
```

### **Field Validation Display**
```typescript
const [errors, setErrors] = useState({});

const handleSubmit = async (data) => {
  const response = await fetch('/api/...', {
    method: 'POST',
    headers: { 'Idempotency-Key': crypto.randomUUID() },
    body: JSON.stringify(data)
  });
  
  if (response.status === 422) {
    const { field_errors } = await response.json();
    const errorMap = {};
    field_errors.forEach(({ field, message }) => {
      errorMap[field] = message;
    });
    setErrors(errorMap);
    return;
  }
  
  // Success!
};

return (
  <form>
    <input name="email" />
    {errors.email && <span className="error">{errors.email}</span>}
    
    <input name="name" />
    {errors.name && <span className="error">{errors.name}</span>}
  </form>
);
```

---

## 🔧 Testing

### **Test Idempotency**
```bash
# Send same request twice with same key
KEY=$(uuidgen)

curl -X POST https://...supabase.co/functions/v1/make-server-49b28b8a/journey/start \
  -H "Authorization: Bearer $TOKEN" \
  -H "Idempotency-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"template_id":"abc-123"}'

# Second call should return cached response immediately
curl -X POST https://...supabase.co/functions/v1/make-server-49b28b8a/journey/start \
  -H "Authorization: Bearer $TOKEN" \
  -H "Idempotency-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"template_id":"abc-123"}'
```

### **Test Validation**
```bash
# Send invalid data
curl -X POST https://...supabase.co/functions/v1/make-server-49b28b8a/notifications/read \
  -H "Authorization: Bearer $TOKEN" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{"id":"not-a-uuid"}'

# Expect 422 with field_errors array
```

### **Test Realtime**
```javascript
// In browser console
const channel = supabase
  .channel('user:YOUR-PROFILE-ID:notifications')
  .on('postgres_changes', { ... }, console.log)
  .subscribe();

// Then insert a notification in SQL
// Should see it logged immediately
```

---

## 💡 Tips

1. **Generate UUIDs on client:** `crypto.randomUUID()` is built into modern browsers
2. **Store idempotency keys:** Save to localStorage if you need request history
3. **Retry logic:** Same key = safe to retry on network errors
4. **Realtime cleanup:** Always unsubscribe in useEffect cleanup
5. **Private channels:** Use `{ config: { private: true } }` for user/room/org topics
6. **Polling fallback:** Use SWR/React Query with `refreshInterval` as backup for realtime

---

## 📞 Questions?

Check:
- `/DEPLOYMENT_SUMMARY.md` - Full technical details
- `/supabase/functions/server/middleware/README.md` - Middleware docs
- Supabase Dashboard → Edge Functions → server → Logs - Request logs

Test endpoints:
```bash
https://wzeqlkbmqxlsjryidagf.supabase.co/functions/v1/make-server-49b28b8a/health
```
