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
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in foods" :key="item.food.name">
        <td>{{ item.food.name }}</td>
        <td>{{ item.food.calories }}</td>
      </tr>
    </tbody>
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
}
</script>

<style lang="scss" scoped></style>
