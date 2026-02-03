<template>
  <div class="bg-background rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-6">
      {{ title }}
    </h2>

    <div class="space-y-4">
      <!-- Vorname -->
      <ProfileFormField
        id="firstName"
        v-model="localData.firstName"
        label="Vorname"
        placeholder="Max"
      />

      <!-- Nachname -->
      <ProfileFormField
        id="lastName"
        v-model="localData.lastName"
        label="Nachname"
        placeholder="Mustermann"
      />

      <!-- Job-Titel -->
      <ProfileFormField
        id="jobTitle"
        v-model="localData.jobTitle"
        label="Job-Titel"
        placeholder="z.B. Senior Developer"
      />

      <!-- Standort -->
      <ProfileFormField
        id="location"
        v-model="localData.location"
        label="Standort"
        placeholder="z.B. München"
      />
    </div>

    <!-- Actions -->
    <ProfileFormActions
      :is-saving="isSaving"
      :save-button-text="saveButtonText"
      :cancel-button-text="cancelButtonText"
      @save="handleSave"
      @cancel="emit('cancel')"
    />
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import ProfileFormField from './form/ProfileFormField.vue';
import ProfileFormActions from './form/ProfileFormActions.vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  isSaving: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Profil bearbeiten',
  },
  saveButtonText: {
    type: String,
    default: 'Speichern',
  },
  cancelButtonText: {
    type: String,
    default: 'Abbrechen',
  },
});

const emit = defineEmits(['save', 'cancel']);

const localData = reactive({
  firstName: '',
  lastName: '',
  jobTitle: '',
  location: '',
});

watch(
  () => props.profile,
  newProfile => {
    if (newProfile) {
      localData.firstName = newProfile.firstName || '';
      localData.lastName = newProfile.lastName || '';
      localData.jobTitle = newProfile.jobTitle || '';
      localData.location = newProfile.location || '';
    }
  },
  { immediate: true }
);

const handleSave = () => {
  emit('save', { ...localData });
};
</script>
