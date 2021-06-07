<template>
  <q-page class="bg-secondary">
    <Requests />
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
            title="Accounts to Resolve"
            dense
            :data="data"
            :columns="columns"
            row-key="date"
            binary-state-sort
           :filter="filter"
            no-data-label=" No Accounts to Resolve at this Time"
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
            {{ props.row.created_at }}
          </q-td>
          <q-td key="mobile" :props="props"  >
            <div class="text-pre-wrap">{{ props.row.mobile_number }}</div>
          </q-td>
           <q-td key="email" :props="props">
            <div class="text-pre-wrap">{{ props.row.email }}</div>
          </q-td>
           <q-td key="Action" :props="props">
           <q-btn color="primary" @click="verify(props.row.id)">
            <div class="q-ml-xs"> Resolve</div>
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
  name: 'PageALS',
  components: {
    Requests
  },
  data () {
    return {
      filter: '',
      columns: [
        { name: 'date', align: 'left', label: 'Date', field: 'created_at', sortable: true },
        { name: 'mobile', align: 'left', label: 'Mobile #', field: 'mobile_number' },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'Action', align: 'left', label: 'Action', field: 'Action', sortable: true }

      ],
      data: []
    }
  },
  methods: {
    verify (id) {
      this.$q.dialog({
        title: 'Confirm to resolve!',
        message: 'The user will now be able to access his/her account!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('support_tickets/' + id + '/update',
          {
            headers: {
              Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token')
            }
          }
        ).then(response => {
          console.log(response.data)
          this.getData()
          this.$q.notify({
            message: 'The account has been successfully resolved.',
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
        this.data = response.data.results.support_tickets
      }
      ).catch(error => {
        console.log(error.response)
      })
    }
  },
  created () {
    this.getData()
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
