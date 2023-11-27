<template>
  <apexchart
    ref="barChart"
    type="bar"
    height="500"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  name: 'appBarChart',
  props: {
    expectedCalories: {
      type: Number,
      required: true,
    },
    data: {
      //значения столбцов(общее кк за день)
      //массив готовых значений
      type: Array,
      required: true,
    },
    names: {
      //подписи столбцов(даты)
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
      series: [
        {
          name: 'Съедено кк',
          data: [],
        },
      ],
      chartOptions: {
        title: {
          text: `Калории по дням за ${this.title}`,
          align: 'center',
          style: {
            fontSize: '20px',
          },
        },
        chart: {
          height: 350,
          type: 'bar',
        },
        noData: {
          text: 'Вы ничего не съели за этот период',
        },
        plotOptions: {
          bar: {
            columnWidth: '60%',
          },
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,

          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#00E396', '#775DD0'],
          },
        },
      },
    }
  },
  computed: {},
  methods: {
    getExpectedColor(plan, real) {
      //красный цвет, если превысил норму на 10%
      return (Math.abs(plan - real) / plan) * 100 > 10
        ? 'red'
        : '#775DD0'
    },
    render() {
      this.series[0].data = []
      this.data.forEach((el, index) => {
        this.series[0].data.push({
          x: this.names[index],
          y: el,
          goals: [
            {
              name: 'Ваша норма, кк',
              value: this.expectedCalories,
              strokeHeight: 3,
              strokeColor: this.getExpectedColor(
                this.expectedCalories,
                el
              ),
            },
          ],
        })
      })
    },
  },
  created() {
    this.render()
  },
  watch: {
    data() {
      this.render()
      this.$refs.barChart.updateOptions({
        title: {
          text: `Калории по дням за ${this.title}`,
        },
      })
    },
    title() {
      this.$refs.barChart.updateOptions({
        title: {
          text: `Калории по дням за ${this.title}`,
        },
      })
    },
  },
}
</script>
