<template>
  <div class="mx-auto max-w-app flex justify-between md:block">
    <div class="flex h-16 items-center w-full justify-between relative px-4">
      <!-- Logo / Home Link -->
      <RouterLink :to="{ name: 'home' }" class="text-sm font-semibold text-foreground">
        {{ $t('nav.link.homepage') }}
      </RouterLink>

      <!-- Mobile Menu Toggle Button -->
      <button
        v-if="authReady"
        @click="toggleMenu"
        ref="burgerBtn"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-menu"
        class="md:hidden min-w-11 min-h-11 p-2 text-muted-foreground"
      >
        <span class="sr-only">
          {{ mobileMenuOpen ? $t('nav.closeMobileMenu') : $t('nav.openMobileMenu') }}
        </span>
        <Icon aria-hidden="true" :name="mobileMenuOpen ? 'XMark' : 'Bars3'" icon-class="h-6 w-6" />
      </button>

      <nav
        v-if="authReady"
        ref="mobileMenu"
        id="mobile-menu"
        aria-label="Hauptnavigation"
        :class="[
          'text-sm',
          mobileMenuOpen
            ? 'h-[calc(100vh-106px)] flex flex-col absolute top-16 w-full left-0 right-0 bg-background border-b border-border p-4 gap-4'
            : 'hidden md:flex items-center gap-6',
        ]"
      >
        <!-- Navigation Links -->
        <HeaderNavLinks
          :is-authenticated="isAuthenticated"
          :favorite-count="favoritesStore.favoriteCount"
          @logout="handleLogout"
          @auth-required="openAuthRequiredModal"
        />
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

import { useToastStore } from '@/stores/toast/toast';
import { useAuthStore } from '@/stores/auth/auth';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useModalStore } from '@/stores/ui/modal';
import { createFocusTrap } from '@/utils/focusTrap';

import HeaderNavLinks from './HeaderNavLinks.vue';

const mobileMenuOpen = ref(false); // Mobile menu toggle state
const focusTrap = ref(null); // Focus trap instance
const burgerBtn = ref(null); // Reference to the burger button
const mobileMenu = ref(null); // Reference to the mobile menu

const toastStore = useToastStore();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const modalStore = useModalStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const authReady = computed(() => authStore.authReady);

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
  }
);

// Toggle mobile menu
const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;

  if (mobileMenuOpen.value) {
    focusTrap.value?.activate();
    const firstLink = mobileMenu.value?.querySelector('a');
    firstLink?.focus();
  } else {
    focusTrap.value?.deactivate();
    nextTick(() => {
      // Focus zurück auf Burger
      burgerBtn.value?.focus();
    });
  }
};
// Show auth required modal
const openAuthRequiredModal = () => {
  modalStore.showAuthRequired();
};

const router = useRouter();
// Handle user logout
const handleLogout = async () => {
  try {
    await signOut(auth);
    toastStore.success('Erfolgreich ausgeloggt');
    router.push({ name: 'home' });
  } catch (_err) {
    toastStore.error('Logout fehlgeschlagen');
  }
};

onMounted(() => {
  focusTrap.value = createFocusTrap({
    getFocusableElements: () => {
      const menuLinks = Array.from(mobileMenu.value?.querySelectorAll('a, button') || []);
      return [burgerBtn.value, ...menuLinks];
    },
    onClose: () => {
      if (!mobileMenuOpen.value) return;
      mobileMenuOpen.value = false;
      nextTick(() => {
        burgerBtn.value?.focus();
      });
    },
  });
});

onBeforeUnmount(() => {
  focusTrap.value?.destroy();
});
</script>

<style scoped></style>
