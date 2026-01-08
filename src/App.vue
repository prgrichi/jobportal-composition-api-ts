<template>
  <div class="app-shell">
    <!-- Skip Link -->
    <a href="#main-content"
      class="sr-only focus:not-sr-only bg-primary-500 text-white focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-ring focus:font-semibold">
      {{ $t('ally.skipToContent') }}
    </a>
    <TheHeader />

    <main id="main-content" tabindex="-1">
      <ToastContainer />
      <router-view />
      <AuthRequiredModal :is-open="modalStore.authRequiredModalOpen" @close="modalStore.hideAuthRequired" />
    </main>

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue';
import AuthRequiredModal from '@/components/modal/AuthRequiredModal.vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useModalStore } from '@/stores/ui/modal';
import { useThemeStore } from './stores/ui/theme';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    ToastContainer,
    AuthRequiredModal
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    favoritesStore() {
      return useFavoritesStore();
    },
    modalStore() {
      return useModalStore();
    },
    themeStore() {
      return useThemeStore();
    }
  },
  watch: {
    'authStore.isAuthenticated': {
      handler(isAuthenticated) {
        if (isAuthenticated) {
          console.log('User eingeloggt, lade Favorites.. .');
          this.favoritesStore.loadFavorites();
        } else {
          console.log('User ausgeloggt, lösche Favorites...');
          this.favoritesStore.clearFavorites();
        }
      },
      immediate: false
    }
  },
  async mounted() {
    this.themeStore.init();

    await this.authStore.init();

    if (this.authStore.isAuthenticated) {
      console.log('Initial load:  User ist eingeloggt');
      this.favoritesStore.loadFavorites();
    }
  }

}
</script>
