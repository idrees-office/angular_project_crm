import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'aperture',
    route: '/dashboards/dashboard1',
    role: 1
  },
  // {
  //   displayName: 'Dashboard2',
  //   iconName: 'shopping-cart',
  //   route: '/dashboards/dashboard2',
  // },

  {
    navCap: 'Leads Managements',
  },
  {
    displayName: 'Leads Managements',
    iconName: 'apps',
    route: 'leads',
    children: [
      {
        displayName: 'Add New Lead',
        iconName: 'point',
        route: 'leads/create-lead',
      },

      {
        displayName: 'Assign Leads',
        iconName: 'point',
        route: '/dashboards/dashboard2',
      },


      {
        displayName: 'Re-Assign',
        iconName: 'point',
        route: 'leads/re-assign',
      },



    ],
    role:2
  },

   
  // {
  //   displayName: 'Blog',
  //   iconName: 'point',
  //   route: 'apps/blog',
  //   children: [
  //     {
  //       displayName: 'Post',
  //       iconName: 'point',
  //       route: 'apps/blog/post',
  //     },
  //     {
  //       displayName: 'Detail',
  //       iconName: 'point',
  //       route: 'apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
  //     },
  //   ],
  // },


  // {
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'login',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Side Login',
  //       iconName: 'point',
  //       route: '/authentication/side-login',
  //     },
  //     {
  //       displayName: 'Boxed Login',
  //       iconName: 'point',
  //       route: '/authentication/boxed-login',
  //     },
  //   ],
  // },
];
