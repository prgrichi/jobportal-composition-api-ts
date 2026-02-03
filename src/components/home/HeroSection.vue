<template>
  <!-- Hero Section -->
  <section class="bg-background relative overflow-hidden mb-10 lg:mb-16 py-10">
    <div class="mx-auto max-w-app px-4">
      <!-- Hero Content -->
      <div class="max-w-2xl">
        <!-- Subtitle/Tagline -->
        <p class="mb-3 text-sm uppercase tracking-wider text-primary-600">
          {{ $t('hero.subtitle') }}
        </p>

        <!-- Main Heading -->
        <h1 class="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {{ $t('hero.title') }}
        </h1>

        <!-- Description -->
        <p class="text-balance mt-5 text-base text-muted-foreground leading-relaxed">
          {{ $t('hero.description') }}
        </p>

        <!-- CTA Buttons -->
        <div class="mt-8 flex flex-wrap gap-4">
          <RouterLink :to="{ name: 'jobs' }" class="btn btn-primary">
            {{ $t('general.btn.jobs') }}
          </RouterLink>

          <a
            href="https://github.com/prgrichi/jobportal"
            rel="noopener noreferrer"
            target="_blank"
            class="btn btn-secondary"
          >
            {{ $t('general.btn.github') }}
          </a>
        </div>
      </div>
    </div>

    <!-- Background Accent (Decorative) -->
    <div
      class="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-primary-500/5 to-transparent"
    ></div>
  </section>
</template>

<script setup>
defineOptions({
  name: 'HeroSection',
});
</script>
