<template>
  <appHeader />
  <v-content class="mainPage">
    <h1 class="text-center">Main Page</h1>
    <p class="text-capitalize bg-red text-blue">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
      repellendus, sequi, fugit temporibus nihil blanditiis
      consectetur officiis debitis quasi nesciunt, dolor sed dolores
      numquam voluptatibus? Voluptates ad aliquam reprehenderit
      quisquam!
    </p>
    <!-- <v-btn
      variant="flat"
      color="blue"
      selected-class="v-slide-group-item--active"
      @click="showDate"
    >
      <v-icon
        margin="left"
        icon="mdi mdi-email-edit-outline"
      ></v-icon>
      <span>email me</span>
    </v-btn> -->
    <p>Date: {{ dateCute }}</p>
    <div class="d-flex justify-center">
      <v-locale-provider locale="ru">
        <v-date-picker
          elevation="24"
          color="primary"
          v-model="date"
        ></v-date-picker>
      </v-locale-provider>
    </div>
  </v-content>
</template>
<script>
import { useFoodStore } from '@/store/index'
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'
import appHeader from '@/components/Header.vue'
export default {
  name: 'appGlobalFeed',
  components: {
    appHeader,
  },
  data() {
    return {
      foodStore: useFoodStore(),
      date: null,
    }
  },
  computed: {
    dateCute() {
      return this.date
        ? format(this.date, 'dd MMM yyyy', { locale: ru })
        : ''
    },
  },
  methods: {
    showDate() {
      let date = new Date()
      console.log('date: ', date)
    },
  },
  // mounted() {
  //   this.foodStore.getFood()
  // },
}
</script>

<style lang="scss" scoped></style>
