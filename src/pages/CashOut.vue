<template>
  <q-page class="bg-secondary">
    <Requests />
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
            title="Cashout Review"
            dense
            :data="data"
            :columns="columns"
            row-key="date"
            binary-state-sort
           :filter="filter"
            no-data-label=" No Cashouts to Review at this Time"
          >
             <template v-slot:top-right>
        <q-input borderless dense debounce="400" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
            <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="merchant" :props="props"  >
            <div class="text-pre-wrap">{{ props.row.merchant_name }}</div>
          </q-td>
           <q-td key="payment" :props="props">
            <div class="text-pre-wrap">{{ props.row.payment_method }}</div>
          </q-td>
          <q-td key="account_name" :props="props">
            <div class="text-pre-wrap">{{ props.row.account_name }}</div>
          </q-td>
          <q-td key="account_number" :props="props">
            <div class="text-pre-wrap">{{ props.row.account_number }}</div>
          </q-td>
          <q-td key="amount" :props="props">
            <div class="text-pre-wrap">{{ props.row.cost }}</div>
          </q-td>
           <q-td key="Action" :props="props">
           <q-btn color="primary" @click=" get_date = props.row.date;
           get_ref = props.row.ref_number;
           get_merchant = props.row.merchant_name;
           get_payment = props.row.payment_method;
           get_accountName = props.row.account_name;
           get_accountNo = props.row.account_number;
           get_amount = props.row.cost;
           get_id = props.row.id
           view_cashout = true;
           ">
            <div class="q-ml-xs"> View</div>
          </q-btn>
          </q-td>
        </q-tr>
      </template>
        </q-table>
      </q-card>
        <q-dialog v-model="view_cashout" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="max-width: 300px; width:100%">
        <q-bar>
          <q-space/>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-bold">Cashout Details</div>
        </q-card-section>
         <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            Date
          </div>
          <div class="text-caption text-bold">
         {{ get_date }}
          </div>
          <q-separator/>
            <div class="text-subtitle1">
            Reference No.
          </div>
          <div class="text-caption text-bold">
           {{ get_ref }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Merchant Name
          </div>
          <div class="text-caption text-bold">
           {{ get_merchant }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Payment Method
          </div>
          <div class="text-caption text-bold">
           {{ get_payment }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Account Name
          </div>
          <div class="text-caption text-bold">
           {{ get_accountName }}
          </div>
          <q-separator/>
            <div class="text-subtitle1">
            Account No.
          </div>
          <div class="text-caption text-bold">
            {{ get_accountNo }}
          </div>
          <q-separator/>
           <div class="text-subtitle1">
            Amount
          </div>
          <div class="text-caption text-bold">
           {{ get_amount }}
          </div>
          <q-separator/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click ="verify(get_id)"  color="info" label="Approve" />
          <q-btn @click ="reject(get_id)"  color="negative" label = "Reject"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
            title="Successful Cashout"
            dense
            :data="data1"
            :columns="columns1"
            row-key="date"
            binary-state-sort
           :filter="filter1"
          >
         <template v-slot:top-right>
        <q-input borderless dense debounce="400" v-model="filter1" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
       <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="merchant" :props="props"  >
            <div class="text-pre-wrap">{{ props.row.merchant_name }}</div>
          </q-td>
           <q-td key="payment" :props="props">
            <div class="text-pre-wrap">{{ props.row.payment_method }}</div>
          </q-td>
          <q-td key="account_name" :props="props">
            <div class="text-pre-wrap">{{ props.row.account_name }}</div>
          </q-td>
          <q-td key="account_number" :props="props">
            <div class="text-pre-wrap">{{ props.row.account_number }}</div>
          </q-td>
          <q-td key="amount" :props="props">
            <div class="text-pre-wrap">{{ props.row.cost }}</div>
          </q-td>
           <q-td key="Action" :props="props">
           <q-btn color="primary" @click=" get_date = props.row.date;
           get_ref = props.row.ref_number;
           get_merchant = props.row.merchant_name;
           get_payment = props.row.payment_method;
           get_accountName = props.row.account_name;
           get_accountNo = props.row.account_number;
           get_amount = props.row.cost;
           get_id = props.row.id
           view_successful = true;
           ">
            <div class="q-ml-xs"> View</div>
          </q-btn>
          </q-td>
        </q-tr>
      </template>
        </q-table>
      </q-card>
           <q-dialog v-model="view_successful" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="max-width: 300px; width:100%">
        <q-bar>
          <q-space/>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-bold">Successful Cashout Details</div>
        </q-card-section>
         <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            Date
          </div>
          <div class="text-caption text-bold">
         {{ get_date }}
          </div>
          <q-separator/>
            <div class="text-subtitle1">
            Reference No.
          </div>
          <div class="text-caption text-bold">
           {{ get_ref }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Merchant Name
          </div>
          <div class="text-caption text-bold">
           {{ get_merchant }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Payment Method
          </div>
          <div class="text-caption text-bold">
           {{ get_payment }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Account Name
          </div>
          <div class="text-caption text-bold">
           {{ get_accountName }}
          </div>
          <q-separator/>
            <div class="text-subtitle1">
            Account No.
          </div>
          <div class="text-caption text-bold">
            {{ get_accountNo }}
          </div>
          <q-separator/>
           <div class="text-subtitle1">
            Amount
          </div>
          <div class="text-caption text-bold">
           {{ get_amount }}
          </div>
          <q-separator/>
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
      view_successful: false,
      filter: '',
      filter1: '',
      get_id: null,
      get_date: null,
      get_ref: null,
      get_merchant: null,
      get_payment: null,
      get_accountName: null,
      get_accountNo: null,
      get_amount: null,
      view_cashout: false,
      columns: [
        { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true },
        { name: 'merchant', align: 'left', label: 'Merchant Name', field: 'merchant_name' },
        { name: 'payment', align: 'left', label: 'Payment Method', field: 'payment_method' },
        { name: 'account_name', align: 'left', label: 'Account Name', field: 'account_name' },
        { name: 'account_number', align: 'left', label: 'Account #', field: 'account_number' },
        { name: 'amount', align: 'left', label: 'Amount', field: 'cost', sortable: true },
        { name: 'Action', align: 'left', label: 'Action', field: 'Action', sortable: true }

      ],
      columns1: [
        { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true },
        { name: 'merchant', align: 'left', label: 'Merchant Name', field: 'merchant_name' },
        { name: 'payment', align: 'left', label: 'Payment Method', field: 'payment_method' },
        { name: 'account_name', align: 'left', label: 'Account Name', field: 'account_name' },
        { name: 'account_number', align: 'left', label: 'Account #', field: 'account_number' },
        { name: 'amount', align: 'left', label: 'Amount', field: 'cost', sortable: true },
        { name: 'Action', align: 'left', label: 'Action', field: 'Action', sortable: true }

      ],
      data: [],
      data1: []
    }
  },
  methods: {
    verify (id) {
      this.$q.dialog({
        title: 'Confirm to approve!',
        message: 'Are you sure you want to approve this request? Make sure to carefully check the details.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('cashout/' + id + '/approve ',
          {
            headers: {
              Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
            }
          }
        ).then(response => {
          console.log(response.data)
          this.view_cashout = false
          this.getCashouts()
          this.$q.notify({
            message: 'You have successfuly approve a cashout request!.',
            color: 'info',
            icon: 'warning'
          })
        }
        ).catch(error => {
          if (error.response && error.response.statusText) alert(error.response.statusText)
          console.log(error.response)
        })
      }).onCancel(() => {
      })
    },
    reject (id) {
      this.$q.dialog({
        title: 'Confirm to reject!',
        message: 'Are you sure you want to reject this request? Make sure to carefully check the details.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('cashout/' + id + '/reject ',
          {
            headers: {
              Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
            }
          }
        ).then(response => {
          console.log(response.data)
          this.view_cashout = false
          this.getCashouts()
          this.$q.notify({
            message: 'You have successfuly reject a cashout request!.',
            color: 'negative',
            icon: 'warning'
          })
        }
        ).catch(error => {
          if (error.response && error.response.statusText) alert(error.response.statusText)
          console.log(error.response)
        })
      }).onCancel(() => {
      })
    },
    getCashouts () {
      this.$axios.get('cashouts/pending/request ',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.data = response.data.results
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    getCashouts_suc () {
      this.$axios.get('cashouts/payments/successful',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.data1 = response.data.results.approved_cashouts
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    }
  },
  created () {
    this.getCashouts()
    this.getCashouts_suc()
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
