<template>
  User Profile <appHeader></appHeader> user : {{ localUser.name }}
  <v-sheet
    width="75%"
    max-width="500"
    class="mx-auto"
    v-if="!user.isUser || isChanged"
  >
    <v-form ref="form">
      <v-text-field
        v-model="localUser.name"
        :counter="20"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-select
        v-model="localUser.sex"
        :items="sex"
        :rules="[v => !!v || 'Item is required']"
        label="Sex"
        required
      ></v-select>

      <v-text-field
        v-model="localUser.age"
        :counter="3"
        :rules="ageRules"
        label="Age"
        required
      ></v-text-field>

      <v-text-field
        v-model="localUser.height"
        :counter="6"
        :rules="bodyRulus"
        label="Height"
        required
      ></v-text-field>

      <v-text-field
        v-model="localUser.weight"
        :counter="6"
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
  <v-sheet v-else width="90%" class="mx-auto">
    <v-card color="#ffeeff">
      <div class="d-flex">
        <v-avatar
          class="ma-3"
          size="200"
          rounded="0"
          :image="getAvatar"
        >
        </v-avatar>
        <div
          class="d-flex flex-column ml-5 justify-space-evenly me-auto"
        >
          <div class="d-flex justify-space-between">
            <div>Name: {{ user.userData.name }}</div>
            <div class="ml-7">Sex: {{ user.userData.sex }}</div>
          </div>
          <p>Age: {{ user.userData.age }}</p>
          <p>Height: {{ user.userData.height }}</p>
          <p>Weight: {{ user.userData.weight }}</p>
        </div>
      </div>
    </v-card>
    <v-row justify="space-evenly" aligh="center" class="mt-5">
      <v-btn color="success" @click="updateData">Update data</v-btn>

      <v-dialog v-model="dialog" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="error" v-bind="props">Delete Data</v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5"
            >Do you really want to delete your data?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Not, really not</v-btn
            >
            <v-btn
              color="red-darken-1"
              variant="text"
              @click="deleteUser"
            >
              Yes:(</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
    dialog: false,
    user: useUserInformation(),
    localUser: {
      name: '',
      sex: '',
      age: 18,
      height: 0,
      weight: 0,
    },
    isChanged: false,
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
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.isChanged = false
        this.user.updateUserData(this.localUser)
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    updateData() {
      this.isChanged = true
    },
    deleteUser() {
      this.dialog = false
      this.user.deleteUserData()
      this.isChanged = true
      this.$router.push({ name: 'mainPage' })
    },
  },
  computed: {
    getAvatar() {
      return this.user.userData.sex == 'Male'
        ? 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=Heather&eyeType=Happy&eyebrowType=UpDown&mouthType=Default&skinColor=Light'
        : 'https://avataaars.io/'
    },
  },
}
</script>

<style lang="scss" scoped></style>
