import Icon from '@/components/Icon.vue';

declare module 'vue' {
  export interface GlobalComponents {
    Icon: typeof Icon;
  }
}
