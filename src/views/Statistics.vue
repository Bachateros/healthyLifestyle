<template>
  Statistics <appHeader />
  <div class="text-center px-3 py-1">
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
    <div>
      <v-btn
        variant="flat"
        class="text-decoration-underline px-2"
        :class="isStartCalendarShowed ? 'active' : ''"
        background-color="grey"
        @click="
          isEndCalendarShowed ? '' : (isStartCalendarShowed = true)
        "
        >Начало</v-btn
      >
      <div class="calendar" v-if="isStartCalendarShowed">
        <appCalendar @selecttedDate="selectStartDate" />
      </div>

      <v-btn
        variant="flat"
        class="text-decoration-underline px-2"
        :class="isEndCalendarShowed ? 'active' : ''"
        background-color="grey"
        @click="
          isStartCalendarShowed ? '' : (isEndCalendarShowed = true)
        "
        >Конец</v-btn
      >
      <div class="calendar" v-if="isEndCalendarShowed">
        <appCalendar
          @selecttedDate="selectEndDate"
          :min="startDate"
        />
      </div>
    </div>
    {{ getNiceDate(startDate) }}
    {{ getNiceDate(endDate) }}
    {{ user.userData }}
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
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
          text: format(new Date(12, 10, 12), 'LLLL', {
            locale: ru,
          }).toUpperCase(),
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
          // min: 1,
          // max: 7,
          // range: 6,
        },
      },
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
    },
    getNiceDate(date) {
      if (date) return format(date, 'dd.MM.yyyy', { locale: ru })
    },
    updateChartSeries(newData) {
      this.series[0].data = newData
    },
    updateChartOptionsXaxisCategories(newOptions) {
      this.chartOptions.xaxis.categories = newOptions
    },
    startStatistic() {
      // const newOptions = {
      //   categories: [],
      //   min: 1,
      //   max: 7,
      //   range: 6,
      // }
      console.log(this.startDate.getDate())

      const filteredArray =
        this.foodStore.sortedByDataEatenFoods.filter(
          el =>
            el.date >=
            format(this.startDate, 'dd.MM.yyyy', { locale: ru })
        )
      console.log(filteredArray)

      this.updateChartSeries(
        filteredArray.map(el => el.food.calories)
      )
      this.updateChartOptionsXaxisCategories(
        ['test1', 'test2', 'test3']
        // filteredArray.map(el => el.date)
      )
      // newOptions.min = 1
      // this.updateChartOptionsXaxis(newOptions)
    },
  },
  computed: {
    getMassive() {
      return [1, 2, 3]
    },
    // getMonth(){
    //   return
    // }
  },
  created() {
    this.updateChartSeries(
      this.foodStore.sortedByDataEatenFoods.map(
        el => el.food.calories
      )
    )
    this.updateChartOptionsXaxisCategories(
      this.foodStore.sortedByDataEatenFoods.map(el => el.date)
    )
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
.active {
  background: #b0b0b0;
}
</style>
