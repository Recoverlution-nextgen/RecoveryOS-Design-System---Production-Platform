# infiniteK Design System

**The design language of Recoverlution Platform**

---

## Core Philosophy

infiniteK is built on precision, clarity, and purposeful constraint. Every design decision serves the therapeutic mission: transformation through technology.

---

## THE ANCHOR RULE

### NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.

This is the **foundational principle** of infiniteK. It prevents visual clutter, maintains clear hierarchy, and ensures users can focus on content without container confusion.

### What This Means in Practice

✅ **CORRECT:**
```tsx
<div className="bg-white border border-gray-200 p-6">
  <h2 className="text-xl font-semibold">NaviCue Title</h2>
  <p className="mt-4">Content with clear hierarchy</p>
  <button className="mt-6 px-4 py-2 bg-primary text-white">
    Take Action
  </button>
</div>
```

❌ **INCORRECT:**
```tsx
<div className="bg-white border border-gray-200 p-6">
  <div className="border border-gray-300 p-4">
    {/* Nested border violates THE ANCHOR RULE */}
    <h2>Title</h2>
  </div>
</div>
```

### Alternatives to Nesting

When you need visual separation **inside** a container:

1. **Use Background Colors**
   ```tsx
   <div className="bg-white border border-gray-200 p-6">
     <div className="bg-gray-50 p-4">
       {/* Background color, no border */}
       <p>Content section</p>
     </div>
   </div>
   ```

2. **Use Spacing**
   ```tsx
   <div className="bg-white border border-gray-200 p-6">
     <section className="mb-6">
       <h3>Section One</h3>
     </section>
     <section>
       <h3>Section Two</h3>
     </section>
   </div>
   ```

3. **Use Typography Hierarchy**
   ```tsx
   <div className="bg-white border border-gray-200 p-6">
     <h2 className="text-xl font-bold">Main Title</h2>
     <h3 className="text-lg font-semibold mt-4">Subsection</h3>
     <p className="mt-2">Content</p>
   </div>
   ```

4. **Use Dividers**
   ```tsx
   <div className="bg-white border border-gray-200 p-6">
     <section>
       <h3>Section One</h3>
       <p>Content</p>
     </section>
     <hr className="my-6 border-gray-200" />
     <section>
       <h3>Section Two</h3>
       <p>Content</p>
     </section>
   </div>
   ```

---

## Non-Negotiable Rules

### 1. No Emojis
**Never use emojis anywhere in the application.**

❌ WRONG: "Great work! 🎉"
✅ RIGHT: "Great work"

**Why:** Emojis undermine professional credibility and can be culturally ambiguous. infiniteK communicates through precise language, not pictographs.

### 2. No Dashes in UI Copy
**Avoid dashes in user-facing content.**

❌ WRONG: "Audio recording - complete"
✅ RIGHT: "Audio recording complete"

❌ WRONG: "Foundation tier - £99"
✅ RIGHT: "Foundation tier: £99"

**Why:** Dashes create visual noise. Use colons, commas, or restructure sentences.

**Exception:** Dashes are acceptable in technical documentation, URLs, and file names.

### 3. No Rounded Corners
**All UI elements use sharp, geometric corners.**

❌ WRONG: `className="rounded-lg"`
✅ RIGHT: `className=""`

❌ WRONG: `border-radius: 8px;`
✅ RIGHT: `border-radius: 0;`

**Why:** Sharp corners create a distinctive, precise aesthetic that aligns with therapeutic clarity and focus.

### 4. No Minimizing Words
**Write complete, clear sentences. Avoid abbreviations unless standard.**

❌ WRONG: "Info"
✅ RIGHT: "Information"

❌ WRONG: "Config"
✅ RIGHT: "Configuration"

❌ WRONG: "Rec'd"
✅ RIGHT: "Received"

**Acceptable abbreviations:** API, URL, HTTP, ID, UI, UX (industry standard)

**Why:** Clarity over brevity. Users should never have to guess what truncated text means.

---

## Brand Colors

### Primary Palette

```css
:root {
  --primary: #3E2BB8;      /* Deep Purple - Primary brand color */
  --primary-accent: #5739FB; /* Vibrant Purple - Accent color */
  
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  
  --white: #FFFFFF;
  --black: #000000;
}
```

### Color Usage

**Primary (`#3E2BB8`):**
- Primary buttons
- Active navigation items
- Links
- Important headings
- Key icons

**Accent (`#5739FB`):**
- Hover states
- Secondary buttons
- Highlights
- Progress indicators
- Success states

**Grayscale:**
- Text (gray-900, gray-700, gray-600)
- Borders (gray-200, gray-300)
- Backgrounds (gray-50, gray-100)
- Disabled states (gray-400)

### Color Accessibility

**Contrast Requirements (WCAG 2.1 AA):**
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

**Approved Combinations:**
- Primary (#3E2BB8) on White (#FFFFFF): ✅ 8.2:1
- Gray-900 (#111827) on White (#FFFFFF): ✅ 16.7:1
- Gray-700 (#374151) on White (#FFFFFF): ✅ 10.5:1
- White (#FFFFFF) on Primary (#3E2BB8): ✅ 8.2:1

---

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Helvetica Neue', Arial, sans-serif;
```

**Why system fonts:** Performance, familiarity, native feel across platforms.

### Type Scale

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Hierarchy Examples

```tsx
// Page Title
<h1 className="text-4xl font-bold" style={{ color: '#3E2BB8' }}>
  Sound Bites
</h1>

// Section Heading
<h2 className="text-2xl font-semibold text-gray-900">
  Your Voice
</h2>

// Subsection
<h3 className="text-xl font-semibold text-gray-800">
  Recent Recordings
</h3>

// Body Text
<p className="text-base text-gray-700">
  Regular paragraph content
</p>

// Small Text
<span className="text-sm text-gray-600">
  Supplementary information
</span>
```

---

## Spacing System

### Scale

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-24: 6rem;     /* 96px */
```

### Usage Guidelines

**Component Internal Spacing:**
- Tight: 4px-8px (spacing-1 to spacing-2)
- Normal: 16px-24px (spacing-4 to spacing-6)
- Loose: 32px-48px (spacing-8 to spacing-12)

**Component External Spacing:**
- Between elements: 16px-32px (spacing-4 to spacing-8)
- Between sections: 48px-64px (spacing-12 to spacing-16)

---

## Components

### Buttons

```tsx
// Primary Button
<button 
  className="px-6 py-3 text-base font-semibold text-white"
  style={{ backgroundColor: '#3E2BB8' }}
>
  Primary Action
</button>

// Secondary Button
<button 
  className="px-6 py-3 text-base font-semibold border-2 text-gray-900"
  style={{ borderColor: '#3E2BB8' }}
>
  Secondary Action
</button>

// Disabled Button
<button 
  className="px-6 py-3 text-base font-semibold text-white bg-gray-400"
  disabled
>
  Disabled
</button>
```

**States:**
- Default: As shown above
- Hover: Darken primary by 10%, or use accent color
- Active: Darken by 15%
- Focus: 2px outline in accent color
- Disabled: Gray-400 background, gray-600 text

### Cards

```tsx
// Standard Card (respects THE ANCHOR RULE)
<div className="bg-white border border-gray-200 p-6">
  <h3 className="text-xl font-semibold text-gray-900">
    Card Title
  </h3>
  <p className="mt-4 text-gray-700">
    Card content goes here
  </p>
  <button 
    className="mt-6 px-4 py-2 text-white font-semibold"
    style={{ backgroundColor: '#3E2BB8' }}
  >
    Action
  </button>
</div>
```

### Forms

```tsx
// Input Field
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email Address
  </label>
  <input
    type="email"
    className="w-full px-4 py-2 border border-gray-300 focus:outline-none"
    style={{ borderColor: '#3E2BB8' }} // On focus
    placeholder="you@example.com"
  />
</div>

// Text Area
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Description
  </label>
  <textarea
    rows={4}
    className="w-full px-4 py-2 border border-gray-300 focus:outline-none"
    style={{ borderColor: '#3E2BB8' }} // On focus
  />
</div>

// Checkbox
<label className="flex items-center">
  <input
    type="checkbox"
    className="w-5 h-5 border-gray-300"
    style={{ accentColor: '#3E2BB8' }}
  />
  <span className="ml-3 text-gray-700">I agree to the terms</span>
</label>
```

### Navigation

```tsx
// Top Navigation
<nav className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold" style={{ color: '#3E2BB8' }}>
        Recoverlution
      </div>
      <div className="flex space-x-6">
        <a href="#" className="text-gray-700 hover:text-primary">
          Dashboard
        </a>
        <a href="#" className="text-gray-700 hover:text-primary">
          Sound Bites
        </a>
        <a href="#" className="text-gray-700 hover:text-primary">
          NaviCues
        </a>
      </div>
    </div>
  </div>
</nav>
```

---

## Layout Principles

### Grid System

**12-column grid for desktop, 4-column for mobile**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## Motion & Animation

**Principle:** Purposeful, subtle, fast.

### Timing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Durations

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
```

### Example Transitions

```tsx
// Button hover
<button 
  className="transition-all duration-250"
  style={{ 
    backgroundColor: '#3E2BB8',
    transitionProperty: 'background-color, transform'
  }}
>
  Hover Me
</button>

// Fade in
<div 
  className="opacity-0 animate-fade-in"
  style={{
    animation: 'fadeIn 250ms ease-out forwards'
  }}
>
  Content
</div>
```

---

## Icons

**Use:** Lucide React (consistent, sharp, professional)

```tsx
import { Home, User, Settings } from 'lucide-react';

<Home size={24} color="#3E2BB8" strokeWidth={2} />
```

**Guidelines:**
- Default size: 24px
- Stroke width: 2px
- Color: Match surrounding text or use primary/accent
- Never use rounded icons (conflicts with no-rounded-corners rule)

---

## Accessibility

### Focus States

All interactive elements must have visible focus states:

```tsx
<button className="focus:outline-none focus:ring-2" style={{ ringColor: '#5739FB' }}>
  Accessible Button
</button>
```

### Screen Readers

Provide descriptive labels:

```tsx
<button aria-label="Close navigation menu">
  <X size={24} />
</button>
```

### Keyboard Navigation

Ensure all functionality is keyboard-accessible:
- Tab order follows visual order
- Enter/Space activates buttons
- Escape closes modals
- Arrow keys navigate lists

---

## Design Checklist

Before shipping any component:

- [ ] **THE ANCHOR RULE:** No nested bordered containers
- [ ] **No emojis** anywhere
- [ ] **No dashes** in UI copy
- [ ] **No rounded corners** on any elements
- [ ] **Complete words** (no unnecessary abbreviations)
- [ ] **Brand colors** used correctly (#3E2BB8, #5739FB)
- [ ] **Proper spacing** from spacing scale
- [ ] **Typography hierarchy** clear and consistent
- [ ] **Focus states** visible and accessible
- [ ] **Color contrast** meets WCAG AA standards
- [ ] **Keyboard navigation** fully functional
- [ ] **Responsive** across all breakpoints

---

**infiniteK: Precision. Clarity. Purpose.**