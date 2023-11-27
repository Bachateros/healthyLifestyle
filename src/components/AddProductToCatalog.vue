<template>
  <v-dialog v-model="dialog" max-width="550px">
    <template #activator="{ props }">
      <v-btn color="indigo" dark class="mb-2" v-bind="props">
        Новый продукт
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Новый продукт</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="editedItem.name"
                label="Название продукта"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="editedItem.calories"
                label="Калории (кк)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.proteins"
                label="Белки (г)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.fats"
                label="Жиры (г)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.carbs"
                label="Углеводы (г)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Отмена
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { useFoodStore } from '@/stores/foodBase.js'
export default {
  name: 'appAddProductToCatalog',
  data: () => ({
    dialog: false,
    foodBase: useFoodStore(),
    editedItem: {
      name: '',
      calories: 0,
      fats: 0,
      carbs: 0,
      proteins: 0,
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  methods: {
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      this.foodBase.addedFoods.push(this.editedItem)
      this.foodBase.updateAddedFoodBase()
      this.close()
    },
  },
}
</script>
