<template>
  <!-- Auth Required Modal -->
  <TransitionRoot :show="isOpen" as="template">
    <Dialog @close="onClose">

      <!-- Backdrop (Dark Overlay) -->
      <TransitionChild as="template" enter="ease-out duration-100" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-150" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/80 z-40"></div>
      </TransitionChild>

      <!-- Modal Container (Centered) -->
      <div class="fixed inset-0 flex z-50 items-center justify-center p-4">

        <!-- Modal Panel with Transition -->
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95">

          <DialogPanel class="bg-background rounded-lg p-6 max-w-md w-full">

            <!-- Modal Title -->
            <DialogTitle class="text-xl font-bold mb-4">
              {{ $t('modal.authRequired.title') }}
            </DialogTitle>

            <!-- Modal Description -->
            <DialogDescription class="text-muted-foreground mb-6">
              {{ $t('modal.authRequired.message') }}
            </DialogDescription>

            <!-- Action Buttons -->
            <div class="flex gap-4">
              <!-- Login Button -->
              <button @click="goToLogin" class="btn btn-primary flex-1">
                {{ $t('general.btn.signInNow') }}
              </button>

              <!-- Cancel Button -->
              <button @click="onClose" class="btn btn-secondary">
                {{ $t('general.btn.cancel') }}
              </button>
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

export default {
  name: 'AuthRequiredModal',

  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },

  emits: ['close'],

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