<template>
  <div class="container-custom">
    <h2>{{ authData.isSignIn ? "Sign In" : "Sign Up" }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="authData.email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="authData.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ authData.isSignIn ? "Sign In" : "Sign Up" }}
      </button>
      <button type="button" @click="authData.isSignIn = !authData.isSignIn" class="btn btn-light">
        Switch to {{ !authData.isSignIn ? "Sign In" : "Sign Up" }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authData: {
        isSignIn: true,
        email: "",
        password: "",
        returnSecureToken: true,
      },
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("authUser", this.authData)
      .then(() => {
        this.$router.push('/dashboard')
      })
    },
  },
};
</script>

<style>
.container-custom {
  max-width: 400px;
  margin: auto;
  height: 100vh;
  padding-top: 10rem;
}

h2 {
  text-align: center;
  font-weight: bold;
  margin: 2rem 0;
}
</style>