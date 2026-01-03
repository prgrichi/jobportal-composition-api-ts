<template>
  <!-- Three Jobs Teaser Section -->
  <section class="bg-background pt-5 pb-10 md:pt-10 md:pb-20">
    <div class="mx-auto max-w-app px-4">

      <!-- Section Header -->
      <div class="mb-6 flex items-end justify-between gap-4">

        <!-- Title & Subtitle -->
        <div>
          <h2 class="text-lg font-semibold text-foreground">
            {{ $t('threejobsteaser.title') }}
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ $t('threejobsteaser.subtitle') }}
          </p>
        </div>

        <!-- Desktop:  View All Link -->
        <RouterLink :to="{ name: 'jobs' }" class="hidden md:inline-flex">
          <span class="relative
                   after:absolute after:bottom-0 after:left-0 after:h-[2px] 
                   after:w-0 after:bg-primary-600 after:transition-all after: duration-300
                   hover: after:w-full 
                   inline-flex items-center gap-1 text-sm font-medium text-primary-500 
                   transition group-hover:text-primary-600">
            {{ $t('threejobsteaser.viewAll') }}
            <span aria-hidden="true">→</span>
          </span>
        </RouterLink>

      </div>

      <!-- Jobs Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

        <!-- Loading State:  Skeletons -->
        <template v-if="!authStore.authReady || jobStore.isLoading">
          <JobCardSkeleton v-for="n in 3" :key="`sk-${n}`" />
        </template>

        <!-- Jobs List -->
        <JobCard v-for="job in jobStore.jobs" :key="job.id" :job="job" />

        <!-- Error State -->
        <template v-if="jobStore.error">
          <div class="col-span-full text-center text-red-500">
            {{ jobStore.error }}
          </div>
        </template>

      </div>

      <!-- Mobile:  View All Button -->
      <div class="mt-6 md:hidden">
        <RouterLink :to="{ name: 'jobs' }" class="inline-flex w-full items-center justify-center rounded-xl
                 border-b-3 border-primary-500/30 bg-background px-4 py-3
                 text-sm font-medium text-primary-600
                 transition hover:bg-primary-500/10
                 focus: outline-none focus:ring-2 focus:ring-primary-500/30">
          {{ $t('threejobsteaser.viewAll') }}
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';
import { useAuthStore } from '@/stores/auth/auth';
import JobCard from '@/components/jobs/JobCard. vue';
import JobCardSkeleton from '@/components/jobs/JobCardSkeleton.vue';

export default {
  name: 'ThreeJobsTeaser',

  components: {
    JobCard,
    JobCardSkeleton
  },

  computed: {
    jobStore() {
      return useJobStore();
    },
    authStore() {
      return useAuthStore();
    }
  },

  created() {
    // Load latest 3 jobs
    this.jobStore.fetchJobs({
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: 3
    });
  }
}
</script>