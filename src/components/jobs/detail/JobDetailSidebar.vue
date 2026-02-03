<template>
  <div class="lg:col-span-5">
    <div class="rounded-3xl bg-background p-5 ring-1 ring-ring">
      <!-- Salary + Level -->
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="mt-1 text-lg font-semibold text-foreground">
            {{ job.salaryRange }}
          </p>
        </div>

        <span class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {{ job.level }}
        </span>
      </div>

      <!-- Grid Specs -->
      <div class="mt-4 grid grid-cols-2 gap-3">
        <JobDetailSpec label="Anstellung" :value="job.employmentType" />

        <JobDetailSpec label="Arbeitsmodell" :value="remoteLabel" />

        <JobDetailSpec label="Ort" :value="job.location" />

        <JobDetailSpec label="Erstellt" :value="createdAt" />
      </div>

      <!-- Apply Button -->
      <div class="mt-4 flex gap-2">
        <button type="button" class="btn btn-primary w-full" @click="$emit('apply')">
          {{ $t('general.btn.apply') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import JobDetailSpec from './JobDetailSpec.vue';

defineProps({
  job: {
    type: Object,
    required: true,
  },
  remoteLabel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

defineEmits(['apply']);
</script>
