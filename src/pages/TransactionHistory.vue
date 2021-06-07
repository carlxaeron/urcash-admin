<template>
  <q-page class="bg-green-2 myfont">
     <div class="q-pa-md">
      <q-card class="my-card q-pa-md">
        <q-table
            title="Transactions"
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
export default {
  name: 'PageIndex',

  data () {
    return {
      columns: [
        { name: 'date', align: 'left', label: 'Date', field: 'created_at', sortable: true },
        { name: 'full_name', align: 'left', label: 'User', field: 'full_name', sortable: true },
        { name: 'action', align: 'left', label: 'Actions', field: 'action' },
        { name: 'notes', align: 'left', label: 'Notes', field: 'notes' }
      ],
      data: []
    }
  },
  methods: {
    transactions () {
      this.$axios.get('admin/logs',
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
        console.log(error.response)
      })
    }
  },
  created () {
    this.transactions()
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
