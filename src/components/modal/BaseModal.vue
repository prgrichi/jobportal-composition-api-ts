<template>
  <!-- Auth Required Modal -->
  <TransitionRoot :show="isOpen" as="template">
    <Dialog @close="onClose">

      <!-- Backdrop (Dark Overlay) -->
      <TransitionChild as="template" enter="ease-out duration-100" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-150" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/80 z-40" aria-hidden="true"></div>
      </TransitionChild>

      <!-- Modal Container (Centered) -->
      <div class="fixed inset-0 flex z-50 items-center justify-center p-4">

        <!-- Modal Panel with Transition -->
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95">

          <DialogPanel :class="sizeClass" class="bg-white relative rounded-lg p-6 w-full max-h-[90vh] overflow-y-auto">

            <!-- Modal Title -->
            <DialogTitle class="text-xl font-bold mb-4">
              <slot name="title"></slot>
            </DialogTitle>

            <!-- Close Button -->
            <button type="button" @click="onClose"
              class="absolute top-4 right-4 min-w-11 min-h-11 cursor-pointer flex items-center justify-center p-2.5"
              aria-label="Modal schließen">
              <Icon name="XMark" type="outline" icon-class="h-7 w-7 lg:h-6 lg:w-6" />
              <span class="sr-only">Schließen</span>
            </button>

            <!-- Modal Description -->
            <DialogDescription class="text-muted-foreground mb-6">
              <slot name="description"></slot>
            </DialogDescription>

            <!-- <div class="px-6 overflow-y-auto flex-1"> -->
            <slot name="content"></slot>
            <!-- </div> -->

            <!-- Action Buttons -->
            <div class="flex gap-4">
              <slot name="footer"></slot>
            </div>

          </DialogPanel>
        </TransitionChild>
      </div>

    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'BaseModal',

  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    Icon
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(value)
    }
  },

  emits: ['close'],

  computed: {
    sizeClass() {
      const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl'
      };
      return sizes[this.size];
    }
  },
  methods: {
    // Close modal
    onClose() {
      this.$emit('close');
    },

    // Redirect to login page
    goToLogin() {
      this.$emit('close');
      this.$router.push('/login');
    }
  }
};
</script>