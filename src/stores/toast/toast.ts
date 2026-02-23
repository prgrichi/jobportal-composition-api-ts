import { defineStore } from 'pinia';
import type { Toast } from '@/types/toast';

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),

  actions: {
    show(message: string, type: Toast['type'] = 'success', timeout: number = 3000) {
      const id = Date.now();

      this.toasts.push({ id, message, type });

      setTimeout(() => {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
      }, timeout);
    },

    success(message: string) {
      this.show(message, 'success');
    },

    error(message: string) {
      this.show(message, 'error');
    },
  },
});
