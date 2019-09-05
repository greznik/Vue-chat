export const state = () => ({
  user: {},
  messages: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearDate(state) {
    state.user = '',
    messages = []
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message)
  }
};

