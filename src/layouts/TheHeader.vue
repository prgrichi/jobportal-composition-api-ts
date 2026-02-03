<template>
  <!-- Site Header (Sticky) -->
  <header class="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
    <!-- Top Bar (Dark Mode + Language + User Greeting) -->
    <div class="border-b border-border bg-primary-500">
      <div class="mx-auto max-w-app px-4">
        <div class="flex h-10 items-center justify-between gap-4 text-xs">
          <!-- Top Navigation Bar -->
          <HeaderTopBar />
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <HeaderMainNav />
  </header>
</template>

<script setup>
import HeaderTopBar from '@/layouts/components/HeaderTopBar.vue';
import HeaderMainNav from '@/layouts/components/HeaderMainNav.vue';
</script>
