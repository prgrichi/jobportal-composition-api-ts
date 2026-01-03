<template>
  <!-- Site Footer -->
  <footer class="border-t-4 border-primary-500/70 bg-background">
    <div class="max-w-app mx-auto px-4 py-12">

      <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

        <!-- Project Info -->
        <div>
          <p class="text-sm font-medium text-foreground">
            {{ $t('footer.projectTitle') }} · {{ $t('footer.projectSubTitle') }}
          </p>
          <p class="mt-1 text-sm text-muted-foreground">
            Vue · Pinia · Firebase · Tailwind
          </p>
        </div>

        <!-- Navigation Links -->
        <nav v-if="authReady" class="flex gap-6 text-sm">
          <!-- Home Link -->
          <RouterLink :to="{ name: 'home' }" class="text-muted-foreground hover:text-primary-600 transition">
            {{ $t('footer.link.homepage') }}
          </RouterLink>

          <!-- Login Link (nur für nicht eingeloggte User) -->
          <RouterLink v-if="!isAuthenticated" :to="{ name: 'login' }"
            class="text-muted-foreground hover:text-primary-600 transition">
            {{ $t('general.btn.login') }}
          </RouterLink>

          <!-- Jobs Link -->
          <RouterLink :to="{ name: 'jobs' }" class="text-muted-foreground hover:text-primary-600 transition">
            {{ $t('footer.link.jobs') }}
          </RouterLink>

          <!-- GitHub Link (external) -->
          <a href="https://github.com/prgrichi/jobportal" rel="noopener noreferrer" target="_blank"
            class="text-muted-foreground hover:text-primary-600 transition">
            GitHub
          </a>
        </nav>

      </div>

      <!-- Copyright / Meta Info -->
      <div class="mt-8 text-xs text-neutral-500">
        © 2025 · Built by Richard Holzner
      </div>

    </div>
  </footer>
</template>

<script>
import { useAuthStore } from '@/stores/auth/auth';

export default {
  name: 'TheFooter',

  computed: {
    authStore() {
      return useAuthStore();
    },

    // Check if user is authenticated
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },

    // Check if auth state is ready
    authReady() {
      return this.authStore.authReady;
    }
  }
}
</script>