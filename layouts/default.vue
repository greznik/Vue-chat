<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped mobile-break-point="700">
      <v-list dense>
        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title>{{u.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'">mdi-message-text</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2" @click.prevent="exit">
          <v-btn block>Выход</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="cyan" clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Чат комнаты №{{user.room}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: null
  }),
  computed: mapState(["user", "users"]),
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      this.$socket.emit("userLeft", this.user.id, () => {
        this.$router.push("/?message=leave");
        this.clearData();
      });
    }
  }
};
</script>
