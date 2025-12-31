<template>
  <header class="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">

    <div class="border-b border-neutral-100 bg-primary-500">
      <div class="mx-auto max-w-app px-4">
        <div class="flex h-10 items-center justify-end gap-4 text-xs">
          <div v-if="authReady" class="flex items-center gap-2">
            <Icon name="User" icon-class="h-4 w-4 text-white" />
            <p class="text-white transition after:content-['/'] after:ml-4" v-if="authStore.isAuthenticated">{{
              $t('nav.userGreeting') }}, {{
                authStore.userName }}</p>
          </div>

          <!-- Language Switcher -->
          <div class="flex items-center gap-2" aria-label="Sprachwahl">
            <button :class="deClasses" @click="changeLang('de')" class="cursor-pointer text-white">DE</button>
            <span class="text-neutral-300" aria-hidden="true">|</span>
            <button :class="enClasses" @click="changeLang('en')" class="cursor-pointer text-white">EN</button>
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

          <template v-if="authStore.isAuthenticated">
            <RouterLink :to="{ name: 'favoriteJobs' }"
              class="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition">
              <Icon name="LockClosed" v-if="!isAuthenticated" icon-class="me-[2px] h-4 w-4 text-neutral-600 " />
              {{ $t('nav.link.favoriteJobs') }}
              <span v-if="favoritesStore.favoriteCount > 0"
                class="ms-[5px] inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-500 text-[11px] font-semibold text-white">
                {{ favoritesStore.favoriteCount }}
              </span>
            </RouterLink>
          </template>
          <template v-else>
            <button @click="modalStore.showAuthRequired"
              class="cursor-pointer inline-flex items-center text-neutral-600 hover:text-neutral-900 transition">
              <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-neutral-600" />
              {{ $t('nav.link.favoriteJobs') }}
            </button>
          </template>

          <template v-if="authStore.isAuthenticated">
            <RouterLink :to="{ name: 'jobs' }" v-if="authStore.isAuthenticated"
              class="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition">
              <Icon name="LockClosed" v-if="!isAuthenticated" icon-class="me-[2px] h-4 w-4 text-neutral-600 " />
              {{ $t('nav.link.job') }}
            </RouterLink>
          </template>
          <template v-else>
            <button @click="modalStore.showAuthRequired"
              class="cursor-pointer inline-flex items-center text-neutral-600 hover:text-neutral-900 transition">
              <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-neutral-600" />
              {{ $t('nav.link.job') }}
            </button>
          </template>

          <RouterLink :to="{ name: 'profile' }" v-if="isAuthenticated"
            class="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition">
            {{ $t('nav.link.profile') }}
          </RouterLink>

          <RouterLink :to="{ name: 'login' }" v-if="!isAuthenticated" class="btn btn-secondary">
            {{ $t('general.btn.login') }}
          </RouterLink>

          <RouterLink :to="{ name: 'register' }" v-if="!isAuthenticated" class="btn btn-primary">{{
            $t('general.btn.register') }}
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
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useModalStore } from '@/stores/ui/modal';

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
    favoritesStore() {
      return useFavoritesStore();
    },
    modalStore() {
      return useModalStore();
    },
    getFavoriteJobsNumber() {
      return this.favoritesStore.favoriteJobs.length;
    },
    currentLocale() {
      return this.$i18n.locale;
    },
    deClasses() {
      return this.currentLocale === 'de'
        ? 'font-bold text-primary-600'
        : 'text-neutral-600';
    },
    enClasses() {
      return this.currentLocale === 'en'
        ? 'font-bold text-primary-600'
        : 'text-neutral-600';
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

    openAuthRequiredModal() {
      this.modalStore.showAuthRequired();
    }

  }
}
</script>

<style scoped></style>