<template>
  <section class="py-12 md:py-20">
    <div class="max-w-app mx-auto px-4">

      <div class="grid gap-12 md:grid-cols-2 lg:items-start">

        <div>
          <p class="text-sm uppercase tracking-wider text-primary-600">
            {{ $t('why.label') }}
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-neutral-900">
            {{ $t('why.title') }}
          </h2>
          <p class="mt-4 max-w-prose text-neutral-600 leading-relaxed">
            {{ $t('why.description') }}
          </p>
        </div>

        <div class="rounded-xl border border-neutral-200 bg-white divide-y divide-neutral-200">
          <div class="p-6 md:p-7">
            <h3 class="font-medium text-neutral-900">
              {{ $t('why.features.relevantJobs. title') }}
            </h3>
            <p class="mt-2 text-sm text-neutral-600">
              {{ $t('why.features.relevantJobs.description') }}
            </p>
          </div>

          <div class="p-6 md:p-7">
            <h3 class="font-medium text-neutral-900">
              {{ $t('why.features.remoteFlexible.title') }}
            </h3>
            <p class="mt-2 text-sm text-neutral-600">
              {{ $t('why.features.remoteFlexible.description') }}
            </p>
          </div>

          <div class="p-6 md:p-7">
            <h3 class="font-medium text-neutral-900">
              {{ $t('why.features.noDistraction.title') }}
            </h3>
            <p class="mt-2 text-sm text-neutral-600">
              {{ $t('why.features.noDistraction.description') }}
            </p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'WhySection',
}
</script>

<style scoped></style>