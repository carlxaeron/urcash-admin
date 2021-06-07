<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md q-pb-xl">
        <q-table
      title="Sales By City"
      title-class="text-h6 text-bold"
      :data="data"
      :columns="columns"
      row-key="city"
      binary-state-sort
       no-data-label=" No Data Available">
       <template v-slot:top-right>
    <vue-json-to-csv
    :json-data="data"
    :labels="{ city: { title: 'City' }, merchant_name: { title: 'Merchant' }, total_earnings: { title: 'Earnings' } }"
    :csv-title="'Report by City'"
    :separator="';'">
    <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
        />
</vue-json-to-csv>
        <q-select v-model="target" style="width:250px;" debounce="400" dense :options="targetlist" label="Select City" class="q-ml-md q-mr-md" @input ="getData()" />
        <q-input  dense debounce="400" v-model="date_from"  @input ="getData()" type = "date" class="q-mr-md" :max="date_to" >
        </q-input>
         -
        <q-input  dense debounce="400" v-model="date_to" type = "date" class="q-ml-md" :min="date_from"   @input ="getData()" >
        </q-input>
      </template>
       <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="city" :props="props">
            {{ props.row.city }}
          </q-td>
          <q-td key="merchant_name" :props="props">
           <span class = ""> {{ props.row.merchant_name }}</span><br/>
          </q-td>
          <q-td key="total_earnings" :props="props">
            <div class="text-pre-wrap">{{ props.row.total_earnings }}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
      <span class = "text-bold text-h6 float-right">Total: {{ total }}  </span>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import VueJsonToCsv from 'vue-json-to-csv'
export default {
  name: 'cityReport',
  components: { VueJsonToCsv },
  data () {
    return {
      targetlist: [],
      date_from: null,
      date_to: null,
      target: null,
      total: 0,
      columns: [
        { name: 'city', align: 'left', label: 'City', field: 'city', sortable: true },
        { name: 'merchant_name', align: 'left', label: 'Merchant', field: 'merchant_name', sortable: true },
        { name: 'total_earnings', align: 'left', label: 'Earnings', field: 'total_earnings', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    getData () {
      if (this.target !== null && this.date_from !== null && this.date_to !== null) {
        this.$axios.post('sales/city',
          {
            city: this.target,
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
          this.data = response.data.results.merchants
          this.total = response.data.results.total_sales
        }
        ).catch(error => {
          this.total = 0
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
    getCity () {
      this.$axios.get('addresses/city',
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
        console.log(error.response)
      })
    }
  },
  created () {
    this.getCity()
  }
}
</script>
