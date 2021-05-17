<template>
  <v-row justify='center' align='center'>
    <v-col>
      <machine-table />
    </v-col>
  </v-row>
</template>

<script>
import MachineTable from '~/components/MachineTable'

export default {
  components: { MachineTable },
  layout: 'admin',
  name: 'reportMachine'
}
</script>

<style scoped>

</style>
