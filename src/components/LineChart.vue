<template>
  <apexchart
    ref="lineChart"
    type="line"
    height="500"
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
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    foods: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      foodStore: useFoodStore(),
      series: [
        {
          name: 'Калории, кк',
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
          background: '#f9f9f9',
          zoom: {
            enabled: true,
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
          text: 'Калории по приемам пищи за все время',
          align: 'center',
          style: {
            fontSize: '20px',
          },
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
      this.series[0].name = this.foods.map(el => el.food.name)
      this.$refs.lineChart.updateOptions({
        markers: {
          title: 'log',
        },
      })
    },
    categories() {
      this.$refs.lineChart.updateOptions({
        title: {
          text: 'Калории по приемам пищи за выбранный период',
        },
        xaxis: {
          categories: this.categories,
        },
      })
    },
  },
}
</script>
