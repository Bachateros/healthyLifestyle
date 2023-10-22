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
          name: 'Съдено на ... кк',
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

      //   series: [
      //     {
      //       name: 'Actual',
      //       data: [
      //         {
      //           x: '2011',
      //           y: 12,
      //           goals: [
      //             {
      //               name: 'Expected',
      //               value: 14,
      //               strokeWidth: 2,
      //               strokeDashArray: 2,
      //               strokeColor: '#775DD0',
      //             },
      //           ],
      //         },
      //         {
      //           x: '2012',
      //           y: 44,
      //           goals: [
      //             {
      //               name: 'Expected',
      //               value: 54,
      //               strokeWidth: 5,
      //               strokeHeight: 10,
      //               strokeColor: '#775DD0',
      //             },
      //           ],
      //         },
      //         {
      //           x: '2013',
      //           y: 54,
      //           goals: [
      //             {
      //               name: 'Expected',
      //               value: 52,
      //               strokeWidth: 10,
      //               strokeHeight: 0,
      //               strokeLineCap: 'round',
      //               strokeColor: '#775DD0',
      //             },
      //           ],
      //         },
      //         {
      //           x: '2014',
      //           y: 66,
      //           goals: [
      //             {
      //               name: 'Expected',
      //               value: 61,
      //               strokeWidth: 10,
      //               strokeHeight: 0,
      //               strokeLineCap: 'round',
      //               strokeColor: '#775DD0',
      //             },
      //           ],
      //         },
      //         {
      //           x: '2015',
      //           y: 81,
      //           goals: [
      //             {
      //               name: 'Expected',
      //               value: 66,
      //               strokeWidth: 10,
      //               strokeHeight: 0,
      //               strokeLineCap: 'round',
      //               strokeColor: '#775DD0',
      //             },
      //           ],
      //         },
      //         {
      //           x: '2016',
      //           y: 67,
      //           goals: [
      //             {
      //               name: 'Expected',
      //               value: 70,
      //               strokeWidth: 5,
      //               strokeHeight: 10,
      //               strokeColor: '#775DD0',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      //   chartOptions: {
      //     chart: {
      //       height: 350,
      //       type: 'bar',
      //     },
      //     plotOptions: {
      //       bar: {
      //         horizontal: true,
      //       },
      //     },
      //     colors: ['#00E396'],
      //     dataLabels: {
      //       formatter: function (val, opt) {
      //         const goals =
      //           opt.w.config.series[opt.seriesIndex].data[
      //             opt.dataPointIndex
      //           ].goals

      //         if (goals && goals.length) {
      //           return `${val} / ${goals[0].value}`
      //         }
      //         return val
      //       },
      //     },
      //     legend: {
      //       show: true,
      //       showForSingleSeries: true,
      //       customLegendItems: ['Actual', 'Expected'],
      //       markers: {
      //         fillColors: ['#00E396', '#775DD0'],
      //       },
      //     },
      //   },
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
