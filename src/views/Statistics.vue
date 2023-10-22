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
      <div v-if="isChoosenDate">
        <v-btn
          variant="tonal"
          class="primary"
          color="#80A1E0"
          @click="resetDate"
          >Сбросить</v-btn
        >
      </div>
    </div>
    <appLineChart
      class="mt-3"
      :data="chartData"
      :categories="chartCategories"
      :foods="chartFoods"
      :title="isChoosenDate ? 'выбранный период' : 'все время'"
    />
    <appBarChart
      class="mt-10"
      :expectedCalories="getNeedCalories"
      :names="barChartNames"
      :data="barChartData"
      :title="isChoosenDate ? 'выбранный период' : 'все время'"
    />
    <appDonutChart
      class="mt-10"
      :data="donutData"
      :title="isChoosenDate ? 'выбранный период' : 'все время'"
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
import appDonutChart from '@/components/DonutChart.vue'

import { useFoodStore } from '@/stores/foodBase'
import { useUserInformation } from '@/stores/user'

export default {
  name: 'appStatistics',
  components: {
    appHeader,
    appCalendar,
    appLineChart,
    appBarChart,
    appDonutChart,
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
      barChartData: [],
      barChartNames: [],
      donutData: [],
    }
  },
  methods: {
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
        this.foodStore.withMultiplyCategories.filter(
          el =>
            el.date >=
              format(this.startDate, 'dd.MM.yyyy', { locale: ru }) &&
            el.date <=
              (this.endDate
                ? format(this.endDate, 'dd.MM.yyyy', { locale: ru })
                : format(new Date(), 'dd.MM.yyyy', { locale: ru }))
        )
      this.chartFoods = filteredArray
      this.chartData = filteredArray.map(el => el.food.calories)
      this.chartCategories = filteredArray.map(el => el.date)
      this.barChartData = this.getBarData
      this.barChartNames = this.getBarNames
      this.donutData = this.getDonutData
    },
    endStatistic() {
      const filteredArray =
        this.foodStore.withMultiplyCategories.filter(
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
      this.chartFoods = filteredArray
      this.chartData = filteredArray.map(el => el.food.calories)
      this.chartCategories = filteredArray.map(el => el.date)
      this.barChartData = this.getBarData
      this.barChartNames = this.getBarNames
      this.donutData = this.getDonutData
    },
    resetDate() {
      this.startDate = null
      this.endDate = null
      this.setup()
    },
    setup() {
      this.chartData = this.getChartData
      this.chartCategories = this.getChartCategories
      this.chartFoods = this.foodStore.withMultiplyCategories
      this.barChartNames = this.getBarNames
      this.barChartData = this.getBarData
      this.donutData = this.getDonutData
    },
  },
  computed: {
    getChartData() {
      return this.foodStore.withMultiplyCategories.map(
        el => el.food.calories
      )
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
      return Array.from(new Set(this.chartFoods.map(el => el.date)))
    },
    getBarData() {
      const barNames = this.getBarNames
      const barData = []
      this.getBarNames.forEach((date, dateIndex) => {
        this.chartFoods.forEach((el, elIndex) => {
          if (el.date === date) {
            barData[dateIndex]
              ? (barData[dateIndex] += el.food.calories)
              : barData.push(el.food.calories)
          }
        })
      })
      return barData
    },
    getDonutData() {
      const donutData = [0, 0, 0]
      this.chartFoods.forEach(el => {
        for (const key in el.food) {
          switch (key) {
            case 'proteins':
              donutData[0] += el.food[key]
              break
            case 'fats':
              donutData[1] += el.food[key]
              break
            case 'carbs':
              donutData[2] += el.food[key]
              break
          }
        }
      })
      return donutData.map(el => +el.toFixed(2))
    },
    isChoosenDate() {
      return this.startDate || this.endDate
    },
  },
  created() {
    this.setup()
  },
}
</script>

<style lang="scss" scoped>
.calendar {
  position: absolute;
}
.reset {
  color: red;
  background: #000;
}
.active {
  background: #b0b0b0;
}
</style>
