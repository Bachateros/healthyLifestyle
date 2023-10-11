<template>
  <v-data-table-virtual
    :headers="headers"
    :footer-props="'vaaa'"
    :items="modifiedFoods"
    :group-by="groupBy"
    item-value="food.name"
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
          <!-- <VBtn
            size="small"
            variant="text"
            :icon="isGroupOpen(item) ? '$expand' : '$next'"
            @click="toggleGroup(item)"
          ></VBtn> -->
          <appAddProduct :typeOfMeal="item.value" />
        </td>
      </tr>
    </template>
  </v-data-table-virtual>

  <v-table density="compact" hover>
    <!-- <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories, kk</th>
        <th class="text-left">Proteins, g</th>
        <th class="text-left">Fats, g</th>
        <th class="text-left">Carbons, g</th>
        <th class="text-left">Mass, g</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in foods" :key="item.food.name">
        <td>{{ item.food.name }}</td>
        <td class="text-center">
          {{ getValue(getNumber(item.food.calories), item.mass) }}
        </td>
        <td class="text-center">
          {{ getValue(getNumber(item.food.proteins), item.mass) }}
        </td>
        <td class="text-center">
          {{ getValue(getNumber(item.food.fats), item.mass) }}
        </td>
        <td class="text-center">
          {{ getValue(getNumber(item.food.carbs), item.mass) }}
        </td>
        <td class="text-center">{{ item.mass }}</td>
      </tr>
    </tbody> -->
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
      modifiedFoods: this.modifyFoods(),
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
              this.getNumber(newItem.food[key]),
              newItem.mass
            )
          }
        }

        return newItem
      })
    },
    getNumber(string) {
      const spaceChar = string.indexOf(' ')
      return string
        .slice(0, spaceChar) //вычленить цифры
        .replace(',', '.')
        .slice(0)
    },
    getValue(smth, mass) {
      return +((smth * mass) / 100).toFixed(2)
    },
    getTotalSmth(smth) {
      return +this.foods
        .reduce((total, item) => {
          return (total += this.getValue(
            this.getNumber(item.food[smth]),
            item.mass
          ))
        }, 0)
        .toFixed(2)
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
