<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="500">
        <v-card-title>Elegram</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Введите имя"
              required
            ></v-text-field>

            <v-text-field v-model="room" :rules="roomRules" label="Введите номер комнаты" required></v-text-field>

            <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submitHandler">Вход</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  layout: "empty",
  head: {
    title: "Elegram-чат"
  },
  sockets: {
    connect() {
      console.log("Connected client");
    }
  },

  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Введите имя",
      v => (v && v.length <= 10) || "NИмя не должно превышать 10 символов"
    ],
    room: "",
    roomRules: [v => !!v || "Введите номер комнаты"]
  }),
  methods: {
    ...mapMutations(["setUser"]),
    submitHandler() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.$socket.emit("joinUser", user, data => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push("/chat");
          }
        });
      }
    }
  }
};
</script>
