
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: 'dashboard', component: () => import('pages/Index.vue') },
      { path: 'product-verification', component: () => import('pages/ProductVerification') },
      { path: 'voucher-purchase', component: () => import('pages/VoucherPurchase') },
      { path: 'cash-out', component: () => import('pages/CashOut') },
      { path: 'account-support', component: () => import('pages/AccountLockSupport') },
      { path: 'merchant-verification', component: () => import('pages/MerchantVerification') },
      { path: 'pending-inquiries', component: () => import('pages/PendingInquiry') },
      { path: 'resolved-inquiries', component: () => import('pages/ResolvedInquiry') },
      { path: 'transaction-history', component: () => import('pages/TransactionHistory') },
      { path: 'merchant', component: () => import('pages/Merchant') },
      { path: 'barangay', component: () => import('pages/Barangay') },
      { path: 'municipality', component: () => import('pages/Municipality') },
      { path: 'product', component: () => import('pages/Product') },
      { path: 'manufacturer', component: () => import('pages/Manufacturer') },
      { path: 'voucher-fees-income', component: () => import('pages/VoucherFeesIncome') },
      { path: 'cashout-fees-income', component: () => import('pages/CashoutFeesIncome') },
      { path: 'digital-raffle', component: () => import('pages/DigitalRaffle') },
      { path: 'new-user', component: () => import('pages/NewUser') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue')
  }
]

export default routes
