<template>
  <v-data-table-virtual
    :headers="headers"
    :items="modifiedFoods"
    :group-by="groupBy"
    class="elevation-1"
    hover
  >
    <template
      #group-header="{ item, columns, toggleGroup, isGroupOpen }"
    >
      <tr>
        <td :colspan="columns.length - 1">
          <VBtn
            size="small"
            variant="text"
            :icon="isGroupOpen(item) ? '$expand' : '$next'"
            @click="toggleGroup(item)"
          ></VBtn>
          {{ item.value }}
        </td>
        <td :colspan="1" class="text-center">
          <appAddProduct
            :typeOfMeal="item.value"
            :choosenDate="choosenDate"
          />
        </td>
      </tr>
    </template>

    <template #item.actions="{ item }">
      <v-dialog
        v-model="dialogDelete"
        max-width="500px"
        height="400px"
      >
        <v-card>
          <v-card-title class="text-h5 text-center"
            >Удаление продукта</v-card-title
          >
          <v-card-text class="text-h5 text-center"
            >Вы действительно хотите удалить этот
            продукт?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="closeDelete"
              >Нет, я передумал</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >ДА</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-icon @click="deleteItem(item)" color="red">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table-virtual>
</template>
<script>
import appAddProduct from '@/components/addProduct.vue'
import { useFoodStore } from '@/stores/foodBase.js'
export default {
  name: 'appMealTable',
  components: {
    appAddProduct,
  },
  props: {
    foods: {
      type: Array,
      required: true,
    },
    choosenDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
  },
  data() {
    return {
      foodStore: useFoodStore(),
      modifiedFoods: this.modifyFoods(),
      dialogDelete: false,
      choosenItemIndex: -1,
      headers: [
        {
          title: 'Продукт (100 г)',
          align: 'center',
          sortable: false,
          key: 'food.name',
        },
        {
          title: 'Калории (кк)',
          key: 'food.calories',
          align: 'center',
        },
        {
          title: 'Белки (г)',
          key: 'food.proteins',
          align: 'center',
        },
        {
          title: 'Жиры (г)',
          key: 'food.fats',
          align: 'center',
        },
        {
          title: 'Углеводы (г)',
          key: 'food.carbs',
          align: 'center',
        },
        { title: 'Масса (г)', key: 'mass', align: 'center' },
        {
          title: 'Действия',
          key: 'actions',
          sortable: false,
          align: 'center',
        },
      ],
      groupBy: [
        {
          title: 'Группа',
          key: 'type',
          order: 'asc',
        },
      ],
    }
  },
  methods: {
    modifyFoods() {
      return this.foods.map(item => {
        let newItem = JSON.parse(JSON.stringify(item)) //глубокое копирование
        for (const key in newItem.food) {
          if (key != 'name') {
            newItem.food[key] = this.getValue(
              newItem.food[key],
              newItem.mass
            )
          }
        }
        return newItem
      })
    },
    getValue(smth, mass) {
      return +((smth * mass) / 100).toFixed(2)
    },
    getTotalSmth(smth) {
      return this.modifiedFoods
        .reduce((total, item) => {
          return (total += item.food[smth])
        }, 0)
        .toFixed(2)
    },
    deleteItem(item) {
      const choosenItemItem = this.foods.find(food => {
        if (food.food.name === item.value) {
          return food
        }
      })
      this.choosenItemIndex = this.foods.indexOf(choosenItemItem)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.modifiedFoods.splice(this.choosenItemIndex, 1)
      this.foodStore.eatenFoods.splice(
        this.foodStore.eatenFoods.indexOf(
          this.foods[this.choosenItemIndex]
        ),
        1
      )
      this.foodStore.updateEatenBase()
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
    },
  },
  mounted() {
    document.getElementsByClassName(
      'v-data-table-header__content'
    )[0].textContent = 'Группа'
  },
  watch: {
    foods() {
      this.modifiedFoods = this.modifyFoods()
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 8fr repeat(4, 200px) 3fr;
  &__total {
  }
  &__calories {
  }
  &__proteins {
  }
  &__fats {
  }
  &__carbons {
  }
  &__space {
  }
}
</style>
