<template>
  <v-data-table-virtual
    :headers="headers"
    :items="modifiedFoods"
    :group-by="groupBy"
    class="elevation-1"
    hover
  >
    <template
      v-slot:group-header="{
        item,
        columns,
        toggleGroup,
        isGroupOpen,
      }"
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
          <appAddProduct :typeOfMeal="item.value" />
        </td>
      </tr>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-dialog
        v-model="dialogDelete"
        max-width="500px"
        height="300px"
      >
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >OK</v-btn
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

  <v-table density="compact" hover>
    <tfoot>
      <tr class="footer">
        <th class="footer__total">Total:</th>
        <th class="text-center footer__calories">
          {{ getTotalSmth('calories') }}
        </th>
        <th class="text-center footer__proteins">
          {{ getTotalSmth('proteins') }}
        </th>
        <th class="text-center footer__fats">
          {{ getTotalSmth('fats') }}
        </th>
        <th class="text-center footer__carbons">
          {{ getTotalSmth('carbs') }}
        </th>
        <th class="footer__space"></th>
      </tr>
    </tfoot>
  </v-table>
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
  },
  data() {
    return {
      foodStore: useFoodStore(),
      modifiedFoods: this.modifyFoods(),
      dialogDelete: false,
      choosenItemIndex: -1,
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          width: '295px',
          sortable: false,
          key: 'food.name',
        },
        {
          title: 'Calories (kk)',
          key: 'food.calories',
          align: 'center',
          width: '200px',
        },
        {
          title: 'Protein (g)',
          key: 'food.proteins',
          align: 'center',
          width: '200px',
        },
        {
          title: 'Fat (g)',
          key: 'food.fats',
          align: 'center',
          width: '200px',
        },
        {
          title: 'Carbs (g)',
          key: 'food.carbs',
          align: 'center',
          width: '200px',
        },
        { title: 'Mass (g)', key: 'mass', align: 'center' },
        {
          title: 'Actions',
          key: 'actions',
          sortable: false,
          align: 'center',
        },
      ],
      groupBy: [
        {
          key: 'type',
          width: '200px',
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
  mounted() {},
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
