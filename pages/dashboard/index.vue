<template>
  <div class="container flex-column d-flex justify-content-center align-items-center">
    <h1 class='font-weight-bold'>Welcome to Dashboard</h1>
    <button @click="logout" class="btn btn-lg mt-2 btn-primary font-weight-bold">Log Out</button>
  </div>
</template>

<script>
export default {
    middleware: ['check-auth','auth'],
    methods: {
      logout(){
        this.$store.dispatch('logout')
        this.$router.push('/auth')
      }
    }
}
</script>

<style>
.container{
  height: 100vh;
}
</style>