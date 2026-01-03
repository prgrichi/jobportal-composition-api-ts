<template>
  <!-- Job Card -->
  <article class="w-full relative overflow-hidden rounded-lg border border-border bg-background p-6 
           transition-all duration-300 hover:shadow-sm flex flex-col">

    <div class="flex flex-col flex-1">

      <!-- Header:  Level Badge + Date + Title + Company -->
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">

          <!-- Level Badge + Posted Date -->
          <div class="flex items-center gap-2 mb-2">
            <span
              class="inline-flex items-center rounded-md bg-primary-50 pr-2 py-1 text-xs font-medium text-primary-700">
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
        <span v-for="tag in job.tags.slice(0, 6)" :key="tag"
          class="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors">
          {{ tag }}
        </span>
      </div>

      <!-- Favorite Button -->
      <div class="inline-flex group/star items-center gap-2 mt-4">
        <button @click="handleFavoriteClick" class="inline-flex items-center gap-1.5 cursor-pointer">
          <!-- Star Icon (solid if favorited, outline if not) -->
          <Icon name="Star" :type="starType" :icon-class="starIconClass" />
          <span class="text-sm text-primary-500 transition-all duration-150 
                   group-hover/star: underline group-hover/star: underline-offset-4">
            Merken
          </span>
        </button>
      </div>

    </div>

  </article>
</template>

<script>
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useAuthStore } from '@/stores/auth/auth';
import { useModalStore } from '@/stores/ui/modal';

export default {
  name: 'JobCard',

  props: {
    job: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isAnimating: false  // For star animation on toggle
    };
  },

  computed: {
    favoritesStore() {
      return useFavoritesStore();
    },

    authStore() {
      return useAuthStore();
    },

    modalStore() {
      return useModalStore();
    },

    // Format timestamp to German locale
    timeToDate() {
      const date = this.job?.createdAt?.toDate() || null;
      if (!date) return '';

      return date.toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit'
      });
    },

    // Star icon type (solid if favorited, outline if not)
    starType() {
      return this.isFavorited ? 'solid' : 'outline';
    },

    // Star icon classes with animation
    starIconClass() {
      return [
        'transition duration-200 h-4 w-4 text-primary-500',
        this.isAnimating ? 'scale-125' : 'scale-100'
      ].join(' ');
    },

    // Check if job is favorited
    isFavorited() {
      return this.favoritesStore.isJobFavorited(this.job.id);
    }
  },

  methods: {
    // Handle favorite button click
    handleFavoriteClick() {
      // Require authentication
      if (!this.authStore.isAuthenticated) {
        this.openAuthRequiredModal();
        return;
      }

      this.toggleFavorite();
    },

    // Toggle favorite status with animation
    toggleFavorite() {
      this.favoritesStore.toggleFavorite(this.job);

      // Trigger scale animation
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 500);
    },

    // Show auth required modal
    openAuthRequiredModal() {
      this.modalStore.showAuthRequired();
    }
  }
}
</script>