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
            <v-form ref="form">
              <v-row class="align-center justify-space-between">
                <v-col cols="4"><h3>Type of meal:</h3> </v-col>
                <v-col cols="8">
                  <v-select
                    :rules="requiredRule"
                    v-model="addingFood.type"
                    variant="underlined"
                    :items="['Breakfast', 'Lunch', 'Snack', 'Dinner']"
                    label="Type*"
                    required
                    @update:modelValue="isSelectType = true"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="justify-center" v-if="isSelectType"
                ><h3>Что съели?</h3></v-row
              >
              <v-row class="justify-center" v-if="isSelectType">
                <v-col cols="12">
                  <appSearchFood
                    @selecttedFood="selectFood"
                    required
                    :rules="requiredRule"
                  />
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
                    placeholder="150"
                    @blur="addMass"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
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
        <v-btn color="blue-darken-1" variant="text" @click="validate">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import appCalendar from '@/components/Calendar.vue'
import appSearchFood from '@/components/SearchFood.vue'
import { useFoodStore } from '@/stores/foodBase.js'

import format from 'date-fns/format'
import { es, ru } from 'date-fns/locale'
export default {
  name: 'appAddProduct',
  components: {
    appCalendar,
    appSearchFood,
  },
  data: () => ({
    foodStore: useFoodStore(),
    dialog: false,
    isCalendar: false,
    isSelectMass: false,
    isSelectType: false,
    addingFood: {
      type: '', //breakfast/lunch/dinner/fastfood
      date: format(new Date(), 'dd.MM.yyyy', {
        locale: ru,
      }), //15.09.2023
      food: {}, //алыча
      mass: 0, //150 gramm
    },
    requiredRule: [value => !!value || 'Required'],

    massRule: [
      value => !!value || 'Requred',
      value => !isNaN(value) || 'Must be number',
      value => value > 0 || 'Must be more than zero',
    ],
  }),
  props: {
    type: {
      type: String,
      required: false,
      default: 'plus', //or string
    },
  },
  computed: {
    isValid() {
      return this.addingFood.type && this.addingFood.mass
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
      this.addingFood.date = format(date, 'dd.MM.yyyy', {
        locale: ru,
      })
    },
    selectFood(food) {
      this.isSelectMass = true
      this.addingFood.food = food
      console.log(this.addingFood)
    },
    addMass(e) {
      this.addingFood.mass = +e.target.value
    },
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid && this.addingFood.mass) {
        this.foodStore.eatenFoods.push(this.addingFood)
        this.foodStore.updateEatenBase()
        this.dialog = false
      }
    },
  },
}
</script>
