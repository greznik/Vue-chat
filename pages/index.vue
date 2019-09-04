<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn @click="message">New message</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect() {
      console.log("Connected client");
    }
  },
  methods: {
    message() {
      this.$socket.emit('createMessage', {
        text: 'Client message recived AXAXA'
      })
    }
  }
};
</script>
