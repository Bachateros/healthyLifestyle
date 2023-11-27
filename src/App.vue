<template>
  <v-app>
    <v-main>
      <RouterView />
      <appHeader />
    </v-main>
  </v-app>
</template>

<script>
import { useFoodStore } from '@/stores/foodBase'
import appHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    appHeader,
  },
  data() {
    return {
      foodStore: useFoodStore(),
    }
  },
  mounted() {
    this.foodStore.setFood()
  },
}
</script>
