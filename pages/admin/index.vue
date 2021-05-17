<template>
  <v-row justify='center' align='center'>
    <v-col>
      <div>WELCOME ADMIN</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'auth',
  name: 'index'
}
</script>

<style scoped>

</style>
