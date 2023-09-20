<template>
  User Profile <appHeader></appHeader> user : {{ user.userData.name }}
  <v-sheet width="75%" max-width="500" class="mx-auto">
    <v-form ref="form" v-if="!user.userData.name">
      <v-text-field
        v-model="user.userData.name"
        :counter="20"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-select
        v-model="user.userData.sex"
        :items="sex"
        :rules="[v => !!v || 'Item is required']"
        label="Sex"
        required
      ></v-select>

      <v-text-field
        v-model="user.userData.age"
        :counter="3"
        :rules="ageRules"
        label="Age"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.userData.height"
        :counter="3"
        :rules="bodyRulus"
        label="Height"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.userData.weight"
        :counter="3"
        :rules="bodyRulus"
        label="Weight"
        required
      ></v-text-field>

      <div class="d-flex flex-column">
        <v-btn color="success" class="mt-4" block @click="validate">
          Validate
        </v-btn>

        <v-btn color="error" class="mt-4" block @click="reset">
          Reset Form
        </v-btn>

        <v-btn
          color="warning"
          class="mt-4"
          block
          @click="resetValidation"
        >
          Reset Validation
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
<script>
import appHeader from '@/components/Header.vue'
import { useUserInformation } from '@/stores/user'
export default {
  name: 'appUserSettings',
  components: {
    appHeader,
  },
  data: () => ({
    sex: ['Male', 'Female'],
    user: useUserInformation(),
    nameRules: [
      v => !!v || 'Name is required',
      v =>
        (v && v.length <= 20) ||
        'Name must be less than 20 characters',
      v =>
        (v && v.length >= 2) || 'Name must be more than 1 character',
    ],
    ageRules: [
      v => !!v || 'Age is requred',
      v => (v && v > 7) || 'Age must be more than 7',
    ],
    bodyRulus: [
      v => !!v || 'It is requred',
      v => (v && v > 30 && v < 250) || "It's a magic digits",
    ],
  }),
  methods: {
    async validate() {
      console.log(JSON.parse(window.localStorage.getItem('user')))

      console.log(this.user)

      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.user.updateUserData(this.user)
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style lang="scss" scoped></style>
