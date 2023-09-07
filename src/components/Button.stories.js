import Button from "./Button.vue";

const StoryTemplate = (args = {}) => ({
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template:
      '<Button :disabled="args.disabled" @press="args.press">{{ args.label }}</Button>',
  }),
  args: {
    label: "Click me",
    disabled: undefined,
    ...args,
  },
});

export default {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    // Args
    label: {
      control: { type: "text" },
      description: "The label of the button",
      table: {
        type: null,
        defaultValue: null,
      },
    },
    // Props
    disabled: {
      control: {
        type: "boolean",
      },
      description: "Determines whether the button should be disabled or not.",
      table: {
        type: {
          summary: "boolean",
        },
        required: false,
        defaultValue: {
          summary: false,
        },
      },
    },
    // Slots
    default: {
      name: "<slot />",
      control: {
        type: null,
      },
      description:
        "Базов *Vue Slot*, предвиден за основното съдържание на компонента.",
      table: {
        //type: {
        //summary: 'something short',
        //detail: 'something really really long'
        //},
        // defaultValue: {
        //summary: 'something short',
        //detail: 'something really really long'
        //}
        type: null,
        defaultValue: null,
      },
    },
  },
};

export const BasicStory = {
  name: "Basic",
  ...StoryTemplate(),
};

export const DisabledStory = {
  name: "Disabled",
  ...StoryTemplate({
    disabled: true,
  }),
};
