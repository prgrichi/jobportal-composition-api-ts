<template>
  <div>
    <JobFilter />
    <JobList />
  </div>
</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';
import JobFilter from './JobFilter.vue';
import JobList from './JobList.vue';

export default {
  name: 'Jobs',
  components: {
    JobFilter,
    JobList
  },
  computed: {
    jobStore() {
      return useJobStore();
    }
  },
  created() {
    this.jobStore.fetchJobs({
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: 6
    })
  },

}
</script>

<style scoped></style>
