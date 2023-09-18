<template>
  <appHeader />
  <v-content v-if="user.name" class="mainPage">
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
  <v-content v-else>
    <div class="text-center">
      <h1>Приветствую вас</h1>
      <h2>в приложении по улучшении своего питания!</h2>
      <br />
      <p class="font-italic">
        Так как контролируя, что вы едите, вы станете лучше выбирать
        что съесть
      </p>
      <br />
      <h2>Давайте приступим!</h2>
      <br />
      <v-btn>
        <routerLink :to="{ name: 'userSettings' }" class="routerLink"
          >Познакомиться</routerLink
        >
      </v-btn>
    </div>
  </v-content>
</template>
<script>
import { useFoodStore } from '@/stores/foodBase'
import { useUserInformation } from '@/stores/user'
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
      user: useUserInformation(),
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
