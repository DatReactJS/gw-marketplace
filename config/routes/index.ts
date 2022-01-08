export default [
  {
    path: '/',
    component: '@/layouts/MainLayout',
    title: 'index.title',
    routes: [
      {
        exact: true,
        path: '/',
        component: '@/pages/Metrics',
        title: 'navbar.metrics',
        routes: [],
        wrappers: ['@/components/Wrapper'],
      },
      {
        exact: true,
        path: '/marketplace',
        component: '@/pages/Marketplace',
        title: 'navbar.marketplace',
        wrappers: ['@/components/Wrapper'],
      },
      {
        exact: true,
        path: '/login',
        component: '@/pages/Login',
        title: 'navbar.login',
        wrappers: ['@/components/Wrapper'],
      },
      {
        path: '/account',
        component: '@/layouts/MainLayout/MyAccountSider',
        title: 'menu.account',
        routes: [
          {
            path: '/account',
            component: '@/pages/MyAccount/Account',
            title: 'menu.account',
            wrappers: ['@/components/Wrapper'],
          },
          {
            path: '/account/activity',
            component: '@/pages/MyAccount/Activity',
            title: 'menu.activity',
            wrappers: ['@/components/Wrapper'],
          },
          {
            path: '/account/claim-tokens',
            component: '@/pages/MyAccount/ClaimTokens',
            title: 'menu.claimTokens',
            wrappers: ['@/components/Wrapper'],
          },
          {
            path: '/account/inventory',
            component: '@/pages/MyAccount/Inventory',
            title: 'menu.inventory',
            wrappers: ['@/components/Wrapper'],
          },
          {
            path: '/account/settings',
            component: '@/pages/MyAccount/Settings',
            title: 'menu.accountSettings',
            wrappers: ['@/components/Wrapper'],
          },
        ],
        wrappers: ['@/components/Wrapper'],
      },
    ],
  },
];
