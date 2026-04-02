# LearnFlow LMS - Frontend Setup

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+

## Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` if needed:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_APP_NAME=LearnFlow
   VITE_APP_VERSION=1.0.0
   ```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Features:**
- Hot module replacement (HMR) for instant updates
- API proxy to `http://localhost:8000`
- TypeScript type checking

## Production Build

Create an optimized production build:
```bash
npm run build
```

The build is output to `dist/` with:
- Separate vendor chunks (React, Query, UI libraries)
- Minified CSS and JavaScript
- Optimized images and assets

Preview the production build:
```bash
npm run preview
```

## Key Technologies

- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first styling
- **React Router v6**: Client-side routing
- **Zustand**: State management
- **React Query**: Server state management
- **Framer Motion**: Animations
- **React Hook Form**: Form handling
- **Axios**: HTTP client

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── layout/       # Layout components (Navbar, Footer)
│   └── ui/           # UI components (Skeleton, Spinner)
├── pages/            # Page components (routes)
├── services/         # API client and services
├── stores/           # Zustand stores (auth)
├── lib/              # Utility functions
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Design System

The app uses a **Clay Neumorphism** design system featuring:
- Soft shadows and highlights
- Rounded corners and smooth surfaces
- Beige/clay color palette
- Smooth animations and transitions
- Responsive grid layouts

## API Integration

The frontend connects to a Laravel backend API:
- **Base URL**: `http://localhost:8000/api`
- **Authentication**: JWT Bearer tokens
- **State Management**: Zustand + React Query

## Features

### Authentication
- Student, Instructor, and Admin roles
- JWT token-based authentication
- Protected routes with role-based access

### Course Browsing
- Search and filter courses
- Category and level filtering
- Course detail pages
- Ratings and reviews

### Learning
- Progress tracking
- Video player integration
- Quiz system
- Certificate generation

### Dashboard
- Personal stats (enrollments, progress, certificates)
- Continue learning section
- Course recommendations

### Instructor Tools
- Course creation interface
- Student management
- Performance analytics

## Performance

- **Bundle Size**: ~790KB gzipped (code-split)
- **Optimizations**:
  - Code splitting by vendor
  - Lazy loading routes
  - Image optimization
  - CSS minification
  - JavaScript minification

## Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| Mobile  | ✅ Responsive |

## Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- --port 3001
```

### API connection issues
- Ensure backend is running on `http://localhost:8000`
- Check `.env.local` for correct `VITE_API_URL`
- Verify CORS configuration on backend

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Contributing

1. Create a feature branch
2. Make changes and test
3. Build for production
4. Submit pull request

## Deployment

### Docker
```bash
docker build -f Dockerfile -t learnflow-frontend .
docker run -p 3000:3000 learnflow-frontend
```

### Static Hosting (Vercel, Netlify, etc.)
```bash
npm run build
# Deploy `dist/` folder
```

---

**Version**: 1.0.0
**Last Updated**: April 1, 2026
