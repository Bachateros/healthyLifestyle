<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-text-field
        placeholder="Choose "
        prepend-icon="mdi mdi-calendar"
        v-bind="props"
        :value="dateCute"
        required
        hint="example of persistent helper text"
        variant="underlined"
        persistent-hint
      />
    </template>
    <v-date-picker locale="ru" v-model="date"></v-date-picker>
  </v-menu>
</template>
<script>
import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'
export default {
  name: 'appCalendar',
  data() {
    return {
      date: null,
    }
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
}
</script>

<style lang="scss" scoped></style>
