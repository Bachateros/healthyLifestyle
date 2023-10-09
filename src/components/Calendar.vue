<template>
  <v-text-field
    prepend-icon="mdi mdi-calendar"
    v-if="!isCalendar"
    @click="isCalendar = true"
    :value="dateCute"
    required
    hint="example of persistent helper text"
    variant="underlined"
    persistent-hint
  />
  <v-date-picker
    class="calendar"
    locale="ru"
    v-model="date"
    @click="selectDate"
    v-else
  ></v-date-picker>
</template>
<script>
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'
export default {
  name: 'appCalendar',
  data() {
    return {
      date: new Date(),
      isCalendar: false,
    }
  },
  methods: {
    selectDate(e) {
      if (e.target.textContent === 'Cancel') {
        this.isCalendar = false
      } else if (e.target.textContent === 'OK') {
        this.isCalendar = false
        this.$emit('selecttedDate', this.date)
      }
    },
  },
  computed: {
    dateCute() {
      return format(this.date, 'dd.MM.yyyy', { locale: ru })
    },
  },
  watch: {
    date() {
      this.isCalendar = false
    },
  },
}
</script>

<style lang="scss" scoped>
.calendar {
  position: relative;
  padding: 10px;
  z-index: 100;
  box-shadow: -3px -3px 5px 5px solid;
  top: 10px;
  width: 100px;
}
</style>
