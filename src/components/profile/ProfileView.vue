<template>
  <div class="bg-background rounded-lg shadow p-6">
    <!-- User Header -->
    <div class="flex items-center gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold">{{ displayName }}</h2>
        <p v-if="profile.jobTitle" class="text-muted-foreground">
          {{ profile.jobTitle }}
        </p>
      </div>
    </div>

    <!-- Profile Fields -->
    <div class="space-y-3">
      <ProfileField label="E-Mail" :value="profile.email" />
      <ProfileField label="Name" :value="displayName" />
      <ProfileField label="Job-Titel" :value="profile.jobTitle" />
      <ProfileField label="Standort" :value="profile.location" />
    </div>

    <!-- Actions -->
    <div class="mt-6">
      <button class="btn btn-primary" @click="emit('edit')">
        {{ editButtonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import ProfileField from './ProfileField.vue';

defineProps({
  profile: {
    type: Object,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  editButtonText: {
    type: String,
    default: 'Bearbeiten',
  },
});

const emit = defineEmits(['edit']);
</script>
