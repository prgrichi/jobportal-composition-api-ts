<template>
  <!-- Tech Stack Section -->
  <section class="py-20 bg-muted">
    <div class="max-w-app mx-auto px-4">

      <!-- Section Header -->
      <div class="mb-14 text-center">
        <p class="text-sm uppercase tracking-wider text-primary-600">
          {{ $t('techStack.label') }}
        </p>
        <h2 class="mt-2 text-3xl font-semibold text-foreground">
          {{ $t('techStack.title') }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {{ $t('techStack.description') }}
        </p>
      </div>

      <!-- Tech Stack Grid -->
      <div class="rounded-l border border-border bg-background overflow-hidden">
        <div class="grid lg:grid-cols-2 lg:divide-x lg:divide-border">

          <!-- Left Column -->
          <div class="divide-y divide-border">

            <!-- Item 01:  Vue -->
            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-500">
                01
              </span>
              <div>
                <h3 class="text-lg font-medium">{{ $t('techStack.items.vue.title') }}</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ $t('techStack.items.vue.description') }}
                </p>
              </div>
            </div>

            <!-- Item 02: Pinia -->
            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                02
              </span>
              <div>
                <h3 class="text-lg font-medium">{{ $t('techStack.items.pinia.title') }}</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ $t('techStack.items.pinia.description') }}
                </p>
              </div>
            </div>

            <!-- Item 03: Vue Router -->
            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                03
              </span>
              <div>
                <h3 class="text-lg font-medium">{{ $t('techStack.items.vueRouter.title') }}</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ $t('techStack.items.vueRouter.description') }}
                </p>
              </div>
            </div>

          </div>

          <!-- Right Column -->
          <div class="divide-y divide-border">

            <!-- Item 04: Firebase -->
            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                04
              </span>
              <div>
                <h3 class="text-lg font-medium">{{ $t('techStack.items.firebase.title') }}</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ $t('techStack.items.firebase.description') }}
                </p>
              </div>
            </div>

            <!-- Item 05: Vite -->
            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                05
              </span>
              <div>
                <h3 class="text-lg font-medium">{{ $t('techStack.items.vite.title') }}</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ $t('techStack.items.vite.description') }}
                </p>
              </div>
            </div>

            <!-- Item 06: Tailwind -->
            <div class="flex items-start gap-6 p-6">
              <span class="flex h-8 w-8 items-center justify-center rounded-full
                  bg-primary-100 text-xs font-mono font-medium text-primary-600">
                06
              </span>
              <div>
                <h3 class="text-lg font-medium">{{ $t('techStack.items.tailwind.title') }}</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ $t('techStack.items.tailwind.description') }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'TechStackSection',
}
</script>