<template>
  <div>
    <v-btn
      color='primary'
      dark
      class='mb-10'
      @click='addMachine'
    >
      New Machine
    </v-btn>
    <!--modal of machine-->
    <v-dialog v-model='dialog' persistent>
      <v-card>
        <v-card-title>
          <span class='headline'>{{ activeItem }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref='form' v-model='valid' lazy-validation>
            <v-row>
              <v-col cols='4'>
                <div class='text-capitalize headline mb-5'>
                  <span class='red--text'>*</span>
                  Machine Name
                </div>
                <v-text-field
                  v-model='machine.machine_name'
                  label='Machine Name'
                  outlined
                  :rules='textRules'
                  required
                  maxLength='50'
                  counter
                ></v-text-field>
              </v-col>

              <v-col cols='4'>
                <div class='text-capitalize headline mb-5'>
                  <span class='red--text'>*</span>
                  Address
                </div>
                <v-text-field
                  v-model='machine.address'
                  label='Address'
                  outlined
                  :rules='addressRules'
                  required
                  maxLength='100'
                  counter
                ></v-text-field>
              </v-col>

              <v-col cols='4'>
                <div class='text-capitalize headline mb-5'>
                  <span class='red--text'>*</span>
                  Latitude and Longitude
                </div>
                <v-text-field
                  v-model='machine.location'
                  label='Latitude and Longitude '
                  outlined
                  :rules='textRules'
                  required
                  maxLength='50'
                  counter
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color='blue darken-1'
            text
            @click='createMachine'
            :disabled='!valid'
            v-if="this.modal == 'new'"
          >
            Save
          </v-btn>
          <v-btn
            color='blue darken-1'
            text
            @click='saveMachine'
            :disabled='!valid'
            v-if="this.modal == 'edit'"
          >
            Save Edit
          </v-btn>
          <v-btn color='blue darken-1' text @click='close'>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--modal of machine-->

    <!--modal of product-->
    <v-dialog v-model='dialog1' persistent>
      <v-card>
        <v-card-title>
          <span class='headline'>{{ activeItem }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref='formProduct' v-model='valid1' lazy-validation>
            <v-row>
              <v-col cols='4'>
                <div class='text-capitalize headline mb-5'>
                  <span class='red--text'>*</span>
                  Product Name
                </div>
                <v-text-field
                  v-model='product.product_name'
                  label='Product Name'
                  outlined
                  :rules='textRules'
                  required
                  maxLength='50'
                  counter
                ></v-text-field>
              </v-col>

              <v-col cols='4'>
                <div class='text-capitalize headline mb-5'>
                  <span class='red--text'>*</span>
                  Price
                </div>
                <v-text-field
                  v-model='product.price'
                  label='Price'
                  outlined
                  :rules='numberRule'
                  required
                ></v-text-field>
              </v-col>

              <v-col cols='4'>
                <div class='text-capitalize headline mb-5'>
                  <span class='red--text'>*</span>
                  Quantity
                </div>
                <v-text-field
                  v-model='product.number'
                  label='Quantity'
                  outlined
                  :rules='numberRule'
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color='blue darken-1'
            text
            @click='createProduct'
            :disabled='!valid'
            v-if="this.modal == 'new'"
          >
            Save
          </v-btn>
          <v-btn
            color='blue darken-1'
            text
            @click='updateProduct'
            :disabled='!valid'
            v-if="this.modal == 'edit'"
          >
            Save Edit
          </v-btn>
          <v-btn color='blue darken-1' text @click='closeProduct'>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--modal of product-->

    <template v-for='item in machineList'>
      <div class='d-flex'>
        <v-hover v-slot='{ hover }'>
          <v-img
            class='pointer'
            max-width='100'
            @click='editMachine(item)'
            :lazy-src='require(`~/assets/img/${machineImg}.png`)'
            :src='require(`~/assets/img/${machineImg}.png`)'
          >
            <v-btn
              class='mx-2'
              v-if='hover'
              fab
              dark
              small
              color='primary'
            >
              <v-icon v-if='hover' dark>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-img>
        </v-hover>
        <div class='headline my-auto pointer' @click='showTable(item.machine_name)'>{{ item.machine_name }}</div>
      </div>
      <v-expand-transition>
        <v-data-table
          v-show='expand === item.machine_name'
          dark
          fixed-header
          height='400'
          :headers='headers'
          :items='item.product'
          class='elevation-1 mb-4'
          :search='search'
          :sort-desc="['id']"
          hide-default-footer
        >
          <template v-slot:top>
            <v-btn
              color='secondary'
              dark
              small
              class='ma-2'
              @click='addProduct(item)'
            >
              Add product
            </v-btn>

            <v-text-field
              v-model='search'
              label='Search'
              class='mx-4'
            ></v-text-field>
          </template>

          <template v-slot:item.machine_name>
            {{ item.machine_name }}
          </template>

          <template v-slot:item.address>
            {{ item.address }}
          </template>

          <template v-slot:item.number='{ item }'>
            <v-chip
              :color='getColor(item.number)'
              dark
            >
              {{ item.number }}
            </v-chip>
          </template>

          <template v-slot:item.actions='{ item }'>
            <v-icon small class='mr-2' @click='editProduct(item)'>mdi-pencil</v-icon>
          </template>
        </v-data-table>
      </v-expand-transition>
    </template>
  </div>
</template>

<script>
import MainServices from '~/services/MainServices'

export default {
  name: 'MachineTable',
  data() {
    return {
      search: '',
      expand: null,
      headers: [
        { text: 'Machine Name', value: 'machine_name', align: 'start' },
        { text: 'Machine Address', value: 'address', align: 'start' },
        { text: 'Product Name', value: 'product_name', align: 'start' },
        { text: 'Price', value: 'price', align: 'start' },
        { text: 'Quantity', value: 'number', align: 'start' },
        { text: 'Actions', value: 'actions', align: 'end' }
      ],
      machineList: [],
      machineImg: 'logo',
      machine: {
        address: '',
        location: '',
        machine_name: '',
        product: []
      },
      product: {
        product_name: '',
        price: '',
        number: '',
        machine_id: null
      },
      dialog: false,
      dialog1: false,
      activeItem: null,
      modal: null,
      valid: true,
      valid1: true,
      textRules: [
        v => !!v || 'Required',
        v => (v && v.length <= 50) || 'Max 150 characters'
      ],
      numberRule: [
        v => !!v || 'Required',
        v => /^\d+$/.test(v) || 'Must be a number',
        v =>
          (v && v.length >= 0 && v <= 999) ||
          'Number has to be between 0 and 999'
      ],
      addressRules: [
        v => !!v || 'Required',
        v => (v && v.length <= 100) || 'Max 100 characters'
      ]
    }
  },
  created() {
    this.readData()
  },
  methods: {
    async readData() {
      await MainServices.getAllMachine().then(resp => {
        this.machineList = resp.data || []
        this.expand = this.machineList[0].machine_name
      }).catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: `${err.response.data.message}`
        })
      })
    },
    createMachine() {
      if (this.$refs.form.validate()) {
        let payload = {
          machineName: this.machine.machine_name,
          location: this.machine.location,
          address: this.machine.address
        }
        MainServices.createMachine(payload).then(() => {
          this.$swal.fire({
            icon: 'success',
            title: 'News created successfully'
          })
          this.dialog = false
          this.resetData()
          this.readData()
        }).catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
        })
      }
    },
    saveMachine() {
      if (this.$refs.form.validate()) {
        let payload = {
          machineName: this.machine.machine_name,
          location: this.machine.location,
          address: this.machine.address
        }
        MainServices.updateMachine(this.machine.id, payload).then(() => {
          this.$swal.fire({
            icon: 'success',
            title: 'News created successfully'
          })
          this.dialog = false
          this.resetData()
          this.readData()
        }).catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
        })
      }
    },
    addMachine() {
      this.modal = 'new'
      this.activeItem = 'Add Machine'
      this.resetData()
      this.dialog = true
    },
    editMachine(machine) {
      this.modal = 'edit'
      this.activeItem = 'Edit Machine'
      this.machine = machine
      this.dialog = true
    },
    addProduct(item) {
      this.modal = 'new'
      this.activeItem = 'Add Product'
      this.dialog1 = true
      this.product = {
        ...this.product,
        ...{
          machine_id: item.id
        }
      }
    },
    editProduct(product) {
      console.log(product)
      this.modal = 'edit'
      this.activeItem = 'Edit Product'
      this.product = product
      this.dialog1 = true
    },
    createProduct() {
      if (this.$refs.formProduct.validate()) {
        let payload = {
          productName: this.product.product_name,
          price: parseInt(this.product.price),
          number: parseInt(this.product.number),
          machineId: parseInt(this.product.machine_id)
        }
        MainServices.createProduct(payload).then(() => {
          this.$swal.fire({
            icon: 'success',
            title: 'News created successfully'
          })
          this.dialog1 = false
          this.resetData()
          this.readData()
        }).catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
        })
      }
    },
    updateProduct() {
      if (this.$refs.formProduct.validate()) {
        let payload = {
          productName: this.product.product_name,
          price: parseInt(this.product.price),
          number: parseInt(this.product.number),
          machineId: parseInt(this.product.machine_id)
        }
        MainServices.updateProduct(this.product.id, payload).then(() => {
          this.$swal.fire({
            icon: 'success',
            title: 'News created successfully'
          })
          this.dialog1 = false
          this.resetData()
          this.readData()
        }).catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
        })
      }
    },
    resetData() {
      this.machine = {
        address: '',
        location: '',
        machine_name: '',
        product: []
      }

      this.product = {
        product_name: '',
        price: '',
        number: '',
        machine_id: null
      }
    },
    close() {
      this.dialog = !this.dialog
      this.resetData()
    },
    closeProduct() {
      this.dialog1 = !this.dialog1
      this.resetData()
    },
    getColor(quantity) {
      if (quantity <= 10) return 'red'
      else return 'green'
    },
    showTable(name) {
      if (this.expand === name) {
        return this.expand = ''
      }

      this.expand = name
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
