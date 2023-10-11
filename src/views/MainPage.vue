<template>
  <appHeader />
  <div v-if="user.isUser" class="pa-5">
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
      <p>
        <appAddProduct />
      </p>
    </div>
    <div v-else>
      <appAddProduct type="string" />
    </div>
    <v-row
      v-if="isEatenSmth"
      class="my-4 d-flex flex-column align-center"
    >
      <v-row class="justify-end mb-n1">Что-то еще съели?</v-row>
      <v-row><appAddProduct type="string" /></v-row>
    </v-row>
  </div>
  <div v-else>
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
  </div>
</template>
<script>
import { useFoodStore } from '@/stores/foodBase'
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
      today: format(new Date(), 'dd.MM.yyyy', { locale: ru }),
      isCalendarShowed: false,
    }
  },
  computed: {
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
    selectDate(data) {
      this.today = format(data.date, 'dd.MM.yyyy', { locale: ru })
      this.isCalendarShowed = false
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
