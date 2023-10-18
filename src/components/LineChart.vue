<template>
  <apexchart
    ref="lineChart"
    type="line"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'

import { useFoodStore } from '@/stores/foodBase'
export default {
  name: 'appLineChart',
  props: {
    data: {
      type: Array,
      requred: true,
    },
    categories: {
      type: Array,
      requred: true,
    },
  },
  data() {
    return {
      foodStore: useFoodStore(),
      series: [
        {
          name: 'calories',
          data: this.data,
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
          text: 'Калории за все время',
          // format(new Date(), 'LLLL', {
          //   locale: ru,
          // }).toUpperCase(),
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
          categories: this.categories,
          // min: 1,
          // max: 7,
          // range: 6,
        },
      },
    }
  },
  watch: {
    data() {
      this.series[0].data = this.data
      console.log('change props data')
    },
    categories() {
      console.log('change props categories')

      this.$refs.lineChart.updateOptions({
        xaxis: {
          categories: this.categories,
        },
      })
    },
  },
  // created() {
  //   this.updateChartSeries(
  //     this.foodStore.sortedByDataEatenFoods.map(
  //       el => el.food.calories
  //     )
  //   )
  //   this.updateChartOptionsXaxisCategories(
  //     this.foodStore.sortedByDataEatenFoods.map(el => el.date)
  //   )
  //   console.log(this.series)
  //   console.log('----------------')
  //   console.log(this.foodStore.sortedByDataEatenFoods)
  // },
}
</script>
