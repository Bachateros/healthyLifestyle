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
    <appLineChart
      class="mt-3"
      :data="chartData"
      :categories="chartCategories"
    />
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
      chartCategories: [],
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
        this.foodStore.sortedByDataEatenFoods.filter(
          el =>
            el.date >=
              format(this.startDate, 'dd.MM.yyyy', { locale: ru }) &&
            el.date <=
              (this.endDate
                ? format(this.endDate, 'dd.MM.yyyy', { locale: ru })
                : format(new Date(), 'dd.MM.yyyy', { locale: ru }))
        )
      this.chartData = filteredArray.map(el => el.food.calories)
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
      this.chartData = filteredArray.map(el => el.food.calories)
      this.chartCategories = filteredArray.map(el => el.date)
    },
  },
  computed: {
    getChartData() {
      return this.foodStore.sortedByDataEatenFoods.map(
        el => el.food.calories
      )
    },
    getChartCategories() {
      return this.foodStore.sortedByDataEatenFoods.map(el => el.date)
    },
  },
  created() {
    this.chartData = this.getChartData
    // console.log(typeof this.chartData[0])
    this.chartCategories = this.getChartCategories
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
