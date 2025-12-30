<template>
  <section class="bg-primary-50 border-y border-primary-100">
    <div class="max-w-app mx-auto px-4 py-20 text-center">
      <p class="mx-auto max-w-3xl text-base sm:text-lg text-primary-900/80 leading-relaxed">
        {{ $t('disclaimer.text') }}
        <strong>{{ $t('disclaimer.projectType') }}</strong>.
        {{ $t('disclaimer.demonstrates') }}
        <strong>{{ $t('disclaimer.tech.vue') }}</strong>,
        <strong>{{ $t('disclaimer.tech.pinia') }}</strong>
        {{ $t('disclaimer.and') }}
        <strong>{{ $t('disclaimer.tech.firebase') }}</strong>
        {{ $t('disclaimer.inRealisticApp') }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfoStripSection',
}
</script>

<style></style>