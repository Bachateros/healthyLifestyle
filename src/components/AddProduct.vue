<template>
  <v-dialog v-model="dialog" persistent width="80%">
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="type === 'plus'"
        color="indigo"
        v-bind="props"
        prepend-icon="mdi-plus-circle"
        class="rounded-pill bigger"
        variant="text"
      />
      <v-btn
        v-else
        color="indigo"
        v-bind="props"
        prepend-icon="mdi-plus-circle"
        class="rounded-pill bigger"
      >
        Добавить продукт
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-center mb-n3">
        <span class="text-h5 font-weight-medium">
          Что хотите добавить?
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="d-flex flex-column">
            <v-row class="align-center justify-space-between">
              <v-col cols="4"><h3>Дата:</h3> </v-col>
              <v-col cols="8">
                <appCalendar
                  @selecttedDate="selectDate"
                  :choosenDate="choosenDate"
                  typeInput="input"
                />
              </v-col>
            </v-row>
            <v-form ref="form">
              <v-row class="align-center justify-space-between my-2">
                <v-col cols="4"><h3>Тип приема пищи:</h3> </v-col>
                <v-col cols="8">
                  <v-select
                    :rules="requiredRule"
                    :value="typeOfMeal"
                    v-model="addingFood.type"
                    variant="underlined"
                    :items="['Завтрак', 'Обед', 'Перекус', 'Ужин']"
                    label="Тип*"
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
                  />
                  <p v-if="!isValid" class="error">
                    Вы не выбрали продукт!
                  </p>
                </v-col>
              </v-row>
              <v-row
                v-if="isSelectMass"
                class="align-center justify-space-between"
              >
                <v-col cols="4"><h3>Масса, г:</h3> </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Грамм*"
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
          Закрыть
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="validate">
          Сохранить
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
  props: {
    type: {
      type: String,
      required: false,
      default: 'plus', //or string
    },
    typeOfMeal: {
      type: String,
      required: false,
      default: '',
    },
    choosenDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
  },
  data: () => ({
    foodStore: useFoodStore(),
    dialog: false,
    isCalendar: false,
    isSelectMass: false,
    isSelectType: false,
    addingFood: {
      type: '', //breakfast/lunch/dinner/fastfood
      date: null, //15.09.2023
      food: {}, //алыча
      mass: 0, //150 gramm
    },
    requiredRule: [value => !!value || 'Обязательное поле'],
    massRule: [
      value => !!value || 'Обязательное поле',
      value => !isNaN(value) || 'Должно быть число',
      value => value > 0 || 'Должно быть больше нуля',
    ],
  }),
  computed: {
    isValid() {
      return this.addingFood.food.name != 'Нет совпадений'
    },
  },
  methods: {
    openCalendar() {
      this.isCalendar = true
    },
    closeCalendar() {
      this.isCalendar = false
    },
    selectDate(data) {
      this.addingFood.date = format(data.date, 'dd.MM.yyyy', {
        locale: ru,
      })
    },
    selectFood(food) {
      this.isSelectMass = true
      this.addingFood.food = food
    },
    addMass(e) {
      this.addingFood.mass = +e.target.value
    },
    getNumber(string) {
      if (isNaN(string)) {
        const spaceChar = string.indexOf(' ')
        return +string
          .slice(0, spaceChar) //вычленить цифры
          .replace(',', '.')
          .slice(0)
      } else return +string
    },
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid && this.isValid) {
        for (const key in this.addingFood.food) {
          if (key != 'name') {
            this.addingFood.food[key] = this.getNumber(
              this.addingFood.food[key]
            )
          }
        }
        this.foodStore.eatenFoods.push(this.addingFood)
        this.foodStore.updateEatenBase()
        this.dialog = false
      }
    },
  },
  mounted() {
    this.addingFood.date = format(
      this.$props.choosenDate,
      'dd.MM.yyyy',
      {
        locale: ru,
      }
    )
    this.addingFood.type = this.$props.typeOfMeal
    this.isSelectType = !!this.addingFood.type
  },
}
</script>
<style scoped lang="scss">
.bigger {
  font-size: 1.3em;
  height: 50px;
}
.error {
  font-size: 1.4em;
  color: rgb(163, 24, 24);
  text-align: center;
  text-shadow: 1px 1px red;
}
</style>
