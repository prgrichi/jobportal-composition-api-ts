<template>
  <div class="rounded-xl bg-muted p-3">
    <p class="text-xs text-neutral-500">{{ label }}</p>
    <p class="mt-1 text-sm font-semibold text-foreground">
      {{ value }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>
