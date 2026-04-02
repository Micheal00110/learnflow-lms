# Frontend UI - Visual Guide

## Page Layouts Overview

### 🏠 Home Page
```
┌─────────────────────────────────────┐
│        NAVBAR (Fixed Top)           │
├─────────────────────────────────────┤
│                                     │
│        HERO SECTION                 │
│     (Gradient Background)           │
│      Call-to-Action Buttons         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  STATS GRID (4 Cards)               │
│  [Courses] [Students] [Certs] [★]  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  BROWSE BY CATEGORY                 │
│  [Dev] [Design] [Business] [Mkt]   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  FEATURED COURSES (3-Column Grid)   │
│  [Card] [Card] [Card]               │
│  [Card] [Card] [Card]               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  CTA SECTION                        │
│  "Ready to start learning?"         │
│                                     │
├─────────────────────────────────────┤
│        FOOTER (Multi-Column)        │
└─────────────────────────────────────┘
```

### 📚 Courses Page (NEW LAYOUT)
```
┌─────────────────────────────────────┐
│        NAVBAR (Fixed Top)           │
├─────────────────────────────────────┤
│  HEADER: "Explore Courses"          │
├─────────────────────────────────────┤
│                                     │
│  ┌────────┐  ┌──────────────────┐  │
│  │ FILTERS│  │  COURSE GRID     │  │
│  │        │  │  [C][C][C]       │  │
│  │ Search │  │  [C][C][C]       │  │
│  │ [____] │  │  [C][C][C]       │  │
│  │        │  │  [C][C][C]       │  │
│  │ Category│  │                  │  │
│  │ [▼____] │  │ Results: 24      │  │
│  │        │  │                  │  │
│  │ Level  │  │                  │  │
│  │ [▼____] │  │                  │  │
│  │        │  │                  │  │
│  │ [Search] │  │                  │  │
│  │ [Clear]  │  │                  │  │
│  └────────┘  └──────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│        FOOTER (Multi-Column)        │
└─────────────────────────────────────┘
```

### 📊 Dashboard Page (NEW LAYOUT)
```
┌─────────────────────────────────────┐
│        NAVBAR (Fixed Top)           │
├─────────────────────────────────────┤
│  Welcome back, John!                │
│  Continue where you left off        │
│                    [Create Course ▶]│
├─────────────────────────────────────┤
│                                     │
│  YOUR PROGRESS                      │
│  [📚 12]  [🏆 5]  [📜 3]  [⏱️ 45]  │
│  Courses  Complete Certs  Hours     │
│                                     │
├─────────────────────────────────────┤
│  CONTINUE LEARNING                  │
│                                     │
│  [Course 1]  [Course 2]  [Course 3] │
│  [████░░░░]  [██░░░░░░░] [███░░░░░] │
│   40% done    20% done     30% done  │
│                                     │
│  [Course 4]  [Course 5]  [Course 6] │
│  [████░░░░]  [██░░░░░░░] [████░░░░] │
│   40% done    20% done     40% done  │
│                                     │
│              [View All →]           │
│                                     │
├─────────────────────────────────────┤
│        FOOTER (Multi-Column)        │
└─────────────────────────────────────┘
```

## Component Structure

### Course Card
```
┌──────────────────────┐
│                      │
│    [Thumbnail]       │
│    50% Complete      │
│                      │
├──────────────────────┤
│ Course Title Here    │
│ Instructor Name      │
│ ★★★★★ (123 reviews) │
│ Price: $49.99        │
└──────────────────────┘
```

### Stats Card
```
┌──────────────────────┐
│ [🎓] Certificates    │
│                      │
│         12           │
│                      │
└──────────────────────┘
```

### Progress Bar
```
████████░░░░░░░░░░░░░░░
←─────────────→
   40% Complete
```

## Color Scheme

### Primary Colors
- **Primary Blue**: `#6366f1` (Logo, buttons, accents)
- **Clay Background**: `#f0ebe3` (Page background)
- **White Surface**: `#ffffff` (Cards, surfaces)
- **Dark Gray**: `#1f2937` (Text)

### Status Colors
- **Success/Complete**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

### Gradients
- **Primary Gradient**: Indigo to Purple
- **Hero Gradient**: Blue to Purple to Pink
- **Hover Gradient**: Subtle light gradient

## Typography Scale

```
Large Heading (h1):    32px / 2rem   (700 weight)
Section Heading (h2):  24px / 1.5rem (600 weight)
Subsection (h3):       20px / 1.25rem (600 weight)
Body Text:             14px / 0.875rem (400 weight)
Small Text:            12px / 0.75rem (400 weight)
Label:                 13px / 0.8125rem (600 weight)
```

## Spacing Grid (8px base)

```
xs: 4px   (0.25rem)
sm: 8px   (0.5rem)
md: 16px  (1rem)
lg: 24px  (1.5rem)
xl: 32px  (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
4xl: 96px (6rem)
```

## Responsive Breakpoints

```
Mobile:     320px - 640px    (sm)
Tablet:     768px - 1024px   (md, lg)
Desktop:    1024px+          (xl, 2xl)
Large:      1200px+          (container max-width)
```

## Button Variants

### Primary Button
```
[🎯 Explore Courses ▶]  (Blue gradient)
```

### Secondary Button
```
[Start Free]  (Light gray/white)
```

### Ghost Button
```
[View All ▶]  (No background, text only)
```

### Danger Button
```
[🗑️ Delete]  (Red gradient)
```

## Animation Types

### Fade In
- Duration: 400ms
- Easing: ease-out

### Slide Up
- Duration: 500ms
- Distance: 20px
- Easing: ease-out

### Slide Down
- Duration: 300ms
- Distance: 10px
- Easing: ease-out

### Scale In
- Duration: 300ms
- Scale: 0.95 → 1
- Easing: ease-out

### Hover Effects
- Translate: -2px (up)
- Shadow: Increased
- Scale: 1.02x

## Shadow System

### Card Shadow
```
6px 6px 14px rgba(174,168,158,0.45),
-6px -6px 14px rgba(255,255,255,0.85),
inset 0 1px 0 rgba(255,255,255,0.95)
```

### Hover Shadow
```
10px 10px 22px rgba(174,168,158,0.45),
-10px -10px 22px rgba(255,255,255,0.85),
inset 0 1px 0 rgba(255,255,255,0.95)
```

### Glass Effect
```
background: rgba(255,255,255,0.12)
backdrop-filter: blur(20px) saturate(1.4)
border: 1px solid rgba(255,255,255,0.2)
```

## Mobile Responsive Adjustments

### Sidebar Filters (Courses Page)
- **Desktop**: Fixed sidebar + content
- **Mobile**: Stacked vertically
- **Tablet**: Inline filters

### Grid Layouts
- **Desktop**: 3 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column

### Typography
- **Desktop**: Full scale sizing
- **Tablet**: Slightly reduced
- **Mobile**: Compact sizing

### Spacing
- **Desktop**: Full spacing
- **Tablet**: Reduced 1.25x
- **Mobile**: Compact spacing

---

**Design System Version**: 1.0
**Last Updated**: April 1, 2026
