import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDatePicker } from 'vuetify/lib/labs/components.mjs'
import { ru, en } from 'vuetify/locale'

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
