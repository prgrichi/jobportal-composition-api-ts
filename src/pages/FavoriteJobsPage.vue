<template>
  <section class="py-6 md:py-12">
    <div class="max-w-app mx-auto px-4">
      <JobsFavorite />
    </div>
  </section>
</template>

<script>
import JobsFavorite from '@/components/jobs/JobsFavorite.vue';

export default {
  name: 'FavoriteJobsPage',
  components: {
    JobsFavorite
  },
}
</script>

<style scoped></style>
