<template>
  <appHeader />
  <div class="text-center px-3 py-1">
    <div>
      <v-btn
        variant="flat"
        class="text-decoration-underline px-2"
        :class="isStartCalendarShowed ? 'active' : ''"
        @click="
          isEndCalendarShowed ? '' : (isStartCalendarShowed = true)
        "
        >{{ startDate ? getNiceDate(startDate) : 'Начало' }}</v-btn
      >
      <div class="calendar" v-if="isStartCalendarShowed">
        <appCalendar @selecttedDate="selectStartDate" />
      </div>
      <span class="mx-2">-</span>
      <v-btn
        variant="flat"
        class="text-decoration-underline px-2"
        :class="isEndCalendarShowed ? 'active' : ''"
        @click="
          isStartCalendarShowed ? '' : (isEndCalendarShowed = true)
        "
        >{{ endDate ? getNiceDate(endDate) : 'Конец' }}</v-btn
      >
      <div class="calendar" v-if="isEndCalendarShowed">
        <appCalendar
          @selecttedDate="selectEndDate"
          :min="startDate"
        />
      </div>
    </div>
    {{ user.userData }}
    {{ getNeedCalories }}
    {{ getBarNames }}
    <appLineChart
      class="mt-3"
      :data="chartData"
      :categories="chartCategories"
      :foods="chartFoods"
    />
    <appBarChart
      class="mt-10"
      :expectedCalories="getNeedCalories"
      :names="getBarNames"
      :data="getBarData"
    />
  </div>
</template>
<script>
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'

import appHeader from '@/components/Header.vue'
import appCalendar from '@/components/Calendar.vue'
import appLineChart from '@/components/LineChart.vue'
import appBarChart from '@/components/BarChart.vue'

import { useFoodStore } from '@/stores/foodBase'
import { useUserInformation } from '@/stores/user'

export default {
  name: 'appStatistics',
  components: {
    appHeader,
    appCalendar,
    appLineChart,
    appBarChart,
  },
  data() {
    return {
      foodStore: useFoodStore(),
      user: useUserInformation(),
      startDate: null,
      endDate: null,
      isStartCalendarShowed: false,
      isEndCalendarShowed: false,
      chartData: [],
      chartCategories: [],
      chartFoods: [],
    }
  },
  methods: {
    getValue(smth, mass) {
      return +((smth * mass) / 100).toFixed(2)
    },
    selectStartDate(data) {
      this.startDate = data.date
      this.isStartCalendarShowed = false
      this.startStatistic()
    },
    selectEndDate(data) {
      this.endDate = data.date
      this.isEndCalendarShowed = false
      this.endStatistic()
    },
    getNiceDate(date) {
      if (date) return format(date, 'dd.MM.yyyy', { locale: ru })
    },
    startStatistic() {
      const filteredArray =
        this.foodStore.sortedByDataEatenFoods.filter(
          el =>
            el.date >=
              format(this.startDate, 'dd.MM.yyyy', { locale: ru }) &&
            el.date <=
              (this.endDate
                ? format(this.endDate, 'dd.MM.yyyy', { locale: ru })
                : format(new Date(), 'dd.MM.yyyy', { locale: ru }))
        )
      for (const key in filteredArray.food) {
        if (key != 'name') {
          filteredArray.food[key] = this.getValue(
            filteredArray.food[key],
            filteredArray.mass
          )
        }
      }
      this.chartFoods = filteredArray
      console.log(this.chartData)
      // this.chartData = filteredArray.map(el => el.food.calories)
      this.chartCategories = filteredArray.map(el => el.date)
    },
    endStatistic() {
      const filteredArray =
        this.foodStore.sortedByDataEatenFoods.filter(
          el =>
            el.date <=
              format(this.endDate, 'dd.MM.yyyy', { locale: ru }) &&
            el.date >=
              (this.startDate
                ? format(this.startDate, 'dd.MM.yyyy', { locale: ru })
                : format(new Date(0), 'dd.MM.yyyy', {
                    locale: ru,
                  }))
        )
      for (const key in filteredArray.food) {
        if (key != 'name') {
          filteredArray.food[key] = this.getValue(
            filteredArray.food[key],
            filteredArray.mass
          )
        }
      }
      this.chartFoods = filteredArray
      console.log(this.chartData)
      this.chartData = filteredArray.map(el => el.food.calories)
      this.chartCategories = filteredArray.map(el => el.date)
    },
  },
  computed: {
    getChartData() {
      const arr = this.foodStore.sortedByDataEatenFoods
      arr.forEach((el, index) => {
        for (const key in el.food) {
          if (key != 'name') {
            arr[index].food[key] = this.getValue(
              el.food[key],
              el.mass
            )
          }
        }
      })
      return arr.map(el => el.food.calories)
    },
    getChartCategories() {
      return this.foodStore.sortedByDataEatenFoods.map(
        el => el.date + `, ${el.type}`
      )
    },
    getNeedCalories() {
      return this.user.userData.sex === 'Male'
        ? this.user.userData.weight * 10 +
            this.user.userData.height * 6.25 -
            this.user.userData.age * 5 +
            5
        : this.user.userData.weight * 10 +
            this.user.userData.height * 6.25 -
            this.user.userData.age * 5 -
            161
    },
    getBarNames() {
      return Array.from(
        new Set(
          this.foodStore.sortedByDataEatenFoods.map(el => el.date)
        )
      )
    },
    getBarData() {
      const barData = []
      this.getBarNames.forEach((el, index) => {
        this.foodStore.sortedByDataEatenFoods
      })
      return []
    },
  },
  created() {
    this.chartData = this.getChartData
    this.chartCategories = this.getChartCategories
  },
  mounted() {
    // const filteredArray = this.foodStore.sortedByDataEatenFoods
    // const uniqDates = new Set(filteredArray.map(el => el.date))
    // const newArr = filteredArray.filter(item => {
    //   if (uniqDates.has(item.date)) {
    //     uniqDates.delete(item.date)
    //     console.log(uniqDates)
    //     return true
    //   } else {
    //     return false
    //   }
    // })
    // newArr.forEach(element => {
    // });
    // console.log(newArr)
    // console.log(uniqDates)
  },
}
</script>

<style lang="scss" scoped>
.calendar {
  position: absolute;
}
.active {
  background: #b0b0b0;
}
</style>
