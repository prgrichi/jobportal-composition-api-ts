<template>
  <!-- Job Detail Hero Section -->
  <div class="lg:col-span-7">

    <!-- Job Title -->
    <h1 class="text-3xl font-bold tracking-tight text-foreground">
      {{ job.title }}
    </h1>

    <!-- Company & Location -->
    <p class="mt-2 text-sm text-muted-foreground">
      {{ job.company }} · {{ job.location }}
    </p>

    <!-- Short Description -->
    <p class="mt-4 text-base text-muted-foreground">
      {{ job.shortDescription }}
    </p>

    <!-- Tags -->
    <div class="mt-5 flex flex-wrap gap-2">
      <span v-for="tag in job.tags" :key="tag"
        class="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground ring-1 ring-ring">
        {{ tag }}
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'JobDetailHero',

  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>