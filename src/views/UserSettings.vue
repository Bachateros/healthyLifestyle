<template>
  User Profile <appHeader></appHeader> user : {{ user.name }}
  <form @submit.prevent="onSubmit" v-if="!user.name">
    <v-text-field label="Name"></v-text-field>
    <v-select label="Sex" :items="sex"></v-select>
    <v-text-field label="Age"></v-text-field>
    <v-text-field label="Height"></v-text-field>
    <v-text-field label="Weight"></v-text-field>
    <v-btn type="submit" block class="mt-2 mb-5" color="blue"
      >Save</v-btn
    >
  </form>
</template>
<script>
import appHeader from '@/components/Header.vue'
import { useUserInformation } from '@/stores/user'
export default {
  name: 'appUserSettings',
  components: {
    appHeader,
  },
  data() {
    return {
      sex: ['Male', 'Female'],
      user: useUserInformation(),
    }
  },
}
</script>

<style lang="scss" scoped></style>
