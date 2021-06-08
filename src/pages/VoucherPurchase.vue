<template>
  <q-page class="bg-secondary myfont">
     <Requests />
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
      <q-table
      title="Voucher Purchases for Review"
      title-class="text-h6 text-bold"
      :data="data"
      :columns="columns"
      row-key="date"
      binary-state-sort
       no-data-label="NO VOUCHER PURCHASES TO VERIFY AT THIS TIME"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="merchant_name" :props="props">
           <span class = ""> {{ props.row.merchant_name }}</span><br/>
          </q-td>
          <q-td key="cost" :props="props">
            <div class="text-pre-wrap">{{ formatPrice(props.row.cost) }}</div>
          </q-td>
           <q-td key="payment_method" :props="props">
            <div class="text-pre-wrap">{{ props.row.payment_method }}</div>
          </q-td>
           <q-td key="status" :props="props">
            <div class="text-pre-wrap text-secondary">{{ props.row.status }}</div>
          </q-td>
           <q-td key="action" :props="props">
          <q-btn color="primary" @click="card = true; imurl = props.row.proof_of_payment;
           tn = props.row.ref_number;
           dt = props.row.date;
           pn = props.row.mobile_number;
           mn = props.row.merchant_name;
          amoun = props.row.cost;
          pmthd = props.row.payment_method;
          vid = props.row.id;">
            <i left class ="fa fa-eye" />
            <div class="q-ml-xs"> View</div>
          </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
      </q-card>
      <q-dialog v-model="card" :maximized="maximizedToggle">
      <q-card class="my-card">
         <q-card-section horizontal>
           <q-card-section class = "bg-secondary">
             <q-card-section class="q-pt-xs">
          <!-- <div class="text-overline">Overline</div> -->
          <div class="text-h6 q-mt-sm text-bold q-mb-xs">VIRIFY VOUCHER PURCHASE</div>
           <q-item-section>
            <q-item-label class="text-bold">Transaction No.:</q-item-label>
            <q-item-label >{{ tn }}</q-item-label>
            <q-item-label class="text-bold">Date: </q-item-label>
            <q-item-label  >{{ dt }}</q-item-label>
            <q-item-label class="text-bold">Merchant Name: </q-item-label>
            <q-item-label  >{{ mn }}</q-item-label>
            <q-item-label  class="text-bold">Phone Number: </q-item-label>
            <q-item-label >{{ pn }}</q-item-label>
            <q-item-label class="text-bold ">Amount</q-item-label>
            <q-item-label  >{{ amoun }}</q-item-label>
              <q-item-label  class="text-bold">Payment Method:</q-item-label>
            <q-item-label>{{ pmthd }}</q-item-label>
          </q-item-section>
        </q-card-section>
              <q-card-actions vertical class="justify-around" style="width:300px;">
          <q-btn color="info" label="Verify Voucher" @click = "accept(vid)" />
          <q-btn  color="negative"  label = "Reject Voucher"  @click = "reject(vid)" />
          <q-btn v-close-popup  color="white" text-color="black" label = "Close" />

              </q-card-actions>
        </q-card-section>
        <div style="width:100%"  >
        <q-img :src="imbase + imurl" class="float-right"/>
        </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    </div>
  </q-page>
</template>

<script>
import Requests from 'components/pending_request.vue'
export default {
  name: 'PageIndex',
  components: {
    Requests
  },
  data () {
    return {
      vid: null,
      tn: null,
      dt: null,
      pn: null,
      mn: null,
      amoun: null,
      pmthd: null,
      maximizedToggle: true,
      imbase: 'https://api.markturtlehouse.dev/',
      imurl: '',
      card: false,
      columns: [
        { name: 'date', align: 'center', label: 'Date', field: 'date', sortable: true },
        { name: 'merchant_name', align: 'left', label: 'Merchant Name', field: 'merchant_name', sortable: true },
        { name: 'cost', align: 'left', label: 'Cost', field: 'cost' },
        { name: 'payment_method', align: 'left', label: 'Payment Method', field: 'payment_method' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
        { name: 'action', label: 'Proof of Payment', field: 'proof_of_payment' }
      ],
      data: []
    }
  },
  methods: {
    accept (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to verify this voucher? Verifying this voucher will update the merchant`s voucher balance.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('voucher/' + id + '/verify ',
          {
            headers: {
              Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
            }
          }
        ).then(response => {
          this.card = false
          this.getVoucher_to_review()
          this.$q.notify({
            message: ' The voucher has been verified and the merchant`s voucher balance has been updated.',
            color: 'info',
            icon: 'warning'
          })
        }
        ).catch(error => {
          if (error.response && error.response.statusText) alert(error.response.statusText)
          console.log(error.response)
        })
      }).onCancel(() => {
        this.card = false
      })
    },
    reject (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to reject this voucher? Make sure to contact the customer first before rejecting this purchase.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('voucher/' + id + '/reject ',
          {
            headers: {
              Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
            }
          }
        ).then(response => {
          this.card = false
          this.getVoucher_to_review()
          this.$q.notify({
            message: 'This voucher purchase has been rejected. An automated email will be sent to the customer.',
            color: 'negative',
            icon: 'warning'
          })
        }
        ).catch(error => {
          if (error.response && error.response.statusText) alert(error.response.statusText)
          console.log(error.response)
        })
      }).onCancel(() => {
        this.card = false
      })
    },
    getVoucher_to_review () {
      this.$axios.post('voucher/orders/to-verify',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
          }
        }
      ).then(response => {
        console.log(response.data)
        this.data = response.data.results.orders
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  created () {
    this.getVoucher_to_review()
  }
}
</script>

<style>
  .row_col {
    display: flex;
  }
  .img_col{
    width: 29%;
    margin-left: 4%;
    display: flex;
  }
  .money{
    margin-left: 23px;
    margin-top: 18px;
  }
  .money_label{
    font-size: 24px;
    font-weight: bold;
  }
  p{
        margin: 0 3px 2px;
  }
  .title_img{
    width: 10%;
  }
  .title{
    display: flex;
  }
  .title_top{
    line-height: 6rem;
    margin-left: 20px;
    font-size: 34px;
  }
  .span_text{
    color: #087aa9;
    text-decoration: underline;
  }
  .logo{
    margin-left: 7%;
  }
  .col_products{
    margin-left: 3%;
    margin-right: -2%;
  }
</style>
