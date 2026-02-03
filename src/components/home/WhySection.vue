<template>
  <!-- Why Section (Features) -->
  <section class="mb-10 lg:mb-16 pt-10">
    <div class="max-w-app mx-auto px-4">
      <div class="grid gap-12 md:grid-cols-2 lg:items-start">
        <!-- Left:  Section Header -->
        <div>
          <p class="text-sm uppercase tracking-wider text-primary-600">
            {{ $t('why.label') }}
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-foreground">
            {{ $t('why.title') }}
          </h2>
          <p class="mt-4 max-w-prose text-muted-foreground leading-relaxed">
            {{ $t('why.description') }}
          </p>
        </div>

        <!-- Right: Features List -->
        <div class="rounded-xl border border-border bg-background divide-y divide-border">
          <!-- Feature 1: Relevant Jobs -->
          <div class="p-6 md: p-7">
            <h3 class="font-medium text-foreground">
              {{ $t('why.features.relevantJobs.title') }}
            </h3>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ $t('why.features.relevantJobs.description') }}
            </p>
          </div>

          <!-- Feature 2: Remote & Flexible -->
          <div class="p-6 md:p-7">
            <h3 class="font-medium text-foreground">
              {{ $t('why.features.remoteFlexible.title') }}
            </h3>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ $t('why.features.remoteFlexible.description') }}
            </p>
          </div>

          <!-- Feature 3: No Distraction -->
          <div class="p-6 md:p-7">
            <h3 class="font-medium text-foreground">
              {{ $t('why.features.noDistraction.title') }}
            </h3>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ $t('why.features.noDistraction.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({
  name: 'WhySection',
});
</script>
