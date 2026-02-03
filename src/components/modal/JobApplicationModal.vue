<template>
  <BaseModal :isOpen="isOpen" size="3xl" @close="onClose">
    <template #title>
      {{ $t('jobs.application.general.title', { jobTitle: jobTitle }) }}
    </template>

    <template #description>
      <p>{{ $t('jobs.application.general.copy') }}</p>
    </template>

    <template #content>
      <Form
        :initial-values="initialValues"
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors }"
        class="max-w-md mx-auto rounded-lg"
      >
        <!-- first name field -->
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.firstName') }}
            <span class="text-red-500" aria-hidden="true">* </span>
          </label>
          <Field
            as="input"
            required
            name="firstName"
            type="text"
            id="firstName"
            autocomplete="given-name"
            class="w-full border bg-white border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
            :aria-invalid="!!errors.firstName"
            :aria-describedby="errors.firstName ? 'firstName-error' : undefined"
            :placeholder="$t('jobs.application.general.placeholder.firstName')"
          />
          <ErrorMessage name="firstName" v-slot="{ message }">
            <small id="firstName-error" class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- last name field -->
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.lastName') }}
            <span class="text-red-500" aria-hidden="true">* </span>
          </label>
          <Field
            as="input"
            required
            name="lastName"
            type="text"
            id="lastName"
            autocomplete="family-name"
            class="w-full border bg-white border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
            :aria-invalid="!!errors.lastName"
            :aria-describedby="errors.lastName ? 'lastName-error' : undefined"
            :placeholder="$t('jobs.application.general.placeholder.lastName')"
          />
          <ErrorMessage name="lastName" v-slot="{ message }">
            <small id="lastName-error" class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- E-Mail field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.email') }}
            <span class="text-red-500" aria-hidden="true">* </span>
          </label>
          <Field
            as="input"
            readonly
            required
            name="email"
            type="text"
            id="email"
            autocomplete="email"
            class="bg-white cursor-not-allowed w-full border border-border rounded-md p-2 focus:outline-none focus:ring-0"
            :aria-describedby="'email-error'"
          />
          <p class="text-xs text-muted-foreground mt-1">
            {{ $t('jobs.application.general.emailFromAccount') }}
          </p>
          <ErrorMessage name="email" v-slot="{ message }">
            <small id="email-error" class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- salary Field -->
        <div class="mb-4">
          <label for="salary" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.salary') }}
          </label>
          <Field
            as="input"
            name="salary"
            type="text"
            id="salary"
            autocomplete="off"
            class="w-full border bg-white border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
            :aria-invalid="!!errors.salary"
            :aria-describedby="errors.salary ? 'salary-error' : undefined"
            :placeholder="$t('jobs.application.general.placeholder.salary')"
          />
          <ErrorMessage name="salary" v-slot="{ message }">
            <small id="salary-error" class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- file upload Field -->
        <div class="mb-4">
          <label for="cv" class="block text-sm font-medium text-muted-foreground mb-1">
            {{ $t('jobs.application.general.fileUpload') }}
            <span class="text-red-500" aria-hidden="true">* </span>
          </label>
          <Field name="cv" v-slot="{ handleChange, handleBlur }">
            <input
              id="cv"
              required
              type="file"
              accept=".pdf"
              @change="handleChange"
              @blur="handleBlur"
              :aria-invalid="!!errors.cv"
              :aria-describedby="errors.cv ? 'cv-error' : 'cv-help'"
              class="w-full border bg-white border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <ErrorMessage name="cv" v-slot="{ message }">
            <small id="cv-error" class="text-red-500">{{ message }}</small>
          </ErrorMessage>
        </div>

        <!-- Submit Button -->
        <!-- button is disabled because its just a demo project -->
        <button type="submit" :aria-busy="isLoading" disabled class="btn btn-primary w-full">
          <span>Absenden</span>
        </button>
      </Form>
    </template>
    <template #footer> </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';

import BaseModal from './BaseModal.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { createJobApplicationSchema } from '@/schemas';
import { useAuthStore } from '@/stores/auth/auth';

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  jobTitle: {
    type: String,
    required: false,
  },
});

const authStore = useAuthStore();
const schema = createJobApplicationSchema();

const initialValues = computed(() => {
  return {
    email: authStore.user?.email || '',
  };
});

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
};
const onSubmit = values => {
  console.log('Form submitted with values:', values);
};
</script>
