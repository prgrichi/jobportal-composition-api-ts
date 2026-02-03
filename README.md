# TYPESCRIPT INTEGRATION

WIP

# MIGRATION TO COMPOSITION API

DONE

# 🎯 Job Portal - Vue.js Application

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vuedotjs&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0-ffd859?logo=pinia&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12-ffca28?logo=firebase&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![Dark Mode](https://img.shields.io/badge/🌓_Dark_Mode-✓-000000)

A modern job board application built with Vue 3, Firebase, and Tailwind CSS. Users can browse job listings, filter by location and level, save favorites, and manage their applications.

[![Deploy Status](https://github.com/prgrichi/jobportal/actions/workflows/deploy.yml/badge.svg)](https://github.com/prgrichi/jobportal/actions)

🚀 **Live Demo:**

- **Firebase Hosting:** https://jobportal-8a79b.web.app/
- **Custom Domain:** https://jobportal.richardholzner.de

## 🛠️ Tech Stack

| Category             | Technology                  |
| -------------------- | --------------------------- |
| **Framework**        | Vue 3 (Options API)         |
| **State Management** | Pinia                       |
| **Backend**          | Firebase (Auth + Firestore) |
| **Routing**          | Vue Router 4                |
| **Styling**          | Tailwind CSS                |
| **Form Validation**  | VeeValidate + Yup           |
| **Build Tool**       | Vite                        |
| **Icons**            | Heroicons                   |
| **i18n**             | vue-i18n                    |
| **Deployment**       | Firebase Hosting            |
| **CI/CD**            | GitHub Actions              |

## 🌓 Dark Mode Support

Seamless dark mode with system preference detection and manual toggle.

<table>
  <tr>
    <td width="50%"><b>☀️ Light Mode</b></td>
    <td width="50%"><b>🌙 Dark Mode</b></td>
  </tr>
  <tr>
    <td><img src="./screenshots/homepage.png" alt="Light Mode"/></td>
    <td><img src="./screenshots/homepage-darkmode.png" alt="Dark Mode"/></td>
  </tr>
    <tr>
    <td><img src="./screenshots/jobdetails.png" alt="Light Mode"/></td>
    <td><img src="./screenshots/jobdetails-darkmode.png" alt="Dark Mode"/></td>
  </tr>

</table>

## ✨ Features

### 🌓 Dark Mode & Theming

- **Full Dark Mode Support** - Seamless light/dark theme switching
- **System Preference Detection** - Automatically detects `prefers-color-scheme`
- **Manual Toggle** - User-controlled theme switcher
- **Persistent Theme** - Saved in localStorage across sessions
- **No Flash** - Synchronous theme application on page load
- **Tailwind Dark Classes** - Maintainable `dark:` variants throughout

### 🔐 Authentication & User Management

- **Firebase Authentication** - Secure email/password authentication
- **Smart Auth Flow** - Protected routes with modal guards
- **Persistent Sessions** - Auth state maintained across browser sessions
- **Password Toggle** - Visibility control for better UX
- **Deep Link Support** - Automatic redirect to intended destination after login
- **User Profiles** - Firestore user documents with profile pages

### 📋 Job Listings & Discovery

- **Real-time Data** - Live job listings from Firestore
- **Advanced Filtering:**
  - 📍 Location (Remote, On-site, Hybrid)
  - 📊 Experience Level (Junior, Mid, Senior)
  - 🔍 Full-text Search (title, description, tags)
- **Smart Pagination** - Infinite scroll with "Load More"
- **Job Details** - Comprehensive job pages with company info
- **Skeleton Loading** - Smooth loading states for better perceived performance

### ⭐ Favorites & Applications

- **Favorites System** - Save and manage favorite jobs (auth-required)
- **Real-time Sync** - User-specific favorites in Firestore
- **Animated Interactions** - Smooth star icon transitions
- **Apply Modal** - Inline application form with validation (Headless UI)
- **Auth Guards** - Modal prompts for unauthenticated users

### 💬 Accessible UI Components

- **Headless UI Modals** - WCAG-compliant dialogs with:
  - ⌨️ Keyboard navigation (Tab, Escape, Enter)
  - 🎯 Focus trap and management
  - 📱 Touch-friendly on mobile
- **Form Validation** - VeeValidate + Yup schemas with inline errors
- **Toast Notifications** - Non-intrusive success/error feedback
- **Icon System** - Heroicons (outline & solid variants)
- **Semantic HTML** - Proper heading hierarchy and ARIA labels

### 🎨 Modern Frontend Stack

- **Vue 3.5** - Composition & Options API
- **Pinia 3** - Modern state management with:
  - `auth` - Authentication state
  - `jobs` - Job listings and filters
  - `favorites` - User favorites
  - `toast` - Notifications
  - `modal` - Modal state
- **Tailwind CSS 4** - Utility-first styling with dark mode
- **Vite 7** - Lightning-fast HMR and build
- **Firebase 12** - Authentication + Firestore backend

### 🌐 Internationalization (i18n)

- **Multi-language Ready** - vue-i18n integration
- **Dynamic Locale Switching** - Runtime language changes
- **Translated Validation** - Error messages in multiple languages
- **Translation Keys** - Structured i18n architecture

### 🚀 DevOps & Code Quality

- **CI/CD Pipeline** - GitHub Actions → Firebase Hosting
- **Auto-Deploy** - Automatic deployments on push to main
- **Code Quality Tools:**
  - 🧹 ESLint 9 - Linting with Vue plugin
  - 💅 Prettier 3 - Code formatting
  - 🪝 Husky - Git hooks
  - 📋 Lint-Staged - Pre-commit checks
- **Preview Deployments** - Automatic preview URLs (if configured)

### 📱 Responsive & Performance

- **Mobile-First** - Optimized for all screen sizes
- **Fast Loading** - Optimized bundle with Vite code-splitting
- **Lazy Loading** - Route-based code splitting

### 🚀 DevOps & Deployment

- **GitHub Actions** - Automated CI/CD pipeline
- **Firebase Hosting** - Production deployment
- **Environment Variables** - Secure configuration
- **Build Optimization** - Vite build process
- **Auto-deployment** on push to `main` branch

## ♿ Accessibility (a11y)

This application follows **WCAG 2.1 Level AA** guidelines to ensure an inclusive user experience for all users.

### 🎯 Keyboard Navigation

- **Full Keyboard Support** - All interactive elements accessible via keyboard
- **Focus Management** - Visible focus indicators with custom ring styles
- **Logical Tab Order** - Semantic HTML ensures natural tab flow
- **Escape Key Handlers** - Close modals and dialogs with `Esc`
- **Enter/Space** - Activate buttons and links

### 🔍 Screen Reader Support

- **ARIA Labels** - Descriptive labels for icon buttons and interactive elements
  ```vue
  <button :aria-label="favoriteButtonLabel">
  <button :aria-label="showPasswordLabel">
  ```
- **ARIA States** - Dynamic state announcements
  ```vue
  :aria-pressed="isFavorited" :aria-busy="isLoading" :aria-invalid="!!errors.email"
  ```
- **ARIA Descriptions** - Error messages linked to form fields
  ```vue
  :aria-describedby="errors.email ? 'email-error' : undefined"
  <small id="email-error">{{ message }}</small>
  ```
- **ARIA Hidden** - Decorative icons excluded from screen readers
  ```vue
  <Icon aria-hidden="true" />
  ```

### 🏗️ Semantic HTML

- **Proper Landmarks** - `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`
- **Heading Hierarchy** - Logical `<h1>` to `<h3>` structure
- **Form Labels** - All inputs have associated `<label>` elements
- **Button Types** - Explicit `type="button"` vs `type="submit"`
- **Link vs Button** - Semantic distinction (navigation vs actions)

### 🎨 Visual Accessibility

- **Color Contrast** - WCAG AA compliant (4.5:1 for text)
- **Focus Indicators** - Custom `focus:ring-2` focus states
- **No Color-Only Info** - Icons + text for status/actions
- **Responsive Text** - Readable font sizes at all breakpoints
- **Dark Mode** - Maintains contrast ratios in both themes

### 📝 Form Accessibility

- **Inline Validation** - Real-time error messages with ARIA
- **Error Prevention** - Client-side validation before submission
- **Clear Instructions** - Placeholder text and labels
- **Autocomplete Attributes** - Browser autofill support
  ```vue
  autocomplete="email" autocomplete="current-password" autocomplete="new-password"
  ```
- **Password Visibility** - Toggle with accessible labels

### 🧪 Accessibility Testing

- **Manual Testing** - Keyboard-only navigation verified
- **Screen Reader Testing** - Tested with VoiceOver (macOS)

### 📋 Best Practices Applied

- ✅ Skip links for main content (future enhancement)
- ✅ Consistent navigation structure
- ✅ No keyboard traps
- ✅ Sufficient click/tap target sizes (44x44px minimum)
- ✅ Readable fonts (no smaller than 14px)
- ✅ Form error prevention and recovery
- ✅ Timeout warnings (if applicable)
- ✅ Responsive and mobile-friendly

---

## 📸 Screenshots

### Home Page

![Home Page](./screenshots/homepage.png)

### Home Page Mobile

![Home Page](./screenshots/homepage-mobile.png)

### Job Listings + Filtering + Load More

![Job Listings](./screenshots/jobs-listing-filter.png)

### Job Details

![Job Details](./screenshots/jobdetails.png)

### Favorites

![Favorites](./screenshots/favorited-jobs.png)

### Authentication Modal

![Favorites](./screenshots/auth-modal.png)

### Apply Modal

![Favorites](./screenshots/apply-modal.png)

## 📁 Project Structure

```
jobportal/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── .vscode/
│   └── settings.json           # VSCode workspace settings
├── src/
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   │   ├── AuthForm.vue    # Unified login/register form
│   │   │   ├── LoginForm.vue   # Login wrapper
│   │   │   └── RegisterForm.vue # Register wrapper
│   │   ├── home/               # Home page components
│   │   ├── jobs/               # Job listing components
│   │   │   ├── JobCard.vue     # Job card with favorites
│   │   │   ├── JobList.vue     # Job list with pagination
│   │   │   ├── JobCardSkeleton.vue
│   │   │   ├── JobsFavorite.vue
│   │   │   └── JobsFilter.vue  # Filter UI
│   │   ├── layouts/            # Layout components
│   │   │   └── TheHeader.vue   # Navigation header
│   │   └── ui/                 # Reusable UI components
│   │       ├── Icon.vue        # Icon component
│   │       ├── Modal.vue       # Modal component
│   │       └── Toast.vue       # Toast notifications
│   ├── pages/                  # Page components
│   │   ├── HomePage.vue
│   │   ├── JobsPage.vue
│   │   ├── JobsDetailPage.vue
│   │   ├── FavoriteJobsPage.vue
│   │   ├── ProfilePage.vue
│   │   ├── LoginPage.vue
│   │   ├── RegisterPage.vue
│   │   └── NotFoundPage.vue
│   ├── stores/                 # Pinia stores
│   │   ├── auth/
│   │   │   └── auth.js         # Authentication state
│   │   ├── jobs/
│   │   │   ├── jobs.js         # Jobs state & filtering
│   │   │   └── favorites.js    # Favorites management
│   │   ├── ui/
│   │   │   └── modal.js        # Modal state
│   │   └── toast/
│   │       └── toast.js        # Toast notifications
│   ├── router/
│   │   └── index.js            # Router config with guards
│   ├── config/
│   │   └── firebase.js         # Firebase initialization
│   ├── schemas/
│   │   └── index.js            # Yup validation schemas
│   ├── locales/                # i18n translations
│   ├── assets/                 # Static assets
│   ├── App.vue                 # Root component
│   └── main.js                 # App entry point
├── .env                        # Environment variables (local)
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── firebase.json               # Firebase config
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Git & GitHub account (for deployment)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd jobportal
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore Database
   - Add a web app to get your config

4. **Configure environment variables**

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. **Start development server**

```bash
npm run dev
```

6. **Build for production**

```bash
npm run build
```

## 🔧 GitHub Actions Deployment Setup

### Required GitHub Secrets

Go to your repository **Settings** → **Secrets and variables** → **Actions** and add:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT` (JSON key from Firebase Console)

### Deployment Workflow

The app automatically deploys to Firebase Hosting when you push to `main`:

```bash
git add .
git commit -m "feat: your changes"
git push origin main
```

GitHub Actions will:

1. ✅ Checkout code
2. ✅ Install dependencies
3. ✅ Build with environment variables
4. ✅ Deploy to Firebase Hosting
5. ✅ Available on both Firebase URL and custom domain

## 📱 Responsive Breakpoints

```javascript
sm: '640px'; // Mobile landscape
md: '768px'; // Tablet
lg: '1024px'; // Desktop
xl: '1280px'; // Large desktop
```

## 🎨 Design System

### Color Scheme

- **Primary:** Blue tones for CTAs and highlights
- **Background:** White/Light gray
- **Foreground:** Dark gray/Black for text
- **Muted:** Gray tones for secondary text
- **Border:** Light gray for borders

## 🔐 Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ `.env` excluded from Git
- ✅ Firebase security rules (configure in Firebase Console)
- ✅ Auth state validation on backend
- ✅ Protected routes with navigation guards
- ✅ Input validation with VeeValidate
- ✅ XSS protection through Vue's templating

## 📊 Performance Optimizations

- **Code Splitting:** Dynamic imports for routes
- **Lazy Loading:** Components loaded on demand
- **Caching:** Firebase data caching
- **Pagination:** Load jobs incrementally
- **Skeleton Loaders:** Better perceived performance

## 🧪 Future Enhancements

- [ ] Unit tests (Vitest)
- [ ] E2E tests (Cypress/Playwright)
- [ ] Job application system

## 📝 Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🛠️ Miscellaneous

### Generate Project Structure

```bash
tree -L 5 -I 'node_modules|dist|.git' > structure.txt
```

### VSCode Extensions Recommended

- Vue Language Features (Volar)
- Tailwind CSS IntelliSense
- ESLint
- Prettier
