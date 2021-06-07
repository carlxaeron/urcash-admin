<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green-2">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer "
        />
  <div>
          <img
        alt="G2GBox logo"
        class="logo"
        src="~assets/logo.png"
        style="width: 400px"
      >
  </div>
      </q-toolbar>
    </q-header>

 <q-drawer
      v-model="drawer"
       show-if-above
      bordered
      content-class="bg-light-blue-6"
    >
        <q-list>
        <q-item-label
          header
          class="fit row inline no-wrap justify-start items-start content-start q-mt-lg q-mr-md"
        >
        <q-avatar size="80px">
          <img
            alt="Profile"
            src="~assets/avatar.png"
          >
        </q-avatar>
        <div class="text-white">
         Hi Hyne
        </div>
        </q-item-label>
        <q-separator dark />
        <q-item class="text-white" to="/dashboard" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          class="text-white"
          icon="input"
          label="Requests"
          expand-icon-class="text-white"
        >
          <q-list class="q-pl-lg">
            <q-item to="/product-verification" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Product Verification</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/voucher-purchase" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Voucher Purchase</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/cash-out" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Cash Outs</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/account-support" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Account Lock Support</q-item-label>
              </q-item-section>
            </q-item><q-item to="/merchant-verification" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Merchant Verification</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          class="text-white"
          icon="important_devices"
          label="Customer Support"
          expand-icon-class="text-white"
        >
          <q-list class="q-pl-lg">
            <q-item to="/pending-inquiries" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Pending</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/resolved-inquiries" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Resolved</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item class="text-white" to="/transaction-history" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="history_edu"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Transaction History</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          class="text-white"
          icon="assessment"
          label="Report Generation"
          expand-icon-class="text-white"
        >
          <q-list class="q-pl-lg">
            <q-item to="/merchant" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">By Merchant</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/barangay" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">By Barangay</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/municipality" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">By City/Municipality</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/product" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">By Product</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/manufacturer" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">By Manufacturer</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          class="text-white"
          icon="assignment"
          label="Income Report"
          expand-icon-class="text-white"
        >
          <q-list class="q-pl-lg">
            <q-item to="/voucher-fees-income" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Voucher Fees Income</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/cashout-fees-income" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">CashOut Fees Income</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item class="text-white" to="/digital-raffle" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="attach_money"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Digital Raffle</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          class="text-white"
          icon="account_circle"
          label="Admin"
          expand-icon-class="text-white"
        >
          <q-list class="q-pl-lg">
            <q-item to="/new-user" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label class="text-white">Admin User</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item class="text-white" to="/logout" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="login"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: false
    }
  }
}
</script>
