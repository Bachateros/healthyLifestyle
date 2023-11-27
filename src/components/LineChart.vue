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
    title: {
      type: String,
      required: false,
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
            opacity: 0.3,
          },
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
          text: `Калории по приемам пищи за ${this.title}`,
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
          text: `Калории по приемам пищи за ${this.title}`,
        },
        xaxis: {
          categories: this.categories,
        },
      })
    },
    title() {
      this.$refs.lineChart.updateOptions({
        title: {
          text: `Калории по дням за ${this.title}`,
        },
      })
    },
  },
}
</script>
