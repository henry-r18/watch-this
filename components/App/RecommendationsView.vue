<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  movies: Object,
});

const currentIndex = ref(0);

const prevCard = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};
const nextCard = () => {
  if (currentIndex.value < props.movies.length - 1) currentIndex.value++;
};
</script>

<template>
  <div class="carousel">
    <div class="carousel-container">
      <div
        class="card"
        v-for="movie in movies"
        :key="movie.id"
        :class="{ active: movie.id === currentIndex }"
      >
        <img :src="movie.poster" alt="Poster Image" class="poster" />
        <h2 class="text-lg">{{ movie.title }} ({{ movie.release_year }})</h2>
        <p class="font-light text-sm">{{ movie.genre }}</p>
        <p class="text-sm italic">{{ movie.plot_summary }}</p>
      </div>
    </div>

    <div class="carousel-controls">
      <button @click="prevCard" :disabled="currentIndex === 0">Previous</button>
      <button @click="nextCard" :disabled="currentIndex === movies.length - 1">
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  @apply w-72 m-auto overflow-hidden;
}

.carousel-container {
  @apply relative flex motion-safe:transition;
  transform: translateX(calc(-100% * v-bind("currentIndex")));
}

.card {
  @apply min-w-full space-y-1 opacity-0 text-white p-4 bg-popchoice-blue-lite rounded-lg shadow-lg motion-safe:transition motion-safe:scale-90;
}

.card.active {
  @apply opacity-100 motion-safe:scale-100;
}

.carousel-controls {
  @apply mt-4 flex justify-center space-x-8;
}

button {
  @apply w-24 p-4 rounded-lg bg-popchoice-green;
}

button:disabled {
  @apply opacity-25;
}

.poster {
  @apply w-full h-auto;
}
</style>
