<template>
  <section class="py-6 md:py-12">
    <div class="max-w-app mx-auto px-4">
      <h1 class="text-2xl font-semibold text-foreground mb-6">{{ $t('jobs.headline') }}</h1>

      <JobFilters />
      <JobList />
    </div>
  </section>
</template>

<script setup>
import JobFilters from '@/components/jobs/JobFilters.vue';
import JobList from '@/components/jobs/JobList.vue';
</script>

<style scoped></style>
