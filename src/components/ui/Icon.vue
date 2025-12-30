<template>
  <component :is="iconComponent" :class="iconClass" />
</template>

<script>
import {
  UserIcon,
  AdjustmentsVerticalIcon,
  StarIcon,
  LockClosedIcon
} from '@heroicons/vue/24/outline';

import {
  StarIcon as StarIconSolid,
} from '@heroicons/vue/24/solid';

const ICONS = {
  outline: {
    User: UserIcon,
    AdjustmentsVertical: AdjustmentsVerticalIcon,
    Star: StarIcon,
    LockClosed: LockClosedIcon
  },
  solid: {
    Star: StarIconSolid,
  }
}

export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'outline',
      validator: (value) => ['outline', 'solid'].includes(value)
    },
    iconClass: {
      type: String,
      default: 'h-6 w-6'
    }
  },
  computed: {
    iconComponent() {
      return ICONS[this.type]?.[this.name];
    }
  }
}
</script>