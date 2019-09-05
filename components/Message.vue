<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-xs-center name">{{text}}</p>
      <hr />
    </div>
    <div v-else class="wrap">
      <div class="message" :class="{owner}">
        <small>
          <strong>{{name}}</strong>
        </small>
        <p class="infotext">{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      deafult: false
    }
  }
};
</script>

<style scoped>
.system {
  margin-bottom: 1rem;
}
.name {
  margin-bottom: 1rem;
}

.wrap {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 1rem;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #1976d2;
  position: relative;
  margin-bottom: 1rem;
}

.infotext {
  margin-bottom: 0;
}

.owner {
  background: #fff;
  color: #000;
  align-self: flex-end;
}
</style>
