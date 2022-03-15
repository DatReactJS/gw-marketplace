export default [
  {
    path: '/',
    component: '@/layouts/MainLayout',
    title: 'index.title',
    routes: [
      {
        exact: true,
        path: '/',
        component: '@/pages/Home',
        title: 'navbar.home',
        wrappers: ['@/components/Wrapper'],
      },
      // {
      //   exact: true,
      //   path: '/',
      //   component: '@/pages/Marketplace',
      //   title: 'navbar.marketplace',
      //   wrappers: ['@/components/Wrapper'],
      // },
      {
        exact: true,
        path: '/home',
        component: '@/pages/Home',
        title: 'navbar.home',
        wrappers: ['@/components/Wrapper'],
      },
      {
        exact: true,
        path: '/character/:id',
        component: '@/pages/Marketplace/Detail',
        title: 'marketplace.character.detail',
      },
    ],
  },
];
