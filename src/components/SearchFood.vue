<template>
  <v-menu location="bottom" scroll>
    <template v-slot:activator="{ props }">
      <v-card-title class="text-center">
        <!-- Search food component -->
        <v-spacer></v-spacer>
        <v-text-field
          v-bind="props"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
          @click="log"
        ></v-text-field>
      </v-card-title>
    </template>

    <v-list class="list">
      <v-list-item v-for="item in foodList" :key="item.name">
        <v-list-item-title @click="selectFood(item)">{{
          item.name
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { useFoodStore } from '@/stores/foodBase.js'
export default {
  name: 'appSearchFood',
  data() {
    return {
      search: '',
      foodBase: useFoodStore(),
    }
  },
  methods: {
    selectFood(item) {
      if (item.name != 'Нет совпадений') this.search = item.name
      else this.search = ''
      this.$emit('selecttedFood', item)
    },
    log(e) {
      console.log('event', e.target)
    },
  },
  computed: {
    foodList() {
      const MAX_COUNT = 20
      let searchList = this.foodBase.foods
      searchList = searchList.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      )
      if (searchList.length) {
        return searchList.slice(0, MAX_COUNT)
      } else return [{ name: 'Нет совпадений' }]
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  max-height: 200px;
  max-width: 400px;
  overflow-y: scroll;
}
</style>
