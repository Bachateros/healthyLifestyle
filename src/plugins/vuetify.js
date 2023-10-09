// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDatePicker } from 'vuetify/lib/labs/components.mjs'
// import DayJsAdapter from '@date-io/dayjs'
import { ru, en } from 'vuetify/locale'

// Vuetify
import { createVuetify } from 'vuetify'
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from 'vuetify/labs/VDataTable'

export default createVuetify({
  components: {
    VDatePicker,
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
  locale: {
    locale: 'ru',
    messages: { ru, en },
  },
})
