<template>
  <section class="bg-surface pt-5 pb-10 md:pt-10 md:pb-20">
    <div class="mx-auto max-w-app px-4">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-neutral-900">Neueste Jobs</h2>
          <p class="mt-1 text-sm text-neutral-600">3 aktuelle Frontend- & Web-Rollen.</p>
        </div>
        <RouterLink :to="{ name: 'jobs' }" class="hidden md:inline-flex items-center justify-center rounded-xl
                           border-b-3 border-primary-500/30 bg-white px-4 py-2
                           text-sm font-medium text-primary-600
                           transition hover:bg-primary-500/10
                           focus:outline-none focus:ring-2 focus:ring-primary-500/30">
          Alle Jobs
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <template v-if="jobStore.isLoading">
          <JobSkeleton v-for="n in 3" :key="`sk-${n}`" />
        </template>

        <template v-else>
          <JobSingle v-for="job in jobStore.jobs" :key="job.id" :job="job" />
        </template>

        <template v-if="jobStore.error">
          <div class="col-span-full text-center text-red-500">
            {{ jobStore.error }}
          </div>
        </template>
      </div>

      <!-- Mobile CTA -->
      <div class="mt-6 md:hidden">
        <RouterLink :to="{ name: 'jobs' }" class="inline-flex w-full items-center justify-center rounded-xl
                           border-b-3 border-primary-500/30 bg-white px-4 py-3
                           text-sm font-medium text-primary-600
                           transition hover:bg-primary-500/10
                           focus:outline-none focus:ring-2 focus:ring-primary-500/30">
          Alle Jobs
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';
import JobSingle from '@/components/jobs/JobSingle.vue';
import JobSkeleton from "@/components/jobs/JobSkeleton.vue";

export default {
  name: 'ThreeJobsTeaser',
  components: {
    JobSingle,
    JobSkeleton
  },
  computed: {
    jobStore() {
      return useJobStore();
    }
  },
  created() {
    this.jobStore.fetchJobs({
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: 3
    });
  }
}
</script>

<style scoped></style>