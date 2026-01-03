<template>
  <!-- Job Detail Panel (Text or List) -->
  <section class="rounded-3xl bg-background p-6 ring-1 ring-ring">

    <!-- Panel Title -->
    <h2 class="text-sm font-semibold text-foreground">
      {{ title }}
    </h2>

    <!-- Text Content (if content prop provided) -->
    <p v-if="content" class="mt-3 text-sm leading-6 text-muted-foreground">
      {{ content }}
    </p>

    <!-- List Items (if items array provided) -->
    <ul v-else-if="items && items.length" class="mt-3 space-y-2 text-sm text-muted-foreground">
      <li v-for="item in items" :key="item" class="flex gap-3">
        <!-- Bullet Point -->
        <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600"></span>
        <!-- Item Text -->
        <span class="leading-6">{{ item }}</span>
      </li>
    </ul>

  </section>
</template>

<script>
export default {
  name: 'JobDetailPanel',

  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: null
    }
  }
}
</script>