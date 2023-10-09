<template>
  <v-data-table-virtual
    :headers="headers"
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
  <!-- <v-data-table-virtual
    :headers="headers"
    :items="foods"
    :group-by="groupBy"
    class="elevation-1"
    item-value="name"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.food.calories }}</td>
      <td class="text-xs-right">{{ props.item.food.fat }}</td>
      <td class="text-xs-right">{{ props.item.food.carbs }}</td>
      <td class="text-xs-right">{{ props.item.food.protein }}</td>
      <td class="text-xs-right">{{ props.item.mass }}</td>
    </template>
  </v-data-table-virtual> -->

  <!-- <v-table density="compact" hover>
    <thead>
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
    </tbody>
    <tfoot>
      <tr>
        <th>Total:</th>
        <th class="text-center">{{ getTotalSmth('calories') }}</th>
        <th class="text-center">{{ getTotalSmth('proteins') }}</th>
        <th class="text-center">{{ getTotalSmth('fats') }}</th>
        <th class="text-center">{{ getTotalSmth('carbs') }}</th>
      </tr>
    </tfoot>
  </v-table> -->
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
      // headers: [
      //   {
      //     title: 'Food (100g serving)',
      //     align: 'start',
      //     sortable: false,
      //     key: 'food.name',
      //   },
      //   { title: 'Calories, kk', align: 'end', key: 'food.calories' },
      //   { title: 'Fat (g)', align: 'end', key: 'food.fats' },
      //   { title: 'Carbs (g)', align: 'end', key: 'food.carbs' },
      //   { title: 'Protein (g)', align: 'end', key: 'food.proteins' },
      //   { title: 'Mass (g)', align: 'end', key: 'mass' },
      // ],
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
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
          gluten: false,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
          gluten: false,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
          gluten: true,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
          gluten: true,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
          gluten: true,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
          gluten: false,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
          gluten: false,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
          gluten: true,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
          gluten: true,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
          gluten: true,
        },
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
