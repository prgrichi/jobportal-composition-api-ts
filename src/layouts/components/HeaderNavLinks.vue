<template>
  <!-- Favorite Jobs Link -->
  <template v-if="isAuthenticated">
    <RouterLink
      :to="{ name: 'favoriteJobs' }"
      class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
    >
      {{ $t('nav.link.favoriteJobs') }}
      <!-- Favorites Count Badge -->
      <span
        v-if="favoriteCount > 0"
        class="ms-[5px] inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-500 text-[11px] font-semibold text-white"
      >
        {{ favoriteCount }}
      </span>
    </RouterLink>
  </template>
  <!-- Locked Favorite Jobs (für nicht eingeloggte User) -->
  <template v-else>
    <button
      @click="openModal"
      class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition"
    >
      <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
      {{ $t('nav.link.favoriteJobs') }}
    </button>
  </template>

  <!-- Jobs Link -->
  <template v-if="isAuthenticated">
    <RouterLink
      :to="{ name: 'jobs' }"
      class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
    >
      {{ $t('nav.link.job') }}
    </RouterLink>
  </template>
  <!-- Locked Jobs (für nicht eingeloggte User) -->
  <template v-else>
    <button
      @click="openModal"
      class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition"
    >
      <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
      {{ $t('nav.link.job') }}
    </button>
  </template>

  <!-- Profile Link (nur wenn eingeloggt) -->
  <RouterLink
    v-if="isAuthenticated"
    :to="{ name: 'profile' }"
    class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
  >
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
</template>

<script setup>
const { isAuthenticated, favoriteCount } = defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true,
  },
  favoriteCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

const emit = defineEmits(['logout', 'authRequired']);

const handleLogout = () => {
  emit('logout');
};
const openModal = () => {
  emit('authRequired');
};
</script>

<style scoped></style>
