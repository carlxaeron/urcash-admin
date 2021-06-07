<template>
  <q-page class="bg-green-2">
    <Requests />
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
      title="Merchants to Review"
      title-class="text-h6 text-bold"
      :data="data"
      :columns="columns"
      row-key="date"
      binary-state-sort
       no-data-label=" No Merchants  to Review at this Time"
    >
  <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.created_at }}
          </q-td>
          <q-td key="shop_name" :props="props">
           <span class = ""> {{ props.row.reg_bus_name }}</span><br/>
          </q-td>
          <q-td key="shop_address" :props="props">
            <div class="text-pre-wrap">{{ props.row.business_address }} {{ props.row.business_street }}  {{ props.row.business_barangay }} {{ props.row.business_city }} {{ props.row.business_province }} </div>
          </q-td>
           <q-td key="action" :props="props">
           <q-btn color="info" @click ="imurl = 'http://api.g2g.com/' + props.row.image_path;
           business_address = props.row.business_address;
           business_barangay = props.row.business_barangay;
           business_street = props.row.business_street;
           business_city = props.row.business_city;
           business_province = props.row.business_province;
           date = props.row.created_at;
           document_submitted = props.row.document_submitted;
           mobile_number = props.row.mobile_number;
           email = props.row.email;
           reg_bus_name = props.row.reg_bus_name;
           verification_request_id = props.row.verification_request_id;
           merchdetails = true;
           ">
            <div class="q-ml-xs"> View</div>
          </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
      </q-card>
        <q-dialog v-model="merchdetails">
      <q-card  style="max-width: 350px; width:100%;">
        <div style = "height:380px;">
        <q-img :src ="imurl"/>
        </div>
        <q-card-section>
          <q-btn
            fab
            color="primary"
            class="absolute"
            style="top: 0; right: 20px; transform: translateY(-50%);"
          >
          <i class = "fa fa-award"/>
          </q-btn>
        </q-card-section>

        <q-card-section class="q-py-none">
       <span class = "text-grey text-caption">  {{ document_submitted }} </span>
          <div class="text-subtitle1">
            {{ reg_bus_name }}
          </div>
          <div class="text-caption text-grey">
           {{ business_address }} {{ business_street }}  {{ business_barangay }} {{business_city }} {{business_province }}<br/>
           {{ mobile_number }}<br/>
           {{ email }}

          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup size ="sm" @click="accept(verification_request_id)" color="info" label="Approve" />
          <q-btn v-close-popup size="sm" @click="reject(verification_request_id)" color="negative" label = "Reject" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>

  </q-page>
</template>

<script>
import Requests from 'components/pending_request.vue'
export default {
  name: 'merchantVerify',
  components: {
    Requests
  },
  data () {
    return {
      verification_request_id: null,
      merchdetails: false,
      imurl: '',
      business_address: null,
      business_street: null,
      business_barangay: null,
      business_city: null,
      business_province: null,
      date: null,
      document_submitted: null,
      mobile_number: null,
      email: null,
      reg_bus_name: null,
      columns: [
        { name: 'date', align: 'left', label: 'Date', field: 'created_at', sortable: true },
        { name: 'shop_name', align: 'left', label: 'Registered Business Name', field: 'reg_bus_name', sortable: true },
        { name: 'shop_address', align: 'left', label: 'Address', field: 'shop_address', sortable: true },
        { name: 'action', align: 'left', label: 'Action', field: 'action' }
      ],
      data: []
    }
  },
  methods: {
    reject (id) {
      this.$q.dialog({
        title: 'Confirm reject',
        message: 'Are you sure you want to reject this request? The merchant will not be verified.',
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
            message: 'Request rejected successfully',
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
        title: 'Confirm Approve',
        message: 'Are you sure you want to approve this request?',
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
            message: 'Request approved successfully',
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
      this.$axios.get('shops/unverified',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.data = response.data.results.merchants
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
