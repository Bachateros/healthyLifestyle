// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDatePicker } from 'vuetify/lib/labs/components.mjs'
// import DayJsAdapter from '@date-io/dayjs'
import { ru, en } from 'vuetify/locale'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  {
    components: {
      VDatePicker,
    },
    locale: {
      locale: 'ru',
      messages: { ru, en },
    },
  }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
