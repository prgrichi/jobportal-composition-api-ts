<template>
  <header class="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">

    <div class="border-b border-neutral-100 bg-neutral-100">
      <div class="mx-auto max-w-app px-4">
        <div class="flex h-10 items-center justify-end gap-4 text-xs">
          <p class="text-neutral-600 hover:text-neutral-900 transition after:content-['/'] after:ml-4"
            v-if="authStore.isAuthenticated">{{ $t('nav.userGreeting') }}, {{
              authStore.userName }}</p>

          <!-- Language Switcher -->
          <div class="flex items-center gap-2" aria-label="Sprachwahl">
            <button :class="deClasses" @click="changeLang('de')" class="cursor-pointer text-neutral-600">DE</button>
            <span class="text-neutral-300" aria-hidden="true">|</span>
            <button :class="enClasses" @click="changeLang('en')" class="cursor-pointer text-neutral-600">EN</button>
          </div>
          <!-- Optional:  Weitere Meta-Links -->
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-app px-4">

      <div class="flex h-16 items-center justify-between">

        <!-- Logo -->
        <RouterLink :to="{ name: 'home' }" class="text-sm font-semibold text-neutral-900">{{ $t('nav.link.homepage') }}
        </RouterLink>

        <!-- Navigation -->
        <nav v-if="authReady" aria-label="Hauptnavigation" class="flex items-center gap-6 text-sm">

          <RouterLink :to="{ name: 'jobs' }" class="text-neutral-600 hover:text-neutral-900 transition">
            {{ $t('nav.link.job') }}
          </RouterLink>

          <RouterLink :to="{ name: 'login' }" v-if="!isAuthenticated"
            class="text-neutral-600 hover:text-neutral-900 transition">
            {{ $t('general.btn.login') }}
          </RouterLink>

          <RouterLink :to="{ name: 'register' }" v-if="!isAuthenticated" class="inline-flex items-center justify-center rounded-lg
          bg-primary-500 px-4 py-2
                        text-sm font-medium text-white
                        transition hover:bg-primary-600
                        focus:outline-none focus:ring-2 focus:ring-primary-500/30">{{ $t('general.btn.register') }}
          </RouterLink>

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

export default {
  name: 'TheHeader',
  data() {
    return {
      activeClasses: false,
    }
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
    currentLocale() {
      return this.$i18n.locale;
    },
    deClasses() {
      return this.currentLocale === 'de'
        ? 'font-bold text-primary-600'
        : 'text-neutral-600 hover:text-neutral-900';
    },
    enClasses() {
      return this.currentLocale === 'en'
        ? 'font-bold text-primary-600'
        : 'text-neutral-600 hover:text-neutral-900';
    }
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    },

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
  }
}
</script>

<style scoped></style>