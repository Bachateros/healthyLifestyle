<template>
  <v-data-table
    :headers="headers"
    :items="foodBase.addedFoods"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="elevation-1"
    hover
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Добавленные продукты</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              Новый продукт
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-center">
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Продукт"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Калории (кк)"
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.proteins"
                      label="Белки (г)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Отмена
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 text-center"
              >Удаление продукта из каталога</v-card-title
            >
            <v-card-text class="text-center"
              >Вы действительно хотите удалить этот продкт из
              каталога?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="closeDelete"
                >Нет, не не хочу</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >Да</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item)"
        color="green"
      >
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)" color="red">
        mdi-delete
      </v-icon>
    </template>
    <template #no-data>
      Вы еще не добавляли своих продуктов
    </template>
  </v-data-table>
</template>
<script>
import { useFoodStore } from '@/stores/foodBase.js'
export default {
  name: 'appCatalogTable',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    foodBase: useFoodStore(),
    headers: [
      {
        title: 'Продукт (100г)',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      { title: 'Калории (кк)', key: 'calories' },
      { title: 'Белки (г)', key: 'proteins' },
      { title: 'Жиры (г)', key: 'fats' },
      { title: 'Углеводы (г)', key: 'carbs' },
      { title: 'Действия', key: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fast: 0,
      carbs: 0,
      proteins: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fats: 0,
      carbs: 0,
      proteins: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Новый продукт'
        : 'Редактировать продукт'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.foodBase.addedFoods.indexOf(item.raw)
      this.editedItem = Object.assign({}, item.raw)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.foodBase.addedFoods.indexOf(item.raw)
      this.editedItem = Object.assign({}, item.raw)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.foodBase.addedFoods.splice(this.editedIndex, 1)
      this.foodBase.updateAddedFoodBase()
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.foodBase.addedFoods[this.editedIndex],
          this.editedItem
        )
      } else {
        this.foodBase.addedFoods.push(this.editedItem)
      }
      this.foodBase.updateAddedFoodBase()
      this.close()
    },
  },
}
</script>
