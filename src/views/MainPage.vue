<template>
  <appHeader />
  <v-content v-if="user.isUser" class="mainPage">
    <h1 class="text-center">Доброго времени суток!</h1>
    <p>
      <v-btn
        variant="flat"
        class="text-decoration-underline px-2"
        background-color="grey"
        @click="chooseDate"
        >Сегодня</v-btn
      ><span v-if="isEatenSmth">вы съели:</span>
      <span v-else>вы еще ничего не съели.</span>
    </p>
    <div v-if="isEatenSmth">
      <appMealTable :foods="getTodayEatenFood" />
    </div>
    <div v-else>
      <appAddProduct type="string" />
    </div>
    <!-- <v-text-field
      slot="activator"
      label="Date due"
      prepend-icon="date_range"
      @click="openCalendar"
    >
    </v-text-field> -->
    <div class="d-flex justify-center">
      <v-locale-provider locale="ru">
        <v-date-picker
          v-if="isCalendarShowed && false"
          elevation="24"
          color="primary"
          v-model="date"
        ></v-date-picker>
      </v-locale-provider>
    </div>
    <p v-if="isEatenSmth">
      Что-то еще съели?[Кнопка выбора продукта]<appAddProduct
        type="string"
      />
    </p>
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

export default {
  name: 'appGlobalFeed',
  components: {
    appHeader,
    appAddProduct,
    appMealTable,
  },
  data() {
    return {
      foodStore: useFoodStore(),
      user: useUserInformation(),
      todayEatenFood: [],
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
    today() {
      const now = new Date()
      return format(now, 'dd.MM.yyyy', { locale: ru })
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
    openCalendar() {
      this.isCalendarShowed = true
    },
    chooseDate() {
      this.isCalendarShowed = true
    },
  },
  mounted() {
    this.foodStore.getFood()
  },
}
</script>

<style lang="scss" scoped></style>
