<template>
  <!-- Info/Disclaimer Strip -->
  <section class="bg-primary-50 border-y border-neutral-200">
    <div class="max-w-app mx-auto px-4 py-20 text-center">

      <!-- Disclaimer Text -->
      <p class="mx-auto max-w-3xl text-base sm:text-lg text-foreground/80 leading-relaxed">
        {{ $t('disclaimer.text') }}
        <strong>{{ $t('disclaimer.projectType') }}</strong>.
        {{ $t('disclaimer. demonstrates') }}
        <strong>{{ $t('disclaimer.tech. vue') }}</strong>,
        <strong>{{ $t('disclaimer. tech.pinia') }}</strong>
        {{ $t('disclaimer. and') }}
        <strong>{{ $t('disclaimer.tech. firebase') }}</strong>
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