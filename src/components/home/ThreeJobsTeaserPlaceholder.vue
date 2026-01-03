<template>
  <!-- Locked Job Placeholder Card -->
  <article class="rounded-xl border border-border bg-background p-6 shadow-sm transition hover:shadow-md">

    <!-- Lock Badge -->
    <div class="mb-3 flex justify-end">
      <span
        class="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
        🔒 {{ $t('threejobsteaser.placeholder.locked') }}
      </span>
    </div>

    <!-- Blurred Job Content (Fake Preview) -->
    <div class="mb-4 space-y-2.5 opacity-20">
      <!-- Fake Title -->
      <div class="h-5 w-3/4 rounded bg-neutral-300"></div>

      <!-- Fake Subtitle -->
      <div class="h-4 w-1/2 rounded bg-muted"></div>

      <!-- Fake Tags -->
      <div class="flex gap-2 pt-2">
        <div class="h-6 w-14 rounded-full bg-muted"></div>
        <div class="h-6 w-16 rounded-full bg-muted"></div>
      </div>
    </div>

    <!-- Lock Message -->
    <p class="mb-3 text-center text-sm text-muted-foreground">
      {{ $t('threejobsteaser.placeholder.text') }}
    </p>

    <!-- CTA Buttons -->
    <div class="grid justify-center gap-3 md:grid-cols-2">
      <RouterLink to="/login" class="btn btn-primary">
        {{ $t('general.btn.signInNow') }}
      </RouterLink>
      <RouterLink to="/register" class="btn btn-secondary">
        {{ $t('general.btn.registerNow') }}
      </RouterLink>
    </div>

  </article>
</template>

<script>
export default {
  name: 'ThreeJobsTeaserPlaceholder'
}
</script>