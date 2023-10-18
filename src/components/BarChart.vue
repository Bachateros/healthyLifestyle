<template>
  <apexchart
    ref="barChart"
    type="bar"
    height="350"
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
    },
    names: {
      //подписи столбцов(даты)
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      series: [
        {
          name: 'Actual',
          data: [
            {
              x: '2011',
              y: 1292,
              goals: [
                {
                  name: 'Expected',
                  value: this.expectedCalories,
                  strokeHeight: 3,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: '2012',
              y: 4432,
              goals: [
                {
                  name: 'Expected',
                  value: this.expectedCalories,
                  strokeHeight: 5,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: '2013',
              y: 5423,
              goals: [
                {
                  name: 'Expected',
                  value: 5200,
                  strokeHeight: 5,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: '2014',
              y: 6653,
              goals: [
                {
                  name: 'Expected',
                  value: 6500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: '2015',
              y: 8133,
              goals: [
                {
                  name: 'Expected',
                  value: 6600,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: '2016',
              y: 7132,
              goals: [
                {
                  name: 'Expected',
                  value: 7500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: '2017',
              y: 7332,
              goals: [
                {
                  name: 'Expected',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: '2018',
              y: 6553,
              goals: [
                {
                  name: 'Expected',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
          ],
        },
      ],
      chartOptions: {
        title: {
          text: 'Калории по дням за все время',
          align: 'center',
        },
        chart: {
          height: 350,
          type: 'bar',
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
  computed: {
    // getX(){
    //     return
    // }
  },
  created() {
    console.log(this.names)
    this.series[0].data.forEach(
      (obj, index) => (obj.x = this.names[index] ?? 'lohhh')
    )
    console.log(this.series)
  },
  watch: {
    names() {
      this.series.forEach(item =>
        item.map((x, index) => names[index])
      )
      console.log(this.series)
    },
  },
}
</script>
