<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md q-pb-xl">
        <q-table
      title="Sales By Manufacturer"
      title-class="text-h6 text-bold"
      :data="data"
      :columns="columns"
      row-key="manufacturer_name"
      binary-state-sort
       no-data-label=" No Data Available">
       <template v-slot:top-right>
    <vue-json-to-csv
    :json-data="data"
    :labels="{ manufacturer_name: { title: 'Manufacturer' }, quantities_sold: { title: 'Sold Items' }, total_sales_of_manufacturer: { title: 'Total Sales' }, total_transactions: { title: 'Total Transactions' } }"
    :csv-title="'Report by Manufacturer'"
    :separator="';'">
    <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
        />
</vue-json-to-csv>
        <q-select v-model="target" style="width:200px;" debounce="400" dense :options="targetlist" label="Select Manufacturer" class="q-ml-md q-mr-md" @input ="getData()" />
        <q-input  dense debounce="400" v-model="date_from"  @input ="getData()" type = "date" class="q-mr-md" :max="date_to" >
        </q-input>
         -
        <q-input  dense debounce="400" v-model="date_to" type = "date" class="q-ml-md" :min="date_from"   @input ="getData()" >
        </q-input>
      </template>
       <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="manufacturer_name" :props="props">
            {{ props.row.manufacturer_name }}
          </q-td>
          <q-td key="quantities_sold" :props="props">
           <span class = ""> {{ props.row.quantities_sold }}</span><br/>
          </q-td>
          <q-td key="total_transactions" :props="props">
            <div class="text-pre-wrap">{{ props.row.total_transactions }}</div>
          </q-td>
            <q-td key="total_sales_of_manufacturer" :props="props">
            <div class="text-pre-wrap">{{ props.row.total_sales_of_manufacturer }}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import VueJsonToCsv from 'vue-json-to-csv'
export default {
  name: 'merchantReport',
  components: { VueJsonToCsv },
  data () {
    return {
      targetlist: [],
      date_from: null,
      date_to: null,
      target: null,
      columns: [
        { name: 'manufacturer_name', align: 'left', label: 'Manufacturer Name', field: 'manufacturer_name', sortable: true },
        { name: 'quantities_sold', align: 'left', label: 'Sold Items', field: 'quantities_sold', sortable: true },
        { name: 'total_transactions', align: 'left', label: 'Total Transactions', field: 'total_transactions', sortable: true },
        { name: 'total_sales_of_manufacturer', align: 'left', label: 'Total Sales', field: 'total_sales_of_manufacturer', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    getData () {
      if (this.target !== null && this.date_from !== null && this.date_to !== null) {
        this.$axios.post('sales/manufacturers',
          {
            manufacturer_name: this.target,
            from: this.date_from,
            to: this.date_to
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          }
        ).then(response => {
          console.log(response.data)
          this.data = response.data.results.manufacturer
        }
        ).catch(error => {
          if (error.response && error.response.statusText) alert(error.response.statusText)
          this.data = []
          console.log(error.response)
          this.$q.notify({
            message: error.response.data.message,
            color: 'negative',
            icon: 'warning'
          })
        })
      }
    },
    getManufacturer () {
      this.$axios.get('products/manufacturers',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.targetlist = response.data.results
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    }
  },
  created () {
    this.getManufacturer()
  }
}
</script>
