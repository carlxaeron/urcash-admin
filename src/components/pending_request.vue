<template>
     <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h4 text-bold">PENDING REQUESTS</div>
          <q-separator />
        </q-card-section>
        <div class="flex row justify-center">
          <q-card-section>
          <div class="text-bold text-center"><span class ="q-pt-lg">Product Verification</span></div>
          <div class="">
            <q-img
              src="~assets/pv_icon.png"
              :ratio="1"
              style="width:150px;"
            />
          </div>
          <div class="text-center">
            <p class="text-h6">{{ pv }}</p>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-bold  text-center"><span class ="q-pt-lg">Voucher Purchases</span></div>
          <div class="">
            <q-img
              src="~assets/vp_icon.png"
              :ratio="1"
              style="width:150px;"
            />
          </div>
          <div class="text-center">
            <p class="text-h6">{{ vp }}</p>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-center">Cash Out</div>
          <div class="">
            <q-img
              src="~assets/co_icon.png"
              :ratio="1"
              style="width:150px;"
            />
          </div>
          <div class="text-center">
            <p class="text-h6">{{ cashout }}</p>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-center"><span class ="q-pt-lg">Account Lock Support</span></div>
          <div class="">
            <q-img
              src="~assets/als_icon.png"
              :ratio="1"
              style="width:150px;"
            />
          </div>
          <div class="text-center">
            <p class="text-h6">{{ als }}</p>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-center"><span class ="q-pt-lg">Merchant Verification</span></div>
          <div class="">
            <q-img
              src="~assets/mv_icon.png"
              :ratio="1"
              style="width:150px;"
            />
          </div>
          <div class="text-center">
            <p class="text-h6">{{ merch }} </p>
          </div>
        </q-card-section>
        </div>
      </q-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      pv: null,
      vp: null,
      merch: null,
      cashout: null,
      als: null

    }
  },
  methods: {
    getVoucher_to_review () {
      this.$axios.post('voucher/orders/to-verify',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
          }
        }
      ).then(response => {
        this.vp = response.data.results.orders.length
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    get_merchant () {
      this.$axios.get('shops/unverified',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
          }
        }
      ).then(response => {
        this.merch = response.data.results.count
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    get_cashout () {
      this.$axios.get('cashouts/count/pending',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
          }
        }
      ).then(response => {
        this.cashout = response.data.results.pending_cashouts
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    getUnverified () {
      this.$axios.get('products/unverified',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        this.pv = response.data.results.count
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    getData () {
      this.$axios.get('support_tickets/type/account_lock ',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.als = response.data.results.count
      }
      ).catch(error => {
        console.log(error.response)
      })
    }
  },
  created () {
    this.getUnverified()
    this.getVoucher_to_review()
    this.get_merchant()
    this.get_cashout()
    this.getData()
    // this.getSample()
  }
}
</script>
