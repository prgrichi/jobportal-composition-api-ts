<template>
  <!-- Auth Form (Login/Register) -->
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ errors }"
    class="max-w-md mx-auto rounded-lg mt-10"
  >
    <!-- Email Field -->
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-muted-foreground mb-1">
        {{ $t('auth.general.email') }}
      </label>
      <Field
        as="input"
        name="email"
        type="email"
        id="email"
        autocomplete="email"
        class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
        :placeholder="$t('auth.general.placeholder.email')"
        :aria-invalid="!!errors.email"
        :aria-describedby="errors.email ? 'email-error' : undefined"
      />
      <ErrorMessage name="email" v-slot="{ message }">
        <small id="email-error" class="text-red-500">{{ message }}</small>
      </ErrorMessage>
    </div>

    <!-- Password Field -->
    <div class="mb-6">
      <label for="password" class="block text-sm font-medium text-muted-foreground mb-1">
        {{ $t('auth.general.password') }}
      </label>
      <div class="relative">
        <Field
          as="input"
          :type="toggleInputType"
          name="password"
          id="password"
          :autocomplete="passwordAutocomplete"
          class="w-full border bg-background border-border rounded-md p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-ring"
          :placeholder="$t('auth.general.placeholder.password')"
          :aria-invalid="!!errors.password"
          :aria-describedby="errors.password ? 'password-error' : undefined"
        />
        <button
          type="button"
          @click="togglePassword"
          class="h-full cursor-pointer absolute p-2 right-1 top-0"
          :aria-label="showPasswordLabel"
        >
          <Icon aria-hidden="true" :name="showPassword ? 'EyeSlash' : 'Eye'" icon-class="h-5 w-5" />
        </button>
      </div>
      <ErrorMessage name="password" v-slot="{ message }">
        <small id="password-error" class="text-red-500">{{ message }}</small>
      </ErrorMessage>
    </div>

    <!-- Confirm Password Field (nur bei Register) -->
    <div v-if="mode === 'register'" class="mb-6">
      <label for="confirmPassword" class="block text-sm font-medium text-muted-foreground mb-1">
        {{ $t('auth.general.confirmPassword') }}
      </label>
      <div class="relative">
        <Field
          as="input"
          name="confirmPassword"
          :type="toggleConfirmInputType"
          id="confirmPassword"
          autocomplete="new-password"
          class="w-full border bg-background border-border rounded-md p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-ring"
          :placeholder="$t('auth.general.placeholder.confirmPassword')"
          :aria-invalid="!!errors.confirmPassword"
          :aria-describedby="errors.confirmPassword ? 'password-confirm-error' : undefined"
        />
        <button
          type="button"
          @click="toggleConfirmPassword"
          class="h-full cursor-pointer absolute p-2 right-1 top-0"
          :aria-label="showPasswordConfirmLabel"
        >
          <Icon
            aria-hidden="true"
            :name="showConfirmPassword ? 'EyeSlash' : 'Eye'"
            icon-class="h-5 w-5"
          />
        </button>
      </div>
      <ErrorMessage name="confirmPassword" v-slot="{ message }">
        <small id="password-confirm-error" class="text-red-500">{{ message }}</small>
      </ErrorMessage>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="isLoading"
      :aria-busy="isLoading"
      class="btn btn-primary w-full"
    >
      <!-- Loading Spinner -->
      <span
        v-if="isLoading"
        aria-hidden="true"
        class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"
      ></span>
      <span>{{ submitLabel }}</span>
    </button>
  </Form>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { useToastStore } from '@/stores/toast/toast';
import { useAuthStore } from '@/stores/auth/auth';
import { auth } from '@/config/firebase';
import { createLoginSchema, createRegisterSchema } from '@/schemas';

// i18n
const { t } = useI18n();

// Props
const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: value => ['login', 'register'].includes(value),
  },
});

// State
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Stores
const authStore = useAuthStore();
const toast = useToastStore();

// Router
const router = useRouter();
const route = useRoute();

// Computeds
const passwordAutocomplete = computed(() =>
  props.mode === 'register' ? 'new-password' : 'current-password'
);

const schema = computed(() =>
  props.mode === 'login' ? createLoginSchema() : createRegisterSchema()
);

const toggleInputType = computed(() => (showPassword.value ? 'text' : 'password'));

const toggleConfirmInputType = computed(() => (showConfirmPassword.value ? 'text' : 'password'));

const submitLabel = computed(() => {
  if (props.mode === 'register') {
    return isLoading.value
      ? t('general.btn.ui.creatingAccount')
      : t('general.btn.ui.createAccount');
  }
  return isLoading.value ? t('general.btn.ui.signingIn') : t('general.btn.ui.signIn');
});

const showPasswordLabel = computed(() =>
  showPassword.value ? t('auth.general.hidePassword') : t('auth.general.showPassword')
);

const showPasswordConfirmLabel = computed(() =>
  showConfirmPassword.value ? t('auth.general.hidePassword') : t('auth.general.showPassword')
);

// Methods
const onSubmit = async values => {
  try {
    isLoading.value = true;

    if (props.mode === 'register') {
      // Register Mode
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await authStore.createUserDocument(userCredential.user);
      toast.success(t('toast.registerSuccess'));
      await router.push({ name: 'home' });
    } else {
      // Login Mode
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      await authStore.createUserDocument(userCredential.user);
      toast.success(t('toast.loginSuccess'));

      // Redirect to previous page or home
      const redirectPath = route.query.redirect || '/';
      await router.push(redirectPath);
    }
  } catch (error) {
    // Handle Firebase Auth Errors
    if (error.code === 'auth/invalid-credential') {
      toast.error(t('errors.invalidCredentials'));
    } else if (error.code === 'auth/email-already-in-use') {
      toast.error(t('errors.emailAlreadyInUse'));
    } else {
      toast.error(error.message);
    }
  } finally {
    isLoading.value = false;
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>
