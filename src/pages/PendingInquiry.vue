<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
            title="Pending Inquiries"
            dense
            :data="data"
            :columns="columns"
            row-key="date"
            binary-state-sort
           :filter="filter"
            no-data-label=" No Pending Inquiries"
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
          <q-td key="priority" :props="props">
            <div class="text-pre-wrap">{{ props.row.priority }}</div>
          </q-td>
           <q-td key="Action" :props="props">
           <q-btn color="primary" @click=" get_date = props.row.created_at;
           get_name = props.row.name
           get_reference_number = props.row.reference_number;
           get_description = props.row.description;
           get_email = props.row.email;
           get_issue = props.row.issue;
           get_mobile_number = props.row.mobile_number;
           get_id = props.row.id
           view_inq = true; ">

            <div class="q-ml-xs">View</div>
          </q-btn>
          </q-td>
        </q-tr>
      </template>
        </q-table>
      </q-card>
      <q-dialog v-model="view_inq" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card style="max-width: 300px; width:100%">
        <q-bar>
          <q-space/>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-bold">Details</div>
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
           {{ get_reference_number }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Name
          </div>
          <div class="text-caption text-bold">
           {{ get_name }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Mobile Number
          </div>
          <div class="text-caption text-bold">
           {{ get_mobile_number }}
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Email
          </div>
          <div class="text-caption text-bold">
           {{ get_email }}
          </div>
          <q-separator/>
            <div class="text-subtitle1">
          Issue
          </div>
          <div class="text-caption text-bold">
            {{ get_issue }}
          </div>
          <q-separator/>
           <div class="text-subtitle1">
            Description
          </div>
          <div class="text-caption text-bold">
           {{ get_description }}
          </div>
          <q-separator/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click ="composer = true"  color="info" label="Respond" />
          <q-btn @click ="resolve(get_id)"  color="primary" label = "Resolve"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
       <q-dialog v-model="composer" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Write a response</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
          v-model="message"
          type="textarea"
          input-class="text-h6"
          autofocus
          ref="message"
          :rules="[val => !!val || 'Required']"
        >
         </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color = "negative" label="Cancel" @click ="composer = false;" />
          <q-btn  label="Send" color = "info" @click ="send()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageALS',

  data () {
    return {
      composer: false,
      message: null,
      get_name: null,
      get_id: null,
      get_date: null,
      get_description: null,
      get_email: null,
      get_issue: null,
      get_mobile_number: null,
      get_reference_number: null,
      view_inq: false,
      filter: '',
      columns: [
        { name: 'date', align: 'left', label: 'Date', field: 'created_at', sortable: true },
        { name: 'mobile', align: 'left', label: 'Mobile #', field: 'mobile_number' },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'priority', align: 'left', label: 'Priority', field: 'priority', sortable: true },
        { name: 'Action', align: 'left', label: 'Action', field: 'Action', sortable: true }

      ],
      data: []
    }
  },
  methods: {
    send () {
      this.$refs.message.validate()
      if (this.$refs.message.hasError) {
      } else {
        this.$axios.post('support_tickets/compose', {
          message: this.message,
          reference_number: this.get_reference_number
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          this.$q.notify({
            message: 'Message sent successfully!',
            color: 'info',
            icon: 'warning'
          })
          this.composer = false
        }
        ).catch(error => {
          if (error.response && error.response.statusText) alert(error.response.statusText)
          console.log(error.response)
          this.$q.notify({
            message: 'Failed to sent!',
            color: 'negative',
            icon: 'warning'
          })
          this.composer = false
        })
      }
    },
    resolve (id) {
      this.$q.dialog({
        title: 'Confirm to resolve!',
        message: 'The user`s issue will now be resolved',
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
          this.view_inq = false
          console.log(response.data)
          this.getData()
          this.$q.notify({
            message: 'The user`s issue successfully resolved.',
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
    getData () {
      this.$axios.get('support_tickets/status/open',
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
