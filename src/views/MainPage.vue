<template>
  <appHeader />
  <v-content v-if="user.isUser" class="mainPage">
    <h1 class="text-center">Доброго времени суток!</h1>
    <div>
      <v-btn
        variant="flat"
        class="text-decoration-underline px-2"
        background-color="grey"
        @click="isCalendarShowed = true"
        >{{ selecttedDay }}</v-btn
      >
      <div class="calendar" v-if="isCalendarShowed">
        <appCalendar @selecttedDate="selectDate" />
      </div>
      <span v-if="isEatenSmth">вы съели:</span>
      <span v-else>вы еще ничего не съели.</span>
    </div>
    <div v-if="isEatenSmth">
      <appMealTable :foods="getTodayEatenFood" />
    </div>
    <div v-else>
      <appAddProduct type="string" />
    </div>

    <!-- <div class="d-flex justify-center">
      <v-locale-provider locale="ru">
        <v-date-picker
          v-if="isCalendarShowed && false"
          elevation="24"
          color="primary"
          v-model="date"
        ></v-date-picker>
      </v-locale-provider>
    </div> -->
    <v-row
      v-if="isEatenSmth"
      class="my-4 d-flex flex-column align-center"
    >
      <!-- d-flex flex-column align-end justify-end  -->
      <v-row class="justify-end mb-n1">Что-то еще съели?</v-row>
      <v-row><appAddProduct type="string" /></v-row>
    </v-row>
    {{ today }}
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
import { useFoodStore, eatenFoodTemplate } from '@/stores/foodBase'
import { useUserInformation } from '@/stores/user'

import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'

import appHeader from '@/components/Header.vue'
import appAddProduct from '@/components/AddProduct.vue'
import appMealTable from '@/components/MealTable.vue'
import appCalendar from '@/components/Calendar.vue'
export default {
  name: 'appGlobalFeed',
  components: {
    appHeader,
    appAddProduct,
    appMealTable,
    appCalendar,
  },
  data() {
    return {
      foodStore: useFoodStore(),
      user: useUserInformation(),
      todayEatenFood: [],
      today: format(new Date(), 'dd.MM.yyyy', { locale: ru }),
      isCalendarShowed: false,
    }
  },
  computed: {
    dateCute() {
      return this.today
        ? format(this.today, 'dd MMM yyyy', { locale: ru })
        : ''
    },
    selecttedDay() {
      if (this.today == format(new Date(), 'dd.MM.yyyy')) {
        return 'СЕГОДНЯ'
      } else if (
        new Date().getDate() - this.today.slice(0, 2) ===
        1
      ) {
        return 'ВЧЕРА'
      } else {
        return this.today
      }
    },
    getTodayEatenFood() {
      return this.foodStore.eatenFoods.filter(
        item => item.date === this.today
      )
    },
    isEatenSmth() {
      return !!this.getTodayEatenFood.length
    },
  },
  methods: {
    showDate() {
      let date = new Date()
      console.log('date: ', date)
    },
    selectDate(data) {
      console.log('i recieve data:', data)
      this.today = format(data.date, 'dd.MM.yyyy', { locale: ru })
      this.isCalendarShowed = false
      console.log('today', this.today)
    },
  },
  mounted() {
    this.foodStore.getFood()
  },
}
</script>

<style lang="scss" scoped>
.calendar {
  position: absolute;
  top: 50px;
  max-height: 600px;
}
</style>
