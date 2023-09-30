<!-- <template>
  <v-sheet class="position-relative" min-height="200">
    <div
      class="position-absolute d-flex align-center justify-center w-100 h-100"
    >
      <v-btn prepend-icon="mdi-plus-circle" class="rounded-pill"
        >Add product</v-btn
      >
    </div>
    <v-fade-transition hide-on-leave>
        <v-card
        v-if="dialog"
        apend-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="500"
        title=""></v-card>
    </v-fade-transition>
  </v-sheet>
</template> -->
<template>
  <v-dialog v-model="dialog" persistent width="80%">
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="type === 'plus'"
        color="indigo"
        v-bind="props"
        prepend-icon="mdi-plus-circle"
        class="rounded-pill"
        variant="text"
      />
      <v-btn
        v-else
        color="indigo"
        v-bind="props"
        prepend-icon="mdi-plus-circle"
        class="rounded-pill"
      >
        Add product
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Что хотите добавить?</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="d-flex flex-column">
            <v-row class="align-center justify-space-between">
              <v-col cols="4"><h3>Date:</h3> </v-col>
              <v-col cols="8">
                <appCalendar @selecttedDate="selectDate" />
              </v-col>
            </v-row>
            <v-row class="align-center justify-space-between">
              <v-col cols="4"><h3>Type of meal:</h3> </v-col>
              <v-col cols="8">
                <v-select
                  :rules="typeMealRule"
                  variant="underlined"
                  :items="['Breakfast', 'Lunch', 'Snack', 'Dinner']"
                  label="Type*"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="justify-center"><h3>Что съели?</h3></v-row>
            <v-row class="justify-center">
              <v-col cols="12">
                <appSearchFood @selecttedFood="selectFood" />
              </v-col>
            </v-row>
            <v-row
              v-if="isSelectMass"
              class="align-center justify-space-between"
            >
              <v-col cols="4"><h3>Mass, g:</h3> </v-col>
              <v-col cols="8">
                <v-text-field
                  label="gramm*"
                  :rules="massRule"
                  required
                  variant="underlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import appCalendar from '@/components/Calendar.vue'
import appSearchFood from '@/components/SearchFood.vue'

export default {
  name: 'appAddProduct',
  components: {
    appCalendar,
    appSearchFood,
  },
  data: () => ({
    dialog: false,
    isCalendar: false,
    due: null,
    isSelectMass: false,
    selecttedFood: {
      type: '', //breakfast/lunch/dinner/fastfood
      date: '', //15.09.2023
      food: {}, //алыча
      mass: 0, //150 gramm
    },
    typeMealRule: [value => !!value || 'Required'],
    massRule: [
      value => !!value || 'Requred',
      value => !isNaN(value) || 'Must be number',
    ],
  }),
  props: {
    type: {
      type: String,
      required: false,
      default: 'plus', //or string
    },
  },
  methods: {
    openCalendar() {
      this.isCalendar = true
    },
    closeCalendar() {
      this.isCalendar = false
    },
    selectDate(date) {
      console.log(date)
    },
    selectFood(food) {
      this.isSelectMass = true
      this.selecttedFood.food = food
      console.log(this.selecttedFood)
    },
  },
}
</script>
