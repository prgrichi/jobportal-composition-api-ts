<template>
  <!-- Favorite Jobs Page -->
  <div>
    <div class="max-w-app mx-auto">
      <!-- Page Header -->
      <div class="mb-8" v-if="favoritesFoundCount !== 0">
        <h1 class="text-2xl font-bold text-foreground mb-2">
          {{ $t('jobs.favorites.title') }}
        </h1>
        <p>{{ $t('jobs.favorites.count', favoritesFoundCount) }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="favoritesStore.loading" class="text-center py-12">
        {{ $t('jobs.favorites.favoritesLoading') }}
      </div>

      <!-- Empty State:  No Favorites -->
      <div v-else-if="favoritesFoundCount === 0" class="text-center py-12">
        <!-- Star Icon -->
        <Icon name="Star" type="outline" icon-class="h-16 w-16 mx-auto mb-4" />

        <!-- Empty State Title -->
        <h3 class="text-lg font-semibold text-foreground mb-2">
          {{ $t('jobs.favorites.noFavoritesTitle') }}
        </h3>

        <!-- Empty State Message -->
        <p class="text-muted-foreground mb-6">
          {{ $t('jobs.favorites.noFavoritesText') }}
        </p>

        <!-- CTA:  Browse Jobs -->
        <RouterLink :to="{ name: 'jobs' }" class="btn btn-primary">
          {{ $t('general.btn.jobSearch') }}
        </RouterLink>
      </div>

      <!-- Favorites Grid -->
      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <JobCard v-for="job in favoriteJobs" :key="job.id" :job="job" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import JobCard from '@/components/jobs/JobCard.vue';

const favoritesStore = useFavoritesStore();

// List of favorite jobs
const favoriteJobs = computed(() => {
  return favoritesStore.favoriteJobs;
});

// Count of favorites (for display)
const favoritesFoundCount = computed(() => {
  return favoriteJobs.value.length;
});
</script>
