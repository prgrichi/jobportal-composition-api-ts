<template>
  <!-- Job Card -->
  <article
    class="w-full relative overflow-hidden rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:shadow-sm flex flex-col"
  >
    <div class="flex flex-col flex-1">
      <!-- Header:  Level Badge + Date + Title + Company -->
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <!-- Level Badge + Posted Date -->
          <div class="flex items-center gap-2 mb-2">
            <span
              class="inline-flex items-center rounded-md bg-primary-50 pr-2 py-1 text-xs font-medium text-primary-700"
            >
              {{ job.level }}
            </span>
            <span class="text-xs text-neutral-400">
              {{ timeToDate }}
            </span>
          </div>

          <!-- Job Title (Link to Detail) -->
          <RouterLink :to="`/jobs/${job.id}`" class="flex w-full">
            <h3 class="text-lg font-semibold text-foreground transition-colors">
              {{ job.title }}
            </h3>
          </RouterLink>

          <!-- Company + Location -->
          <div class="mt-2 flex items-center gap-2 text-sm">
            <span class="font-medium text-foreground">{{ job.company }}</span>
            <span class="h-1 w-1 rounded-full bg-neutral-300"></span>
            <span class="text-muted-foreground">{{ job.location }}</span>
          </div>
        </div>
      </div>

      <!-- Job Description -->
      <p class="text-sm my-5 flex-1">
        {{ job.description }}
      </p>

      <!-- Tags (max 6) -->
      <div v-if="job.tags?.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in job.tags.slice(0, 6)"
          :key="tag"
          class="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Favorite Button -->
      <div class="inline-flex group/star items-center gap-2 mt-4">
        <button
          type="button"
          :aria-pressed="isFavorited"
          :aria-label="favoriteButtonLabel"
          @click="handleFavoriteClick"
          class="inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Icon name="Star" :type="starType" :icon-class="starIconClass" />
          <span
            class="text-sm text-primary-500 transition-all duration-150 group-hover/star:underline group-hover/star:underline-offset-4"
          >
            {{ $t('jobs.favorites.save') }}
          </span>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useAuthStore } from '@/stores/auth/auth';
import { useModalStore } from '@/stores/ui/modal';

// Props
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});

// Props reaktiv destructuren
const { job } = toRefs(props);

const isAnimating = ref(false);

// Stores
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();
const modalStore = useModalStore();

// i18n
const { t } = useI18n();

// Format timestamp to German locale
const timeToDate = computed(() => {
  const date = job.value?.createdAt?.toDate() || null;
  if (!date) return '';

  return date.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
  });
});

// Check if job is favorited
const isFavorited = computed(() => {
  return favoritesStore.isJobFavorited(job.value.id);
});

// Star icon type (solid if favorited, outline if not)
const starType = computed(() => {
  return isFavorited.value ? 'solid' : 'outline';
});

// Star icon classes with animation
const starIconClass = computed(() => {
  return [
    'transition duration-200 h-4 w-4 text-primary-500',
    isAnimating.value ? 'scale-125' : 'scale-100',
  ].join(' ');
});

const favoriteButtonLabel = computed(() => {
  return isFavorited.value
    ? t('jobs.favorites.removeFromFavoritesLabel', {
        title: job.value.title,
        company: job.value.company,
      })
    : t('jobs.favorites.addToFavoritesLabel', {
        title: job.value.title,
        company: job.value.company,
      });
});

// Handle favorite button click
const handleFavoriteClick = () => {
  if (!authStore.isAuthenticated) {
    openAuthRequiredModal();
    return;
  }

  toggleFavorite();
};

// Toggle favorite status with animation
const toggleFavorite = () => {
  favoritesStore.toggleFavorite(job.value);

  // Trigger scale animation
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};

// Show auth required modal
const openAuthRequiredModal = () => {
  modalStore.showAuthRequired();
};
</script>
