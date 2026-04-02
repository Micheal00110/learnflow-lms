# TODO: Fix Page Section Layout Misarrangements

## Goal
Create unified section rhythm across all pages to fix 'miss arranged' content layouts. Use consistent `py-4/5rem` sections with proper headers for smooth scrolling and visual harmony.

## Steps (Will update ✓ as completed)

### 1. **CSS Foundation** (Priority: High) ✓
- [x] Add `.section`, `.section-header`, `.section-title`, `.section-subtitle`, `.content-grid` utilities to `frontend/src/index.css`
- [x] Standardize `.container-app { padding-left/right only }` (no vertical py)

### 2. **Layout Wrapper** (Priority: High) ✓
- [x] Update `frontend/src/components/layout/Layout.tsx`: `<main className=\"pt-16\">` (sections handle spacing)

### 3. **Page Refactors** (Priority: High → Low)
- [x] **Dashboard.tsx** (Open tab): Header → `.section-header`, Actions/Stats/Continue → `.section` ✓
- [ ] **Courses.tsx** (Open tab): Header → `.section-header`, Filters+Grid → `.section`
- [ ] **Home.tsx**: Hero (no section) + Stats/Categories/Featured/CTA → `.section`
- [ ] **CreateCourse.tsx**, **Login/Register**: Form/Auth → `.section`
  
### 4. **Polish & Test**
- [ ] Test: `cd frontend && npm run dev` → verify smooth section rhythm
- [ ] Mobile test: Chrome DevTools
- [ ] Lighthouse: Layout Shift <0.1

### 5. **Completion**
- [ ] Update DESIGN_SYSTEM.md/UI_IMPROVEMENTS.md
- [ ] `attempt_completion` with `npm run dev` command

**Progress: 2/10 ✓** | **Next: Dashboard.tsx layout fix**
