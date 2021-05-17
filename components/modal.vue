<template>
  <v-row justify='center'>
    <v-dialog
      v-model='showModal'
      fullscreen
      hide-overlay
      persistent
      transition='dialog-bottom-transition'
    >
      <v-card>
        <v-toolbar
          dark
          color='primary'
        >
          <v-btn
            icon
            dark
            @click='closeModal'
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Machine no.01</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>

        <v-row class='my-10'>
          <template v-for='(item, index) in productList'>
            <v-col cols='3'>
              <v-card elevation='0'>
                <v-img
                  class='mx-auto'
                  max-width='100'
                  :lazy-src='require(`~/assets/img/${bottle}.png`)'
                  :src='require(`~/assets/img/${bottle}.png`)'
                ></v-img>

                <div class='subtitle-1 text-center'>
                  <div>{{ item.product_name }}</div>
                  <div class='price'>฿{{ item.price }}</div>
                  <div class='number'>จำนวน : {{ item.number }}</div>
                </div>

                <v-card-actions>
                  <v-btn
                    class='mx-auto'
                    fab
                    dark
                    small
                    color='primary'
                    @click='submitOrder(item)'
                  >
                    <v-icon dark>
                      mdi-cart
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'modal',
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    productList: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      bottle: 'bottle',
      selectGood: {}
    }
  },
  methods: {
    closeModal() {
      this.selectGood = {}
      this.$emit('toggleMachine')
    },
    submitOrder(data) {
      this.$swal.fire({
        title: 'กรุณากดยืนยันคำสั่งซื้อ',
        text: 'คุณจะไม่สามารถยกเลิกคำสั่งซื้อได้ เมื่อคุณกดปุ่มยืนยัน!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก!'
      }).then(result => {
        if (result.value) {
          this.selectGood = {
            ...this.selectGood,
            ...{
              productId: parseInt(data.id),
              totalPrice: parseInt(data.price),
              totalNumber: 1
            }
          }

          this.$emit('placeOrder', this.selectGood)
        }
      })
    }
  }
}
</script>

<style scoped>
.price {
  color: #DA1F28;
}

.number {
  color: #AAAAAA;
}
</style>
