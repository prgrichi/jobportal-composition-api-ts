<template>
  <section class="bg-surface relative overflow-hidden">
    <div class="mx-auto max-w-app px-4 py-16 md:py-24">

      <div class="max-w-2xl">
        <p class="mb-3 text-sm uppercase tracking-wider text-primary-600">
          Jobportal Demo
        </p>

        <h1 class="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Eine moderne Jobbörse<br class="hidden sm:block" />
          als Portfolio-Projekt
        </h1>

        <p class="text-balance mt-5 text-base text-neutral-600 leading-relaxed">
          Eine reduzierte Jobbörse als Übungs- und Portfolio-Projekt,
          entwickelt mit Fokus auf Klarheit statt Funktionsfülle.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">

          <RouterLink :to="{ name: 'jobs' }" class="inline-flex items-center justify-center rounded-xl
                        bg-primary-500 px-6 py-3
                        text-sm font-medium text-white
                        transition hover:bg-primary-600
                        focus:outline-none focus:ring-2 focus:ring-primary-500/30">Jobs ansehen</RouterLink>

          <a href="https://github.com/prgrichi/jobportal" rel="noopener noreferrer" target="_blank" class="inline-flex items-center justify-center rounded-xl
                        border border-neutral-300 bg-white px-6 py-3
                        text-sm font-medium text-neutral-700
                        transition hover:bg-neutral-100
                        focus:outline-none focus:ring-2 focus:ring-neutral-300">
            GitHub ansehen
          </a>
        </div>
      </div>

    </div>

    <!-- Subtiler Hintergrund-Akzent -->
    <div class="pointer-events-none absolute right-0 top-0 h-full w-1/3
                    bg-linear-to-l from-primary-500/5 to-transparent">
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped></style>