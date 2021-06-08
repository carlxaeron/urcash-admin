<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
            title="List of Admin"
            dense
            :data="data"
            :columns="columns"
            row-key="id"
            binary-state-sort
           :filter="filter"
            no-data-label=" No data available"
          >
             <template v-slot:top-right>
                 <q-btn @click ="add = true" size = "sm"  color="info" label = "Add" class = "q-mx-md"/>
        <q-input borderless dense debounce="400" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
            <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="first_name" :props="props">
            {{ props.row.first_name }}
             <q-popup-edit v-model="props.row.first_name" title="Update First Name" buttons>
               <q-input v-model="props.row.first_name" dense autofocus type="text" @change="detect(props.row)"/>
            </q-popup-edit>
          </q-td>
          <q-td key="last_name" :props="props"  >
            <div class="text-pre-wrap">{{ props.row.last_name }}</div>
             <q-popup-edit v-model="props.row.last_name" title="Update Last Name" buttons>
               <q-input v-model="props.row.last_name" dense autofocus type="text" @change="detect(props.row)"/>
            </q-popup-edit>
          </q-td>
           <q-td key="middle_name" :props="props">
            <div class="text-pre-wrap">{{ props.row.middle_name }}</div>
            <q-popup-edit v-model="props.row.middle_name" title="Update Middle Name" buttons>
               <q-input v-model="props.row.middle_name" dense autofocus type="text" @change="detect(props.row)"/>
            </q-popup-edit>
          </q-td>
          <q-td key="mobile_number" :props="props">
            <div class="text-pre-wrap">{{ props.row.mobile_number }}</div>
          </q-td>
          <q-td key="role" :props="props">
            <div class="text-pre-wrap">{{ props.row.role.name }}</div>
          </q-td>
        </q-tr>
      </template>
        </q-table>
      </q-card>
      <q-dialog v-model="add" persistent transition-show="flip-down" transition-hide="flip-up">
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
            First Name
          </div>
          <div class="text-caption text-bold">
           <q-input v-model="fname"  />
          </div>
          <q-separator/>
            <div class="text-subtitle1">
            Last Name
          </div>
          <div class="text-caption text-bold">
           <q-input v-model="lname" />
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Middle Name
          </div>
          <div class="text-caption text-bold">
           <q-input v-model="mname" />
          </div>
          <q-separator/>
          <div class="text-subtitle1">
            Birthdate
          </div>
          <div class="text-caption text-bold">
           <q-input v-model="birthdate" type = "date" />
          </div>
          <q-separator/>
           <div class="text-subtitle1">
            Mobile Number
          </div>
          <div class="text-caption text-bold">
           <q-input v-model="mobile"  prefix="+63" mask="##########" />
          </div>
          <q-separator/>
             <div class="text-subtitle1">
            Email
          </div>
          <div class="text-caption text-bold">
           <q-input v-model="email" />
          </div>
          <q-separator/>
           <div class="text-subtitle1">
            Password
          </div>
          <div class="text-caption text-bold">
            <q-input v-model="password" type="password" mask="####"/>
          </div>
          <q-separator/>
           <div class="text-subtitle1">
            Role
          </div>
          <div class="text-caption text-bold">
          <q-select
        filled
        v-model="role"
        :options="options"
        flat
        emit-value
        map-options
      />
          </div>
          <q-separator/>
        </q-card-section>
         <q-card-actions align="right">
          <q-btn @click ="add = false"  color="negative" label="Cancel" />
          <q-btn @click ="addAdmin()"  color="info" label = "Add"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      email: null,
      fname: null,
      lname: null,
      mname: null,
      birthdate: null,
      mobile: null,
      password: null,
      role: null,
      add: false,
      filter: '',
      columns: [
        { name: 'first_name', align: 'left', label: 'First Name', field: 'first_name', sortable: true },
        { name: 'last_name', align: 'left', label: 'Last Name', field: 'last_name' },
        { name: 'middle_name', align: 'left', label: 'Middle Name', field: 'middle_name' },
        { name: 'mobile_number', align: 'left', label: 'Mobile Number', field: 'mobile_number' },
        { name: 'role', align: 'left', label: 'Role', field: 'role' }
      ],
      data: [],
      options: [
        {
          label: 'Administrator',
          value: 1
        },
        {
          label: 'Customer Support',
          value: 2
        }
      ]
    }
  },
  methods: {
    addAdmin () {
      this.$axios.post('register/admin',
        {
          email: this.email,
          first_name: this.fname,
          middle_name: this.mname,
          last_name: this.lname,
          mobile_number: '63' + this.mobile,
          birthdate: this.birthdate,
          password: this.password,
          user_role: this.role
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.add = false
        this.getData()
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    getData () {
      this.$axios.get('admins',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.data = response.data.results.admins
      }
      ).catch(error => {
        if (error.response && error.response.statusText) alert(error.response.statusText)
        console.log(error.response)
      })
    },
    detect (item) {
      console.log(item)
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
