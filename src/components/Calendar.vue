<template>
  <!-- <v-date-picker
    color="purple"
    border
  ></v-date-picker> -->
  <v-text-field
    prepend-icon="mdi mdi-calendar"
    v-if="!isCalendar && typeInput === 'input'"
    @click="isCalendar = true"
    :value="dateCute"
    required
    hint="Когда вы покушали"
    variant="underlined"
    persistent-hint
  />
  <div v-else>
    <v-date-picker
      class="calendar"
      locale="ru"
      title
      v-model="date"
      @click="selectDate"
      cancel-text="Отмена"
      ok-text="Выбрать"
      :max="new Date()"
      :min="min"
    ></v-date-picker>
  </div>
</template>
<script>
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'
export default {
  name: 'appCalendar',
  props: {
    typeInput: {
      type: String,
      required: false,
      default: 'calendar',
    },
    min: {
      type: Date,
      required: false,
      default: new Date(1980, 1, 1),
    },
    choosenDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
  },
  data() {
    return {
      date: this.choosenDate,
      isCalendar: false,
    }
  },
  methods: {
    selectDate(e) {
      if (
        e.target.textContent === 'Отмена' ||
        e.target.textContent === 'Выбрать'
      ) {
        this.isCalendar = false
        this.$emit('selecttedDate', this.$data)
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
  padding: 5px;
  z-index: 100;
}
</style>
