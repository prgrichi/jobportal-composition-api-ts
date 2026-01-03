<template>
  <!-- Job Detail Header (Breadcrumb Navigation) -->
  <header class="mx-auto max-w-app px-4 py-5">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-3">

        <!-- Back to Jobs Link -->
        <RouterLink :to="backRoute" class="inline-flex items-center gap-2 rounded-xl px-3 md:px-0 py-2 
                 text-sm font-medium text-muted-foreground 
                 hover:bg-muted hover:text-foreground">
          <span aria-hidden="true">←</span>
          Jobs
        </RouterLink>

        <!-- Separator -->
        <span class="text-xs text-neutral-400">/</span>

        <!-- Current Job Number -->
        <span class="text-sm font-medium text-foreground">
          {{ jobNumber }}
        </span>

      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'JobDetailHeader',

  props: {
    jobNumber: {
      type: String,
      default: ''
    },
    backRoute: {
      type: Object,
      required: true
    }
  }
}
</script>