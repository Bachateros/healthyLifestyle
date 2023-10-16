<template>
  Statistics <appHeader />
  <!-- <appCalendar /> -->
  <!-- <v-date-picker
    class="calendar"
    color="purple"
    border
    cancel-text="Отмена"
    header="Выберите дату"
    ok-text="Все ок"
    title="Calendarik"
    locale="ru"
    v-model="date"
    @click="selectDate"
    :max="new Date()"
  ></v-date-picker> -->
  <!-- <Bar id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
  <div class="position:realtive">
    <v-btn
      variant="flat"
      class="text-decoration-underline px-2"
      background-color="grey"
      @click="isStartCalendarShowed = true"
      >Начало</v-btn
    >
    <div class="calendar" v-if="isStartCalendarShowed">
      <appCalendar @selecttedDate="selectStartDate" />
    </div>

    <v-btn
      variant="flat"
      class="text-decoration-underline px-2"
      background-color="grey"
      @click="isEndCalendarShowed = true"
      >Конец</v-btn
    >
    <div class="calendar" v-if="isEndCalendarShowed">
      <appCalendar @selecttedDate="selectEndDate" :min="startDate" />
    </div>
  </div>
  {{ startDate }}
  {{ endDate }}
  {{ user.userData }}
  <apexchart
    type="line"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
  <!-- <Line :options="chartOptions" :data="chartData" /> -->
</template>
<script>
// import { Bar, Line } from 'vue-chartjs'
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
// } from 'chart.js'

// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement
// )
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'

import appHeader from '@/components/Header.vue'
import appCalendar from '@/components/Calendar.vue'

import { useFoodStore } from '@/stores/foodBase'
import { useUserInformation } from '@/stores/user'

export default {
  name: 'appStatistics',
  components: {
    appHeader,
    appCalendar,
  },
  data() {
    return {
      foodStore: useFoodStore(),
      user: useUserInformation(),
      startDate: null,
      endDate: null,
      isStartCalendarShowed: false,
      isEndCalendarShowed: false,
      series: [
        {
          name: 'calories',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            top: 10,
            left: -10,
            // color: '#fff',
            opacity: 0.3,
          },
          // foreColor: 'inherit', //color of title
          // background: 'indigo',
          zoom: {
            enabled: false,
          },
        },
        noData: {
          text: 'Вы ничего не съели за этот период',
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'lorem dsfdsfdf',
          align: 'center',
        },
        grid: {
          row: {
            colors: ['#f2f2f2', 'transparent'],
            opacity: 0.5,
          },
          column: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
          min: 1,
          max: 7,
          range: 6,
        },
      },
    }
  },
  methods: {
    selectStartDate(data) {
      this.startDate = format(data.date, 'dd.MM.yyyy', { locale: ru })
      this.isStartCalendarShowed = false
    },
    selectEndDate(data) {
      this.endDate = format(data.date, 'dd.MM.yyyy', { locale: ru })
      this.isEndCalendarShowed = false
    },
  },
  computed: {
    getMassive() {
      return [1, 2, 3]
    },
  },
  created() {
    console.log(this.foodStore.eatenFoods.map(el => el.mass))

    this.series[0].data = this.foodStore.sortedByDataEatenFoods.map(
      el => el.food.calories
    )
    this.chartOptions.xaxis.categories =
      this.foodStore.sortedByDataEatenFoods.map(el => el.date)
    console.log(this.series)
    console.log('----------------')
    console.log(this.foodStore.sortedByDataEatenFoods)
  },
}
</script>

<style lang="scss" scoped>
.calendar {
  position: absolute;
}
</style>
