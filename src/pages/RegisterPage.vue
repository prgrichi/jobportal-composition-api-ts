<template>
  <section class="py-6 md:py-12">
    <div class="max-w-md mx-auto px-4">
      <h1 class="text-2xl font-semibold text-foreground">{{ $t('auth.register.title') }}</h1>
      <p class="mt-2 text-muted-foreground">
        {{ $t('auth.register.subTitle') }}
      </p>
      <RegisterForm />
    </div>
  </section>
</template>

<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<style scoped></style>
