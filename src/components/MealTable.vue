<!-- <template>
  Meal Table
  <div>{{ foods }}</div>
</template> -->
<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
        <th class="text-left">Proteins</th>
        <th class="text-left">Fats</th>
        <th class="text-left">Carbons</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in foods" :key="item.food.name">
        <td>{{ item.food.name }}</td>
        <td>
          {{ getValue(getNumber(item.food.calories), item.mass) }}
        </td>
        <td>
          {{ getValue(getNumber(item.food.proteins), item.mass) }}
        </td>
        <td>{{ getValue(getNumber(item.food.fats), item.mass) }}</td>
        <td>{{ getValue(getNumber(item.food.carbs), item.mass) }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Total:</th>
        <th>{{ getTotalSmth('calories') }}</th>
        <th>{{ getTotalSmth('proteins') }}</th>
        <th>{{ getTotalSmth('fats') }}</th>
        <th>{{ getTotalSmth('carbs') }}</th>
      </tr>
    </tfoot>
  </v-table>
</template>
<script>
export default {
  name: 'appMealTable',
  props: {
    foods: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
      return this.foods
        .reduce((total, item) => {
          return (total += this.getValue(
            this.getNumber(item.food[smth]),
            item.mass
          ))
        }, 0)
        .toFixed(2)
    },
  },
  mounted() {
    console.log(this.foods)
  },
}
</script>

<style lang="scss" scoped></style>
