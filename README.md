# 🎯 Job Portal - Vue.js Application

A modern job board application built with Vue 3, Firebase, and Tailwind CSS. Users can browse job listings, filter by location and level, save favorites, and manage their applications.

## ✨ Features

- 🔐 **Authentication** - User registration and login with Firebase Auth
- 📋 **Job Listings** - Browse and search through available positions
- 🔍 **Advanced Filtering** - Filter jobs by location, level, and search text
- ⭐ **Favorites** - Save and manage favorite job listings
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🌐 **Internationalization** - Multi-language support (i18n ready)
- 🔄 **Real-time Updates** - Firebase Firestore integration
- ♾️ **Infinite Scroll** - Load more jobs with pagination
- 🎨 **Toast Notifications** - User feedback for actions
- 🦴 **Skeleton Loading** - Smooth loading states

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Options API)
- **State Management:** Pinia
- **Backend:** Firebase (Auth + Firestore)
- **Routing:** Vue Router
- **Styling:** Tailwind CSS
- **Form Validation:** VeeValidate + Yup
- **Build Tool:** Vite
- **Icons:** Heroicons

## 📁 Project Structure

```
jobportal/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── home/          # Home page components
│   │   ├── jobs/          # Job listing components
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   ├── stores/            # Pinia stores
│   │   ├── auth/          # Authentication store
│   │   ├── jobs/          # Jobs store
│   │   ├── favorites/     # Favorites store
│   │   └── toast/         # Toast notifications store
│   ├── router/            # Vue Router configuration
│   ├── config/            # Firebase configuration
│   └── locales/           # i18n translations
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd jobportal
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase credentials
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 🔑 Key Features Implementation

### Authentication
- Firebase Authentication with email/password
- Protected routes with navigation guards
- Persistent auth state
- Automatic redirect after login

### Job Management
- Firestore queries with filtering and pagination
- Real-time data synchronization
- Search functionality across job titles and descriptions
- Filter by location and experience level

### Favorites System
- User-specific favorite jobs stored in Firestore
- Toggle favorite status
- Dedicated favorites page

### State Management
- Centralized state with Pinia stores
- Modular store architecture
- Computed getters for filtered data
- Async actions for Firebase operations

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Touch-friendly UI elements
- Optimized for various screen sizes

# Jobportal

![Deploy Status](https://github.com/prgrichi/jobportal/actions/workflows/deploy.yml/badge.svg)

🚀 Automatisch deployed auf Firebase Hosting! 

## Live Demo
https://jobportal-8a79b.web.app/


# Miscellaneous
Structure erstellen: :tree -L 5 -I 'node_modules|dist|.git' > structure.txt