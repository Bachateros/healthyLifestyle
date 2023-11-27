<template>
  <v-menu location="bottom" scroll>
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        hide-details
      ></v-text-field>
    </template>

    <v-list class="list">
      <v-list-item
        class="hover"
        v-for="item in foodList"
        :key="item.name"
      >
        <v-list-item-title @click="selectFood(item)">
          {{ item.name }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item v-if="foodList.length == 1">
        <v-list-item-title
          class="text-left"
          @click="selectFood(item)"
        >
          <appAddProductToCatalog />
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { useFoodStore } from '@/stores/foodBase.js'
import appAddProductToCatalog from '@/components/AddProductToCatalog.vue'
export default {
  name: 'appSearchFood',
  components: { appAddProductToCatalog },
  data() {
    return {
      search: '',
      foodBase: useFoodStore(),
      isShow: false,
    }
  },
  methods: {
    selectFood(item) {
      if (item.name != 'Нет совпадений') this.search = item.name
      else {
        this.search = ''
      }
      this.$emit('selecttedFood', item)
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
.hover {
  cursor: pointer;
  &:hover {
    background: rgb(232, 232, 232);
  }
}
</style>
