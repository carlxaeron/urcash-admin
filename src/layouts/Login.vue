<template >
<q-layout view="lHh Lpr lFf" class="myfont " >
  <q-page-container class="bg_image">
 <q-page class= "flex flex-center">
    <div class="q-pa-md" style = "width:100%; max-width:500px;">
      <div class = "row flex flex-center">
        <q-img
          src="../assets/login_logo.png"
          alt="AEX Mobile Logo"
          style="width: 30%"
          class = "align-center"
       />
        </div>
      <h4 class = " text-center">G2GBox ADMINISTRATOR</h4>
  <div class = "row">
      <p style="font-size: 18px;" class="float-left">Mobile Number</p>
  </div>
      <q-input rounded ref = "mobile" :rules="[val => !!val || 'Required']" class="q-mb-lg" outlined v-model="mobile" :dense="dense" bg-color="white" prefix="+63" mask="##########"/>
      <q-btn rounded style="width:100%; font-size: 20px;" @click = "dologin()" :disable="disable" class="q-my-md" color="info" label="LOGIN" text-color="white"/>
      </div>
          <q-dialog v-model="otp_dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter Your One-time Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="otp" autofocus @keyup.enter="verify()" mask = "####" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="RESEND OTP" @click ="resend()"/>
          <q-btn flat label="CONFIRM" @click="verify()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>

import { QSpinnerGears } from 'quasar'
export default {
  name: 'login',
  data () {
    return {
      disable: false,
      mobile: null,
      password: null,
      dense: false,
      server_message: '',
      otp: null,
      otp_dialog: false
    }
  },
  methods: {
    servermsg () {
      this.$q.dialog({
        title: 'Something went wrong.',
        message: this.server_message,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'info',
        backgroundColor: 'white',
        spinnerSize: 140

      })
      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = 0
      }, 1000)
    },
    signup () {
      this.$router.replace('/register')
    },
    check () {
    },
    resend () {
      this.otp_dialog = false
      this.$axios.post('resend-otp', {
        mobile_number: this.$q.localStorage.getItem('mobile').toString()
      }
      ).then(response => {
        this.otp = null
        this.otp_dialog = true
      })
    },
    dologin () {
      this.disable = true
      this.$refs.mobile.validate()
      if (this.$refs.mobile.hasError) {
        this.disable = false
      } else {
        this.showLoading()
        this.$axios.post('login', {
          mobile_number: '63' + this.mobile,
          PS: 'Amping!'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          if (response.data.results === false) {
            this.$q.sessionStorage.set('locked', 'true')
          } else {
            this.$q.localStorage.set('admin-mobile', '63' + this.mobile)
            this.otp_dialog = true
          }
        }
        ).catch(error => {
          this.server_message = error.response.data.message
          this.disable = false
          this.servermsg()
          console.log(error.response)
        })
      }
    },
    verify () {
      this.otp_dialog = false
      this.showLoading()
      this.$axios.post('validate-otp', {
        otp: this.otp,
        mobile_number: '63' + this.mobile
      }
      ).then(response => {
        console.log(response.data)
        this.$q.sessionStorage.set('token', response.data.results.token)
        this.$router.replace('/')
      }
      ).catch(error => {
        this.server_message = error.response.data.message
        this.servermsg()
        console.log(error.response)
        this.otp_dialog = true
      })
    }
  },
  created () {
  }
}
</script>

<style>
  .bg{
    background-color: rgba(0, 0, 0, 0.7);
    }
</style>
