<template>
  <div class="mt-4 md:mt-6">

    <!-- Auth Form (Login/Register) -->
    <Form @submit="onSubmit" :validation-schema="schema" class="max-w-md mx-auto rounded-lg">

      <!-- Email Field -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-muted-foreground mb-1">
          {{ $t('auth.general.email') }}
        </label>
        <Field as="input" name="email" type="email" id="email"
          class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('auth.general. placeholder.email')" />
        <ErrorMessage name="email" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <!-- Password Field -->
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-muted-foreground mb-1">
          {{ $t('auth.general.password') }}
        </label>
        <Field as="input" name="password" type="password" id="password"
          class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('auth.general.placeholder.password')" />
        <ErrorMessage name="password" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <!-- Confirm Password Field (nur bei Register) -->
      <div v-if="mode === 'register'" class="mb-6">
        <label for="confirmPassword" class="block text-sm font-medium text-muted-foreground mb-1">
          {{ $t('auth.general. confirmPassword') }}
        </label>
        <Field as="input" name="confirmPassword" type="password" id="confirmPassword"
          class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('auth.general.placeholder.confirmPassword')" />
        <ErrorMessage name="confirmPassword" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="isLoading" class="btn btn-primary w-full">
        <!-- Loading Spinner -->
        <span v-if="isLoading"
          class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
        <span>{{ submitLabel }}</span>
      </button>

    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToastStore } from '@/stores/toast/toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores/auth/auth';
import { useI18n } from 'vue-i18n';

export default {
  name: 'AuthForm',

  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },

  components: {
    Form,
    Field,
    ErrorMessage
  },

  props: {
    mode: {
      type: String,
      required: true,
      validator: (value) => ['login', 'register'].includes(value)
    }
  },

  data() {
    // Base Validation Schema (Email + Password)
    const baseSchema = {
      email: yup.string()
        .required(this.t('errors.emailRequired'))
        .email(this.t('errors.emailInvalid')),
      password: yup.string()
        .required(this.t('errors.passwordRequired'))
        .min(6, this.t('errors.paswordLength')),
    };

    // Register Schema (Base + Confirm Password)
    const registerSchema = {
      ...baseSchema,
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], this.t('errors.passwordMismatch'))
        .required(this.t('errors.confirmPassword')),
    };

    return {
      isLoading: false,
      schema: yup.object(this.mode === 'register' ? registerSchema : baseSchema),
    };
  },

  computed: {
    authStore() {
      return useAuthStore();
    },

    toast() {
      return useToastStore();
    },

    // Dynamic Submit Button Label
    submitLabel() {
      if (this.mode === 'register') {
        return this.isLoading
          ? this.t('general.btn.ui.creatingAccount')
          : this.t('general.btn.ui.createAccount');
      }
      return this.isLoading
        ? this.t('general.btn.ui.signingIn')
        : this.t('general.btn.ui.signIn');
    },
  },

  methods: {
    async onSubmit(values) {
      try {
        this.isLoading = true;

        // Register Mode
        if (this.mode === 'register') {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await this.authStore.createUserDocument(userCredential.user);
          this.toast.success(this.t('toast.registerSuccess'));
          this.$router.push({ name: 'home' });
        }
        // Login Mode
        else {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await this.authStore.createUserDocument(userCredential.user);
          this.toast.success(this.t('toast.loginSuccess'));

          // Redirect to previous page or home
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(redirectPath);
        }

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        // Handle Firebase Auth Errors
        if (error.code === 'auth/invalid-credential') {
          this.toast.error(this.t('errors. invalidCredentials'));
        }
        else if (error.code === 'auth/email-already-in-use') {
          this.toast.error(this.t('errors.emailAlreadyInUse'));
        }
        else {
          this.toast.error(error.message);
        }
      }
    }
  },
}
</script>