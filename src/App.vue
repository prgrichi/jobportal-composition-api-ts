<template>
  <div class="app-shell">
    <TheHeader />

    <main>
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
      immediate: true
    }
  },
  mounted() {
    this.authStore.init();
  }
}
</script>
