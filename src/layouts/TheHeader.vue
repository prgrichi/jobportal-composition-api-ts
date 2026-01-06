<template>
  <!-- Site Header (Sticky) -->
  <header class="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">

    <!-- Top Bar (Dark Mode + Language + User Greeting) -->
    <div class="border-b border-border bg-primary-500">
      <div class="mx-auto max-w-app px-4">
        <div class="flex h-10 items-center justify-between gap-4 text-xs">

          <!-- Dark Mode Toggle -->
          <ToggleSwitch v-model="darkMode" label="Dark Mode" />

          <div class="flex flex-1 justify-end items-center gap-4">

            <!-- Welcome User -->
            <div v-if="authReady && authStore.isAuthenticated" class="flex items-center gap-2">
              <Icon name="User" icon-class="h-4 w-4 text-white" />
              <p class="text-white transition after:content-['/'] after:ml-4">
                {{ $t('nav.userGreeting') }}, {{ authStore.userName }}
              </p>
            </div>

            <!-- Language Switcher -->
            <div class="flex items-center gap-2" aria-label="Sprachwahl">
              <button :class="deClasses" @click="changeLang('de')" class="cursor-pointer text-white">
                DE
              </button>
              <span class="text-neutral-300" aria-hidden="true">|</span>
              <button :class="enClasses" @click="changeLang('en')" class="cursor-pointer text-white">
                EN
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="mx-auto max-w-app flex justify-between md:block">

      <div class="flex h-16 items-center w-full justify-between relative px-4">

        <!-- Logo / Home Link -->
        <RouterLink :to="{ name: 'home' }" class="text-sm font-semibold text-foreground">
          {{ $t('nav.link.homepage') }}
        </RouterLink>

        <!-- Mobile Menu Toggle Button -->
        <button v-if="authReady" @click="toggleMenu" class="md:hidden min-w-11 min-h-11 p-2 text-muted-foreground">
          <Icon :name="mobileMenuOpen ? 'XMark' : 'Bars3'" icon-class="h-6 w-6" />
        </button>

        <!-- Navigation Links -->
        <nav v-if="authReady" aria-label="Hauptnavigation" :class="[
          'text-sm',
          mobileMenuOpen
            ? 'h-[calc(100vh-106px)] flex flex-col absolute top-16 w-full left-0 right-0 bg-background border-b border-border p-4 gap-4'
            : 'hidden md:flex items-center gap-6'
        ]">

          <!-- Favorite Jobs Link -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink :to="{ name: 'favoriteJobs' }"
              class="inline-flex items-center text-muted-foreground hover:text-foreground transition">
              {{ $t('nav.link.favoriteJobs') }}
              <!-- Favorites Count Badge -->
              <span v-if="favoritesStore.favoriteCount > 0" class="ms-[5px] inline-flex items-center justify-center min-w-[20px] h-5 px-1. 5 
                       rounded-full bg-primary-500 text-[11px] font-semibold text-white">
                {{ favoritesStore.favoriteCount }}
              </span>
            </RouterLink>
          </template>
          <!-- Locked Favorite Jobs (für nicht eingeloggte User) -->
          <template v-else>
            <button @click="modalStore.showAuthRequired"
              class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition">
              <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
              {{ $t('nav.link.favoriteJobs') }}
            </button>
          </template>

          <!-- Jobs Link -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink :to="{ name: 'jobs' }"
              class="inline-flex items-center text-muted-foreground hover:text-foreground transition">
              {{ $t('nav.link.job') }}
            </RouterLink>
          </template>
          <!-- Locked Jobs (für nicht eingeloggte User) -->
          <template v-else>
            <button @click="modalStore.showAuthRequired"
              class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition">
              <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
              {{ $t('nav.link.job') }}
            </button>
          </template>

          <!-- Profile Link (nur wenn eingeloggt) -->
          <RouterLink v-if="isAuthenticated" :to="{ name: 'profile' }"
            class="inline-flex items-center text-muted-foreground hover:text-foreground transition">
            {{ $t('nav.link.profile') }}
          </RouterLink>

          <!-- Login Button (nur wenn nicht eingeloggt) -->
          <RouterLink v-if="!isAuthenticated" :to="{ name: 'login' }" class="btn btn-secondary">
            {{ $t('general.btn.login') }}
          </RouterLink>

          <!-- Register Button (nur wenn nicht eingeloggt) -->
          <RouterLink v-if="!isAuthenticated" :to="{ name: 'register' }" class="btn btn-primary">
            {{ $t('general.btn.register') }}
          </RouterLink>

          <!-- Logout Button (nur wenn eingeloggt) -->
          <button v-if="isAuthenticated" class="btn btn-secondary" @click="handleLogout">
            {{ $t('general.btn.logout') }}
          </button>

        </nav>

      </div>
    </div>
  </header>
</template>

<script>
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useToastStore } from '@/stores/toast/toast';
import { useAuthStore } from '@/stores/auth/auth';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useModalStore } from '@/stores/ui/modal';
import { useThemeStore } from '@/stores/ui/theme';
import { useLocaleStore } from '@/stores/ui/locale';
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';

export default {
  name: 'TheHeader',
  components: {
    ToggleSwitch
  },
  data() {
    return {
      mobileMenuOpen: false,  // Mobile menu toggle state
    };
  },

  computed: {
    authStore() {
      return useAuthStore();
    },
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    authReady() {
      return this.authStore.authReady;
    },
    favoritesStore() {
      return useFavoritesStore();
    },
    modalStore() {
      return useModalStore();
    },
    themeStore() {
      return useThemeStore();
    },
    localeStore() {
      return useLocaleStore();
    },
    darkMode: {
      get() {
        return this.themeStore.isDark;
      },
      set(value) {
        this.themeStore.toggle();
      }
    },

    // Current i18n locale
    currentLocale() {
      return this.$i18n.locale;
    },

    // German button classes (active/inactive)
    deClasses() {
      return this.currentLocale === 'de'
        ? 'font-bold text-primary-600'
        : 'text-muted-foreground';
    },

    // English button classes (active/inactive)
    enClasses() {
      return this.currentLocale === 'en'
        ? 'font-bold text-primary-600'
        : 'text-muted-foreground';
    }
  },
  watch: {
    $route() {
      this.mobileMenuOpen = false;
    }
  },
  methods: {
    // Toggle dark mode
    toggleDarkMode() {
      this.themeStore.toggle();
    },

    // Toggle mobile menu
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },

    // Change language
    changeLang(lang) {
      this.$i18n.locale = lang;

      this.localeStore.setLocale(lang);
    },

    // Handle user logout
    async handleLogout() {
      const toast = useToastStore();

      try {
        await signOut(auth);
        toast.success('Erfolgreich ausgeloggt');
        this.$router.push({ name: 'home' });
      } catch (err) {
        toast.error('Logout fehlgeschlagen');
      }
    },

    // Show auth required modal
    openAuthRequiredModal() {
      this.modalStore.showAuthRequired();
    }
  }
}
</script>