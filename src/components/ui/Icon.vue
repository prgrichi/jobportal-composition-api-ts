<template>
  <!-- Dynamic Icon Component -->
  <component :is="iconComponent" :class="iconClass" />
</template>

<script>
// Heroicons Outline
import {
  UserIcon,
  AdjustmentsVerticalIcon,
  StarIcon,
  LockClosedIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/vue/24/outline';

// Heroicons Solid
import {
  StarIcon as StarIconSolid,
} from '@heroicons/vue/24/solid';

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
    Moon: MoonIcon
  },
  solid: {
    Star: StarIconSolid,
  }
};

export default {
  name: 'Icon',

  props: {
    // Icon name (must match key in ICONS registry)
    name: {
      type: String,
      required: true
    },
    // Icon type (outline or solid)
    type: {
      type: String,
      default: 'outline',
      validator: (value) => ['outline', 'solid'].includes(value)
    },
    // Custom CSS classes for icon
    iconClass: {
      type: String,
      default: 'h-6 w-6'
    }
  },

  computed: {
    // Get icon component from registry
    iconComponent() {
      return ICONS[this.type]?.[this.name];
    }
  }
}
</script>