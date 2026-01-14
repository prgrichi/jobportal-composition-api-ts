<template>
  <!-- Job Detail CTA Section -->
  <div class="mt-6 rounded-3xl bg-background p-6 ring-1 ring-ring">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm: justify-between">
      <!-- CTA Text -->
      <div>
        <p class="text-sm font-semibold text-foreground">
          {{ $t('jobs.jobDetail.ctaText1') }}
        </p>
        <p class="mt-1 text-sm text-muted-foreground">
          {{ $t('jobs.jobDetail.ctaText2') }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-2">
        <!-- Save Button -->
        <button type="button" :disabled="loading" class="btn btn-secondary" @click="$emit('save')">
          {{ showFavorite }}
          <Icon v-if="isFavorited" name="Check" icon-class="h-4 w-4 text-foreground" />
        </button>

        <!-- Apply Button -->
        <button type="button" class="btn btn-primary" @click="$emit('apply')">
          {{ $t('general.btn.apply') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFavoritesStore } from '@/stores/jobs/favorites';

const { t } = useI18n();

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});

const favoritesStore = useFavoritesStore();

const isFavorited = computed(() => {
  return favoritesStore.isJobFavorited(props.job.id);
});

const showFavorite = computed(() => {
  return isFavorited.value ? t('general.btn.saved') : t('general.btn.save');
});

const loading = computed(() => {
  return favoritesStore.loading;
});

defineEmits(['save', 'apply']);
</script>

<style scoped>
@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
