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
    <appLineChart class="mt-3" :data="chartData" />
  </div>
</template>
<script>
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'

import appHeader from '@/components/Header.vue'
import appCalendar from '@/components/Calendar.vue'
import appLineChart from '@/components/LineChart.vue'

import { useFoodStore } from '@/stores/foodBase'
import { useUserInformation } from '@/stores/user'

export default {
  name: 'appStatistics',
  components: {
    appHeader,
    appCalendar,
    appLineChart,
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
    }
  },
  methods: {
    selectStartDate(data) {
      this.startDate = data.date
      this.isStartCalendarShowed = false
      this.startStatistic()
      // this.updateChartOptions('title', {
      //   text: format(this.startDate, 'LLLL', {
      //     locale: ru,
      //   }).toUpperCase(),
      // })
      // console.log(this.chartOptions['title'])
    },
    selectEndDate(data) {
      this.endDate = data.date
      this.isEndCalendarShowed = false
    },
    getNiceDate(date) {
      if (date) return format(date, 'dd.MM.yyyy', { locale: ru })
    },
    // updateChartSeries(newData) {
    //   this.series[0].data = newData
    // },
    // updateChartOptionsXaxisCategories(newOptions) {
    //   this.chartOptions.xaxis.categories = newOptions
    // },
    // updateChartOptions(key, newValue) {
    //   this.chartOptions[key] = newValue
    // },
    startStatistic() {
      // const newOptions = {
      //   categories: [],
      //   min: 1,
      //   max: 7,
      //   range: 6,
      // }

      const filteredArray =
        this.foodStore.sortedByDataEatenFoods.filter(
          el =>
            el.date >=
            format(this.startDate, 'dd.MM.yyyy', { locale: ru })
        )
      console.log(filteredArray)

      this.chartData = filteredArray.map(el => el.food.calories)
      console.log(this.chartData)

      // this.updateChartSeries(
      //   filteredArray.map(el => el.food.calories)
      // )
      // this.updateChartOptionsXaxisCategories(
      //   ['test1', 'test2', 'test3']
      //   // filteredArray.map(el => el.date)
      // )
    },
  },
  computed: {
    getEatenFoods() {
      // const filteredArray =
      //   this.foodStore.sortedByDataEatenFoods.filter(
      //     el =>
      //       el.date >=
      //       format(this.startDate, 'dd.MM.yyyy', { locale: ru })
      //   )

      return this.foodStore.sortedByDataEatenFoods.map(
        el => el.food.calories
      )

      return this.foodStore.sortedByDataEatenFoods.filter(
        el =>
          el.date >=
          format(this.startDate, 'dd.MM.yyyy', { locale: ru })
      )
    },
  },
  created() {
    this.chartData = this.getEatenFoods
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
