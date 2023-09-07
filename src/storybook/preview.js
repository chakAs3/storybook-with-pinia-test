/** @type { import('@storybook/vue3').Preview } */

import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';

const pinia = createPinia();

// Setup the Vue app
setup((app) => {
  console.log('in setup() • app.use(pinia)', { app, pinia });
  app.use(pinia);
});

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
