// NAVIGATE TYPES
// Calendar, Meeting Finder, Alumni Feed

export interface CalendarEvent {
  id: string;
  user_id: string;
  
  // Event
  title: string;
  start_time: string;
  end_time: string;
  type: 'therapy' | 'support_group' | 'meeting' | 'personal';
  
  // Integration
  source: 'google_calendar' | 'apple_calendar' | 'manual';
  external_id?: string;
  
  // LUMA Integration
  luma_reminder_sent: boolean;
  luma_prep_navicue_delivered: boolean;
  
  created_at: string;
}

export interface Meeting {
  id: string;
  
  // Meeting Details
  name: string;
  type: '12_step' | 'SMART' | 'Refuge' | 'other';
  format: 'in_person' | 'virtual' | 'hybrid';
  
  // Location
  address?: string;
  virtual_link?: string;
  lat?: number;
  lng?: number;
  
  // Schedule
  schedule: {
    day: string; // 'monday', 'tuesday', etc.
    time: string; // '19:00'
    frequency: 'weekly' | 'daily' | 'monthly';
  };
  
  // Details
  description: string;
  accessibility: string[];
  
  created_at: string;
}

export interface AlumniPost {
  id: string;
  user_id: string;
  
  // Post
  content: string;
  created_at: string;
  
  // Engagement
  likes: number;
  comments: number;
  
  // Moderation
  flagged: boolean;
  approved: boolean;
}
