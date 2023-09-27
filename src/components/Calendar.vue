<template>
  <!-- <v-menu>
    <template v-slot:activator="{ props }">
      {{ log({ props }) }}
      <v-text-field
        prepend-icon="mdi mdi-calendar"
        v-bind="props"
        :value="dateCute"
        required
        hint="example of persistent helper text"
        variant="underlined"
        persistent-hint
      />
    </template>
    <v-date-picker
      locale="ru"
      v-model="date"
      @click.prevent="func"
    ></v-date-picker>
  </v-menu> -->
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
    mode="time"
    locale="ru"
    v-model="date"
    @input="isCalendar = false"
    v-if="isCalendar"
  ></v-date-picker>
</template>
<script>
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'
export default {
  name: 'appCalendar',
  data() {
    return {
      date: null,
      isCalendar: false,
    }
  },
  methods: {
    log(val) {
      console.log('props', val)
    },
    func() {
      console.log('sdfsad')
    },
  },
  computed: {
    dateCute() {
      if (!this.date) {
        const now = new Date()
        return format(now, 'dd.MM.yyyy', { locale: ru })
      } else
        return this.date
          ? format(this.date, 'dd.MM.yyyy', { locale: ru })
          : ''
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
  position: absolute;
  z-index: 100;
  box-shadow: -3px -3px 5px 5px solid;
  top: 10px;
  width: 100px;
}
</style>
