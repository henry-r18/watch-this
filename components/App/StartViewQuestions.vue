<script lang="ts" setup>
import { ref } from "vue";

const userInput = useUserInput();

const runtimeOptions = ref([
  {
    label: "Short Film (< 40 mins)",
    value: "40",
  },
  {
    label: "Shorter Feature (40-80 mins)",
    value: "80",
  },
  {
    label: "Typical Feature (80-120 mins)",
    value: "120",
  },
  {
    label: "We've got all day!",
    value: "No limit",
  },
]);
</script>

<template>
  <UFormField
    class="space-y-2"
    label="How many people in your party?"
    name="partySizeInput"
  >
    <UInputNumber
      v-model="userInput.partySize"
      color="secondary"
    ></UInputNumber>
  </UFormField>

  <UFormField
    class="space-y-2"
    label="How much time do you have?"
    name="runtimeInput"
  >
    <USelect
      class="w-full min-h-8"
      v-model="userInput.maxRuntime"
      :items="runtimeOptions"
      color="secondary"
    ></USelect>
  </UFormField>
</template>

<style></style>
