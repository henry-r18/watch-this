<script setup lang="ts"></script>

<template>
  <main class="h-full flex flex-col space-y-2 items-center justify-center">
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
      <button>New</button>
      <button>Classic</button>
    </div>

    <div class="question">
      <label>What general tone are you in the mood for?</label>
      <button>Funny, Lighthearted</button>
      <button>Thought-Provoking, Cerebral</button>
      <button>Scary, Thrilling</button>
      <button>Inspiring, Emotional</button>
      <button>Sweet, Romantic</button>
    </div>

    <button>Watch This!</button>
  </main>
</template>

<style scoped>
.question {
  @apply flex flex-col space-y-1 text-white;
}

textarea {
  @apply bg-popchoice-blue-lite rounded-lg h-16;
}

button {
  @apply bg-popchoice-green rounded-full w-fit px-2 text-green-900;
}
</style>
