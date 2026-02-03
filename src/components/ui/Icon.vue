<template>
  <!-- Dynamic Icon Component -->
  <component :is="iconComponent" :class="iconClass" />
</template>

<script setup>
import { computed } from 'vue';

// Heroicons Outline
import {
  UserIcon,
  AdjustmentsVerticalIcon,
  StarIcon,
  LockClosedIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/vue/24/outline';

// Heroicons Solid
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';

// Icon Registry
const ICONS = {
  outline: {
    User: UserIcon,
    AdjustmentsVertical: AdjustmentsVerticalIcon,
    Star: StarIcon,
    LockClosed: LockClosedIcon,
    Bars3: Bars3Icon,
    XMark: XMarkIcon,
    Sun: SunIcon,
    Moon: MoonIcon,
    Check: CheckIcon,
    Eye: EyeIcon,
    EyeSlash: EyeSlashIcon,
  },
  solid: {
    Star: StarIconSolid,
  },
};

const props = defineProps({
  // Icon name (must match key in ICONS registry)
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'outline',
    validator: value => ['outline', 'solid'].includes(value),
  },
  // Custom CSS classes for icon
  iconClass: {
    type: String,
    default: 'h-6 w-6',
  },
});

const iconComponent = computed(() => {
  const icon = ICONS[props.type]?.[props.name];
  if (!icon) {
    console.warn(`[Icon] Unknown icon: type="${props.type}", name="${props.name}"`);
  }
  return icon;
});
</script>

<style scoped></style>
