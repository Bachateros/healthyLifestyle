<template>
  <appHeader />
  <v-content class="mainPage">
    <h1 class="text-center">Main Page</h1>
    <p>Date: {{ dateCute }}</p>
    <v-text-field
      slot="activator"
      label="Date due"
      prepend-icon="date_range"
      @click="openCalendar"
    >
    </v-text-field>
    <v-date-picker
      v-if="isCalendarShowed"
      v-model="date"
    ></v-date-picker>
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
import { useFoodStore } from '@/stores/foodBase'
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
      isCalendarShowed: false,
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
    openCalendar() {
      this.isCalendarShowed = true
    },
  },
  mounted() {
    this.foodStore.getFood()
  },
}
</script>

<style lang="scss" scoped></style>
