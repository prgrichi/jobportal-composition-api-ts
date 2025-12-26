<!-- @click="saveToStore" in routerlink -->

<template>
  <RouterLink :to="`/jobs/${job.id}`" class="block">
    <article class="group rounded-2xl border border-neutral-200 bg-white p-5 transition
           hover:-translate-y-0.5 hover:shadow-lg hover:border-primary-500/30">
      <!-- Header -->
      <div class="flex items-start justify-between gap-3 w-full">
        <div class="w-full">
          <div class="flex justify-between gap-2 mb-1">
            <p class="text-xs text-neutral-500">{{ timeToDate }}</p>
            <p class="text-xs text-neutral-500">{{ job.id }}</p>
          </div>
          <h3 class="text-sm font-semibold text-neutral-900">
            {{ job.title }}
          </h3>

          <p class="mt-1 text-sm text-neutral-600">
            <span class="font-medium text-neutral-800">{{ job.company }}</span>
            <span class="text-neutral-400"> · </span>
            <span>{{ job.location }}</span>
          </p>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="job.tags?.length" class="mt-4 flex flex-wrap gap-2">
        <span v-for="tag in job.tags.slice(0, 6)" :key="tag"
          class="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
          {{ tag }}
        </span>
      </div>

      <!-- Footer -->
      <div class="mt-4 flex items-center justify-between">
        <p v-if="job.salaryRange" class="text-sm font-medium text-neutral-900">
          {{ job.salaryRange }}
        </p>

        <span
          class="inline-flex items-center gap-1 text-sm font-medium text-accent-500 transition group-hover:text-accent-600">
          {{ $t('jobs.details') }} <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  </RouterLink>
</template>

<script>
export default {
  name: 'JobSingle',
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  computed: {
    timeToDate() {
      const date = this.job?.createdAt?.toDate() || null;
      if (!date) return '';

      return date.toLocaleString('de-DE',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
    },
  }
}
</script>

<style scoped></style>