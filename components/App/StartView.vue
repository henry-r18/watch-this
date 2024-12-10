<script setup lang="ts"></script>

<template>
  <main class="h-full flex flex-col space-y-2 items-center justify-center">
    <img src="~/assets/img/icon.svg" class="size-32" />
    <h1 class="text-3xl text-white font-display">PopChoice</h1>
    <div class="flex flex-col space-y-4 pt-4">
      <input placeholder="How many viewers in your party?" />
      <input placeholder="How much time do you have?" />
      <button>Start Popping!</button>
    </div>
  </main>
</template>

<style scoped>
input {
  @apply h-12 w-64 rounded-lg bg-popchoice-blue-lite text-center text-white;
}
button {
  @apply h-12 w-64 rounded-lg bg-popchoice-green text-center font-semibold uppercase;
}
</style>
