<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import { useFoodStore } from '@/stores/foodBase'
export default {
  name: 'App',
  data() {
    return {
      foodStore: useFoodStore(),
    }
  },
  mounted() {
    this.foodStore.getFood()
  },
}
</script>
