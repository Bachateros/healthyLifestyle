<template>
  <div width="50%" class="text-center">
    <apexchart
      ref="donutChart"
      type="donut"
      height="500"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  name: 'appDonutChart',
  props: {
    data: {
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
      series: [],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        labels: ['Белки', 'Жиры', 'Углеводы'],
        title: {
          text: `БЖУ за ${this.title}`,
          style: {
            fontSize: '20px',
          },
          align: 'center',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        plotOptions: {
          pie: {
            size: 300,
            donut: {
              labels: {
                show: true,
                value: {
                  show: true,
                  formatter: val => `${val} g`,
                },
              },
            },
          },
        },
      },
    }
  },
  created() {
    this.series = this.data
  },
  watch: {
    data() {
      this.series = this.data
      this.$refs.donutChart.updateOptions({
        title: {
          text: `БЖУ за ${this.title}`,
        },
      })
    },
    title() {
      this.$refs.donutChart.updateOptions({
        title: {
          text: `Калории по дням за ${this.title}`,
        },
      })
    },
  },
}
</script>
