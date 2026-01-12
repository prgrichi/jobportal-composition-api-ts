<template>
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-foreground mb-2">
      {{ title }}
    </h1>
    <p class="text-muted-foreground">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>
