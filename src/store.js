import { defineStore } from 'pinia';

export const useCoreStore = defineStore('core', {
  state: () => {
    return {
      env: {
        test: true
      }
    };
  }
});
