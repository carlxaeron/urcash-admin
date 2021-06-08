<template>
  <q-page class="bg-secondary myfont">
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-card-section class="title">
              <img
                class="title_img"
                src="~assets/p5.png"
              >
              <div class="text-h6 title_top">You have <span class="span_text">{{ unresolve }}</span> request to review Today.</div>
            </q-card-section>
        </q-card>
    </div>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Today so Far | LIFETIME</div>
          <q-separator />
        </q-card-section>
        <q-card-section>
          <div class="row_col">
            <div class="img_col">
                <img
                  alt="G2GBox logo"
                  src="~assets/p4.png"
                >
                <div class="money">
                  <p class="money_label"> {{ total_transactions }}</p>
                  <p>Transactions</p>
                </div>
            </div>
            <div class="img_col">
              <img
                alt="G2GBox logo"
                src="~assets/p2.png"
              >
              <div class="money">
                  <p class="money_label"> {{ total_sales }}</p>
                  <p>Purchases</p>
                </div>
            </div>
            <div class="img_col">
              <img
                alt="G2GBox logo"
                src="~assets/p3.png"
              >
              <div class="money">
                <p class="money_label"> {{ total_voucher_orders_sold }}</p>
                <p>Vouchers</p>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <div class = "bg-white q-pa-md">
      <div class="text-h6 q-mb-sm">TOP SUMMARY</div>
      <div class = "row">
        <div class = "col-md-4 col-lg-4">
        <q-card flat class="my-card bg-info text-white">
      <q-card-section>
         <div class="text-h6">Top Products</div>
        <div class="text-subtitle2" v-for="item in products5" :key="item.product_id"> {{ item.product_name }}</div>
      </q-card-section>
    </q-card>
    </div>
      <div class = "col-md-4 col-lg-4">
     <q-card flat class="my-card bg-primary  text-white">
         <q-card-section>
        <div class="text-h6">Top Merchants</div>
        <div class="text-subtitle2" v-for="item in merchants5" :key="item.shop_id"> {{ item.merchant_name }}</div>
      </q-card-section>
    </q-card>
      </div>
        <div class = "col-md-4 col-lg-4">
     <q-card flat class="my-card bg-positive  text-white">
       <q-card-section>
        <div class="text-h6">Top Manufacturers</div>
        <div class="text-subtitle2" v-for="item in manufacturers5" :key="item.manufacturer_name"> {{ item.manufacturer_name }}</div>
      </q-card-section>
    </q-card>
        </div>
    </div>
      </div>
    </div>
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="text-h6">PURCHASES X CITY</div>
              <VueApexCharts
                width="500"
                type="bar"
                :options="opt_city"
                :series="series_city"
                 v-if ="rendered1 === true"
              >
              </VueApexCharts>
            </div>
            <div class="col">
              <div class="text-h6">PURCHASES X MANUFACTURERS</div>
              <VueApexCharts
                width="500"
                type="bar"
                :options="opt_manufacturers"
                :series="series_manufacturers"
                v-if ="rendered === true"
              >
              </VueApexCharts>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
     <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
            title="Latest Transaction"
            dense
            :data="data"
            :columns="columns"
            row-key="name"
          />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'PageIndex',
  components: {
    VueApexCharts
  },
  data () {
    return {
      rendered1: false,
      rendered: false,
      mxaxis: [],
      cxaxis: [],
      mdata: [],
      cdata: [],
      unresolve: null,
      total_sales: '',
      total_transactions: '',
      total_voucher_orders_sold: '',
      opt_city: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        },
        colors: ['#082F84']
      },
      opt_manufacturers: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        },
        colors: ['#58CB08']
      },
      series_city: [{
        name: 'PURCHASES X CITY',
        data: []
      }],
      series_manufacturers: [{
        name: 'PURCHASES X MANUFACTURERS',
        data: []
      }],
      columns: [
        { name: 'date', align: 'center', label: 'Date', field: 'date', sortable: true },
        { name: 'time', label: 'Time', field: 'time', sortable: true },
        { name: 'merchant', label: 'Merchant Name', field: 'merchant_name' },
        { name: 'customer_number', label: 'Customer#', field: 'customer_number' },
        { name: 'cost', label: 'Cost', field: 'cost' },
        { name: 'location', label: 'Location', field: 'location' }
      ],
      data: [],
      products5: [],
      merchants5: [],
      manufacturers5: [],
      cities5: []
    }
  },
  methods: {
    getverification_requests () {
      this.$axios.get('verification_requests/status/unresolved',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.unresolve = response.data.results.length
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    transactionstoday () {
      this.$axios.get('transactions/today',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.total_sales = response.data.results.total_sales
        this.total_transactions = response.data.results.total_transactions
        this.total_voucher_orders_sold = response.data.results.total_voucher_orders_sold
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    transactionstop5products () {
      this.$axios.get('transactions/top5/products ',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.products5 = response.data.results
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    transactionstop5merchants () {
      this.$axios.get('transactions/top5/merchants ',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.merchants5 = response.data.results
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    transactionstop5manufacturers () {
      this.$axios.get('transactions/top5/manufacturers',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.manufacturers5 = response.data.results
        this.manufacturers5.forEach(element =>
          this.mdata.push(element.total_sales_of_manufacturer)
        )
        this.series_manufacturers[0].data = this.mdata

        this.manufacturers5.forEach(element =>
          this.mxaxis.push(element.manufacturer_name)
        )
        this.opt_manufacturers.xaxis.categories = this.mxaxis
        this.rendered = true
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    salescity () {
      this.$axios.get('transactions/top5/cities',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.cities5 = response.data.results
        this.cities5.forEach(element =>
          this.cdata.push(element.total_sales_of_city)
        )
        this.series_city[0].data = this.cdata

        this.cities5.forEach(element =>
          this.cxaxis.push(element.city)
        )
        this.opt_city.xaxis.categories = this.cxaxis
        this.rendered1 = true
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    transactionslatest () {
      this.$axios.get('transactions/latest/5',
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
    }
  },
  created () {
    this.getverification_requests()
    this.transactionstoday()
    this.transactionstop5products()
    this.transactionstop5merchants()
    this.transactionstop5manufacturers()
    this.salescity()
    this.transactionslatest()
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
