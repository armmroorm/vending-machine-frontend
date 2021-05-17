<template>
  <div class='Machine'>
    <modal :showModal='dialog' :productList='productList' @toggleMachine='toggleMachine' @placeOrder='placeOrder' />
    <v-row>
      <template v-for='(item, index) in machineList'>
        <v-col cols='6'>
          <v-hover v-slot='{ hover }'>
            <v-card
              class='mx-auto'
              color='grey lighten-4'
              max-width='400'
            >
              <v-img
                :lazy-src='require(`~/assets/img/${machineImg}.png`)'
                :src='require(`~/assets/img/${machineImg}.png`)'
              >
                <v-expand-transition>
                  <div
                    v-if='hover'
                    class='d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text'
                    style='height: 100%;'
                    @click='toggleMachine(item.product)'
                  >
                    See more...
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text
                class='pt-6'
                style='position: relative;'
              >
                <v-btn
                  absolute
                  color='orange'
                  class='white--text'
                  fab
                  large
                  right
                  top
                  @click='toggleMachine(item.product)'
                >
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
                <h3 class='display-1 font-weight-light orange--text mb-2'>
                  {{ item.machine_name }}
                </h3>
                <div class='font-weight-light title mb-2'>
                  ตำแหน่งเครื่อง : {{ item.address }}
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import Modal from '~/components/modal'
import MainServices from '~/services/MainServices'

export default {
  name: 'Machine',
  components: { Modal },
  data() {
    return {
      dialog: false,
      machineImg: 'logo',
      machineList: [],
      productList: []
    }
  },
  created() {
    this.getAllMachine()
  },
  methods: {
    async getAllMachine() {
      await MainServices.getAllMachine().then(resp => {
        this.machineList = resp.data || []
        this.checkStock()
      }).catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: `${err.response.data.message}`
        })
      })
    },
    toggleMachine(data) {
      this.productList = data
      this.dialog = !this.dialog
    },
    checkStock() {
      MainServices.checkStock().then(resp => {
        if (resp.data) {
          if (this.$auth.loggedIn) {
            this.$swal.fire({
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              icon: 'warning',
              title: 'Nearly out of stock detected',
              html: 'Click to check, ' + '<a href="http://localhost:3000/admin/machine">links</a>',
              toast: true,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })
          }
        }
      }).catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: `${err.response.data.message}`
        })
      })
    },
    placeOrder(order) {
      MainServices.placeOrder({
        productId: order.productId,
        totalPrice: order.totalPrice,
        totalNumber: order.totalNumber
      }).then(resp => {
        this.$swal.fire({
          icon: 'success',
          title: `คำสั่งซื้อสำเร็จ`
        })

        this.dialog = !this.dialog
        this.getAllMachine()
      }).catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: `${err.response.data.message}`
        })
      })
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
  cursor: pointer;
}
</style>
