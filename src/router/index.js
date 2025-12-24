import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import JobsPage from '@/pages/JobsPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import JobsDetailsPage from '@/pages/JobsDetailPage.vue';
import { useAuthStore } from '@/stores/auth/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'Home',
        requiresAuth: false,
      },
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsPage,
      meta: {
        title: 'Jobs',
        requiresAuth: true,
      },
    },
    {
      path: '/jobs/:id',
      name: 'job-details',
      component: JobsDetailsPage,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        title: 'Login',
        requiresAuth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        title: 'Register',
        requiresAuth: false,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/NotFoundPage.vue'),
      meta: {
        title: '404'
      }
    }

  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // warten bis Firebase weiß, ob User existiert
  if (!authStore.authReady) {
    await new Promise(resolve => {
      const unwatch = authStore.$subscribe(() => {
        if (authStore.authReady) {
          unwatch();
          resolve();
        }
      });
    });
  }

  to.meta.previousRoute = from.fullPath;
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router;
