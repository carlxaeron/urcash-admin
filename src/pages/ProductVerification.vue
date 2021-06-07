<template>
  <q-page class="bg-secondary">
    <Requests />
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
      title="Products to Review"
      title-class="text-h6 text-bold"
      :data="data"
      :columns="columns"
      row-key="date"
      binary-state-sort
       no-data-label=" No Products  to Review at this Time"
    >
  <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.created_at }}
          </q-td>
          <q-td key="ean" :props="props">
           <span class = ""> {{ props.row.ean }}</span><br/>
          </q-td>
          <q-td key="productname" :props="props">
            <div class="text-pre-wrap">{{ props.row.name }}</div>
          </q-td>
           <q-td key="merchantname" :props="props">
            <div class="text-pre-wrap">{{ props.row.manufacturer_name }}</div>
          </q-td>
           <q-td key="action" :props="props">
          <q-btn color="negative"  @click ="reject(props.row.verification_request_id)" class="q-mr-md">
            <div class="q-ml-xs"> Reject</div>
          </q-btn>
           <q-btn color="info"  @click ="accept(props.row.verification_request_id)">
            <div class="q-ml-xs"> Verify</div>
          </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
      </q-card>
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
      columns: [
        { name: 'date', align: 'left', label: 'Date', field: 'created_at', sortable: true },
        { name: 'ean', align: 'left', label: 'EAN#', field: 'ean', sortable: true },
        { name: 'productname', align: 'left', label: 'Product Name', field: 'name' },
        { name: 'merchantname', align: 'left', label: 'Manufacturer', field: 'manufacturer_name' },
        { name: 'action', align: 'left', label: 'Action', field: 'action' }
      ],
      data: []
    }
  },
  methods: {
    reject (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to reject this product? The product will not be available.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('verification_requests/' + id + '/update', {
          is_accepted: 0
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
          }
        }
        ).then(response => {
          this.getUnverified()
          this.$q.notify({
            message: 'Product rejected successfully',
            color: 'info',
            icon: 'warning'
          })
        }
        ).catch(error => {
          console.log(error.response)
        })
      }).onCancel(() => {
      })
    },
    accept (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to verify this product?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('verification_requests/' + id + '/update', {
          is_accepted: 1
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
          }
        }
        ).then(response => {
          this.getUnverified()
          this.$q.notify({
            message: 'Product verified successfully',
            color: 'info',
            icon: 'warning'
          })
        }
        ).catch(error => {
          console.log(error.response)
        })
      }).onCancel(() => {
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
        console.log(response.data)
        this.data = response.data.results.products
      }
      ).catch(error => {
        console.log(error.response)
      })
    }
  },
  created () {
    this.getUnverified()
  }
}
</script>
