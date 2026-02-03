<template>
  <div class="mt-8 grid gap-4 lg:grid-cols-3">
    <!-- Beschreibung -->
    <JobDetailPanel title="Beschreibung" :content="job.description" />

    <!-- Aufgaben -->
    <JobDetailPanel title="Aufgaben" :items="job.responsibilities" />

    <!-- Profil -->
    <JobDetailPanel title="Profil" :items="job.requirements" />
  </div>
</template>

<script setup>
import JobDetailPanel from './JobDetailPanel.vue';
defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>
