<template>
  <nav class="flex items-center gap-2" role="group" :aria-label="$t('nav.languageSelector')">
    <button
      type="button"
      lang="de"
      :aria-label="$t('nav.switchToGerman')"
      :aria-current="currentLangDe"
      @click="changeLang('de')"
      :class="['cursor-pointer text-white', deClasses]"
    >
      DE
    </button>
    <span class="text-neutral-300" aria-hidden="true">|</span>
    <button
      type="button"
      lang="en"
      :aria-label="$t('nav.switchToEnglish')"
      :aria-current="currentLangEn"
      @click="changeLang('en')"
      :class="['cursor-pointer text-white', enClasses]"
    >
      EN
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocaleStore } from '@/stores/ui/locale';

const { locale } = useI18n();
const localeStore = useLocaleStore();

// Current i18n locale
const currentLocale = computed(() => {
  return localeStore.locale;
});

const currentLangDe = computed(() => {
  return currentLocale.value === 'de' ? 'page' : undefined;
});

const currentLangEn = computed(() => {
  return currentLocale.value === 'en' ? 'page' : undefined;
});

// German button classes (active/inactive)
const deClasses = computed(() => {
  return currentLocale.value === 'de' ? 'font-bold text-primary-600' : 'text-muted-foreground';
});
// English button classes (active/inactive)
const enClasses = computed(() => {
  return currentLocale.value === 'en' ? 'font-bold text-primary-600' : 'text-muted-foreground';
});

// Change language
const changeLang = lang => {
  locale.value = lang;
  localeStore.setLocale(lang);
};
</script>

<style scoped></style>
