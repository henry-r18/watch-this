export default defineAppConfig({
  ui: {
    formField: {
      slots: {
        label: "text-neutral-200 font-light",
      },
    },
    inputNumber: {
      slots: {
        root: "bg-secondary-500",
      },
    },
    button: {
      slots: {
        label: "uppercase text-neutral-200",
      },
    },
    radioGroup: {
      slots: {
        label: "text-neutral-200",
      },
    },
  },
});
