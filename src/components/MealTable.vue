<template>
  <v-data-table-virtual
    :headers="headers"
    :footer-props="'vaaa'"
    :items="foods"
    :group-by="groupBy"
    item-value="food.name"
    class="elevation-1"
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
        <td :colspan="columns.length">
          <VBtn
            size="small"
            variant="text"
            :icon="isGroupOpen(item) ? '$expand' : '$next'"
            @click="toggleGroup(item)"
          ></VBtn>
          {{ item.value }}
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
      <tr>
        <th width="28%">Total:</th>
        <th width="12.5%" class="text-center">
          {{ getTotalSmth('calories') }}
        </th>
        <th width="12.5%" class="text-center">
          {{ getTotalSmth('proteins') }}
        </th>
        <th width="12.5%" class="text-center">
          {{ getTotalSmth('fats') }}
        </th>
        <th width="12.5%" class="text-center">
          {{ getTotalSmth('carbs') }}
        </th>
        <th width="20%"></th>
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
  data() {
    return {
      // modifiedFoods: modifyFoods(),
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          key: 'food.name',
        },
        { title: 'Calories', key: 'food.calories' },
        { title: 'Fat (g)', key: 'food.fats' },
        { title: 'Carbs (g)', key: 'food.carbs' },
        { title: 'Protein (g)', key: 'food.proteins' },
        { title: 'Mass (%)', key: 'mass' },
      ],
      groupBy: [
        {
          key: 'type',
          order: 'asc',
        },
      ],
    }
  },
  methods: {
    // modifyFoods(){
    //   return this.foods.map(item => {
    //     return this.
    //   })
    // },
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
  mounted() {
    console.log(this.foods)
  },
}
</script>

<style lang="scss" scoped></style>
