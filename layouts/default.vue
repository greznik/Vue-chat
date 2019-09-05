<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title>{{u.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon :color="u.id === 2 ? 'primary' : 'grey'">chat</v-icon>
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
      <div>
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: null,
    users: [{ id: 1, name: "Юлия" }, { id: 2, name: "Алексий" }]
  }),
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      this.$router.push("/?message=leave");
      this.clearData;
    }
  }
};
</script>
