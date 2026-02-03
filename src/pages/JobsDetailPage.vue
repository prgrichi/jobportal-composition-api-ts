<template>
  <div class="min-h-screen bg-muted py-6 md:py-12">
    <!-- Loading State -->
    <div v-if="jobStore.isLoading" class="w-full block text-center mt-6">
      {{ $t('general.loading') }}
    </div>

    <!-- Error State -->
    <div v-else-if="jobStore.error" class="w-full block text-center mt-6 text-red-500">
      {{ jobStore.error }}
    </div>

    <!-- Job Content -->
    <div v-else-if="job">
      <!-- Header/Breadcrumb -->
      <JobDetailHeader :job-number="job.jobNumber || job.id" :back-route="backRoute" />

      <!-- Main Content -->
      <section class="mx-auto max-w-app px-4 py-8">
        <!-- Hero + Sidebar -->
        <div class="grid gap-6 lg:grid-cols-12">
          <JobDetailHero :job="job" />
          <JobDetailSidebar
            :job="job"
            :remote-label="remoteLabel"
            :created-at="createdAtDE"
            @apply="handleApply"
          />
        </div>

        <!-- 3 Panels -->
        <JobDetailPanels :job="job" />

        <!-- Bottom CTA -->
        <JobDetailCTA @save="handleSave" @apply="handleApply" :job="job" />

        <JobApplicationModal
          :is-open="modalStore.jobApplicationModalOpen"
          :jobTitle="job.title"
          @close="modalStore.hideJobApplication"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useJobStore } from '@/stores/jobs/jobs';
import { useAuthStore } from '@/stores/auth/auth';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useModalStore } from '@/stores/ui/modal';

import JobDetailHeader from '@/components/jobs/detail/JobDetailHeader.vue';
import JobDetailHero from '@/components/jobs/detail/JobDetailHero.vue';
import JobDetailSidebar from '@/components/jobs/detail/JobDetailSidebar.vue';
import JobDetailPanels from '@/components/jobs/detail/JobDetailPanels.vue';
import JobDetailCTA from '@/components/jobs/detail/JobDetailCTA.vue';
import JobApplicationModal from '@/components/modal/JobApplicationModal.vue';

// Props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// Stores
const jobStore = useJobStore();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const modalStore = useModalStore();

// Reaktive Ableitungen
const job = computed(() => jobStore.singleJob);

const createdAtDE = computed(() => {
  if (!job.value || !job.value.createdAt) return '-';

  const raw = job.value.createdAt;
  const date = raw.toDate ? raw.toDate() : new Date(raw);

  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
});

const remoteLabel = computed(() => (job.value?.remote ? 'Remote möglich' : 'Vor Ort'));

// Back-Route aus Route-Meta
const route = useRoute();

const backRoute = computed(() => {
  const previousRoute = route.meta.previousRoute;

  if (previousRoute === '/') {
    return { name: 'home' };
  }
  if (previousRoute === '/jobs') {
    return { name: 'jobs' };
  }
  return { name: 'home' };
});

// Methoden
const handleApply = () => {
  if (!job.value) return;

  console.log('Apply clicked for job:', job.value.id);

  if (!authStore.isAuthenticated) {
    modalStore.showAuthRequired();
    return;
  }

  modalStore.showJobApplication(job.value.id);
};

const handleSave = () => {
  if (!job.value) return;

  console.log('Save clicked for job:', job.value.id);
  favoritesStore.toggleFavorite(job.value);
};

// Lifecycle
onMounted(async () => {
  await jobStore.fetchJobByIdWithCache(props.id);
});
</script>

<style scoped></style>
