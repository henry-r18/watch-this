<script setup lang="ts">
const moods = ["Funny", "Cerebral", "Scary", "Inspiring", "Romantic", "Weird"];
</script>

<template>
  <main class="h-full flex flex-col space-y-3 items-center justify-center">
    <div class="question">
      <label>What's your favorite movie and why?</label>
      <textarea id="favorite_movie" />
    </div>

    <div class="question">
      <label>Who is your favorite actor and why?</label>
      <textarea id="favorite_actor" />
    </div>

    <div class="question">
      <label>Would you prefer something recent or a classic?</label>
      <div class="badges">
        <button class="badge">Recent</button>
        <button class="badge">Classic</button>
      </div>
    </div>

    <div class="question">
      <label>What general tone are you in the mood for?</label>
      <div class="badges">
        <button class="badge" v-for="mood in moods">{{ mood }}</button>
      </div>
    </div>

    <button class="app-button" @click="$emit('recommendButtonClicked')">
      Recommend something!
    </button>
  </main>
</template>

<style scoped>
.question {
  @apply flex flex-col space-y-1 text-white;
}

textarea {
  @apply bg-popchoice-blue-lite rounded-lg h-16;
}

label {
  @apply text-center pb-1;
}

.badges {
  @apply w-fit min-w-48 mx-auto grid grid-cols-2 gap-2;
}

.badge {
  @apply bg-popchoice-green rounded-full w-fit px-2 text-green-900;
}

.app-button {
  @apply h-12 w-64 rounded-lg bg-popchoice-green text-center text-green-900 font-semibold uppercase;
}
</style>
