import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { CoreService } from 'src/app/services/core.service';
import { AppSettings } from 'src/app/app.config';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { navItems } from './vertical/sidebar/sidebar-data';
import { NavService } from '../../services/nav.service';
import { AppNavItemComponent } from './vertical/sidebar/nav-item/nav-item.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './vertical/sidebar/sidebar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HeaderComponent } from './vertical/header/header.component';
import { AppHorizontalHeaderComponent } from './horizontal/header/header.component';
import { AppHorizontalSidebarComponent } from './horizontal/sidebar/sidebar.component';
import { AppBreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { CustomizerComponent } from './shared/customizer/customizer.component';
import { AuthService } from 'src/app/services/auth.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

// for mobile app sidebar
interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}


interface quicklinks {
  id: number;
  title: string;
  link: string;
}

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    RouterModule,
    AppNavItemComponent,
    MaterialModule,
    CommonModule,
    SidebarComponent,
    NgScrollbarModule,
    TablerIconsModule,
    HeaderComponent,
    AppHorizontalHeaderComponent,
    AppHorizontalSidebarComponent,
    AppBreadcrumbComponent,
    CustomizerComponent
  ],
  templateUrl: './full.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class FullComponent implements OnInit {

  navItems = navItems;
  

  

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  resView = false;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;
  //get options from service
  options = this.settings.getOptions();
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  get isTablet(): boolean {
    return this.resView;
  }

  // for mobile app sidebar
  apps: apps[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-dd-chat.svg',
      title: 'Chat Application',
      subtitle: 'Messages & Emails',
      link: '/apps/chat',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-dd-cart.svg',
      title: 'eCommerce App',
      subtitle: 'Buy a Product',
      link: '/apps/email/inbox',
    },
    {
      id: 3,
      img: '/assets/images/svgs/icon-dd-invoice.svg',
      title: 'Invoice App',
      subtitle: 'Get latest invoice',
      link: '/apps/invoice',
    },
    {
      id: 4,
      img: '/assets/images/svgs/icon-dd-date.svg',
      title: 'Calendar App',
      subtitle: 'Get Dates',
      link: '/apps/calendar',
    },
    {
      id: 5,
      img: '/assets/images/svgs/icon-dd-mobile.svg',
      title: 'Contact Application',
      subtitle: '2 Unsaved Contacts',
      link: '/apps/contacts',
    },
    {
      id: 6,
      img: '/assets/images/svgs/icon-dd-lifebuoy.svg',
      title: 'Tickets App',
      subtitle: 'Create new ticket',
      link: '/apps/tickets',
    },
    {
      id: 7,
      img: '/assets/images/svgs/icon-dd-message-box.svg',
      title: 'Email App',
      subtitle: 'Get new emails',
      link: '/apps/email/inbox',
    },
    {
      id: 8,
      img: '/assets/images/svgs/icon-dd-application.svg',
      title: 'Courses',
      subtitle: 'Create new course',
      link: '/apps/courses',
    },
  ];

  quicklinks: quicklinks[] = [
    {
      id: 1,
      title: 'Pricing Page',
      link: '/theme-pages/pricing',
    },
    {
      id: 2,
      title: 'Authentication Design',
      link: '/authentication/side-login',
    },
    {
      id: 3,
      title: 'Register Now',
      link: '/authentication/side-register',
    },
    {
      id: 4,
      title: '404 Error Page',
      link: '/authentication/error',
    },
    {
      id: 5,
      title: 'Notes App',
      link: '/apps/notes',
    },
    {
      id: 6,
      title: 'Employee App',
      link: '/apps/employee',
    },
    {
      id: 7,
      title: 'Todo Application',
      link: '/apps/todo',
    },
    {
      id: 8,
      title: 'Treeview',
      link: '/theme-pages/treeview',
    },
  ];

  constructor(private settings: CoreService,private mediaMatcher: MediaMatcher,private router: Router,private breakpointObserver: BreakpointObserver,private navService: NavService,private _AuthService : AuthService
  ) {
    this.htmlElement = document.querySelector('html')!;
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;
        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
        if (this.options.sidenavCollapsed == false) {
          this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
        }
        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        this.resView = state.breakpoints[BELOWMONITOR];
      });

    // Initialize project theme with options
    this.receiveOptions(this.options);

    // This is for scroll to top
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        this.content.scrollTo({ top: 0 });
      });
  }

  LoginUserName    : any;
  LoginUserId      : any;
  LoginUserEmail   : any;
  LoginUserDesignation : any;
  public currentUser: any;
  role: any;
  
  
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.currentUser) {
      this.LoginUserId  = this.currentUser.client_user_id;
      this.LoginUserName  = this.currentUser.client_user_name;
      this.LoginUserEmail  = this.currentUser.client_user_email;
      this.LoginUserDesignation  = this.currentUser.client_user_designation;
      // this.LoginUserRole = this.currentUser.role_id;
      // if (this.LoginUserRole == 1 || this.LoginUserRole === 1) {
        this.navItems = [
          { navCap: 'Home' },
          {
            displayName: 'Dashboard',
            iconName: 'aperture',
            route: '/dashboards/dashboard1',
          },
          {
            navCap: 'Leads Management',
          },
          {
            displayName: 'Leads Management',
            iconName: 'apps',
            route: 'leads',
            children: [
              {
                displayName: 'Add-Lead',
                iconName: 'point',
                route: 'leads/create-lead',
              },
              {
                displayName: 'New-Leads',
                iconName: 'point',
                route: 'leads/assign-lead',
              },
              {
                displayName: 'Re-Assign',
                iconName: 'point',
                route: 'leads/re-assign',
              },
              {
                displayName: 'All-Leads',
                iconName: 'point',
                route: 'leads/my-lead',
              },
            ],
          },
          {
            navCap: 'Import Excel',
          },
          {
            displayName: 'Leads From Excel',
            iconName: 'apps',
            route: 'excel',
            children: [
              {
                displayName: 'Import File',
                iconName: 'point',
                route: 'excel/import-excel',
              },
            ],
          },

          {
            navCap: 'Sale-PipeLine',
          },
          {
            displayName: 'Sale-PipeLine',
            iconName: 'apps',
            route: 'excel',
            children: [
              {
                displayName: 'Genrate Sale Offer',
                iconName: 'point',
                route: 'sale/sale-offer',
              },
              {
                displayName: 'Create Pdf',
                iconName: 'point',
                route: 'sale/list-sale-offer',
              },
            ],
          },

          {
            navCap: 'Account Setting',
          },
          {
            displayName: 'Account Setting',
            iconName: 'apps',
            route: 'theme-pages',
            children: [
              {
                displayName: 'Profile',
                iconName: 'point',
                route: 'theme-pages/account-setting',
              },
            ],
          },

          {
            navCap: 'Team Management',
          },
          {
            displayName: 'Manage Team',
            iconName: 'apps',
            route: 'users',
            children: [
              {
                displayName: 'Add-User',
                iconName: 'point',
                route: 'users/create-user',
              },

              {
                displayName: 'User-List',
                iconName: 'point',
                route: 'users/user-list',
              },
              {
                displayName: 'Add-Role',
                iconName: 'point',
                route: 'users/create-role',
              },
              {
                displayName: 'Assign Permission',
                iconName: 'point',
                route: 'users/assign-permission',
              },
            ],
          },
          // {
          //   navCap: 'Teams',
          // },
          // {
          //   displayName: 'Team',
          //   iconName: 'apps',
          //   route: 'team',
          //   children: [
          //     {
          //       displayName: 'Add Team',
          //       iconName: 'point',
          //       route: 'team/create-team',
          //     },
          //   ],
          // },
        ];


      // } else if (this.LoginUserRole == 2 || this.LoginUserRole === 2) {
        // this.navItems = [
        //   {
        //     displayName: 'Dashboard',
        //     iconName: 'aperture',
        //     route: '/dashboards/dashboard1',
        //   },
        //   {
        //     navCap: 'Leads Management',
        //   },

        //   {
        //     displayName: 'Leads Management',
        //     iconName: 'apps',
        //     route: 'theme-pages',
        //     children: [
        //       {
        //         displayName: 'My Leads', 
        //         iconName: 'point',
        //         route: 'leads/my-lead',
        //       },
        //     ],
        //   },

        //   {
        //     navCap: 'Account Setting',
        //   },
        //   {
        //     displayName: 'Account Setting',
        //     iconName: 'apps',
        //     route: 'theme-pages',
        //     children: [
        //       {
        //         displayName: 'Profile', 
        //         iconName: 'point',
        //         route: 'theme-pages/account-setting',
        //       },
        //     ],
        //   },

        // ];
      // }
    }
  }
  

  logout(e:Event){
    e.preventDefault();
    if(this.LoginUserId){
      var fd = new FormData();
      fd.append('login_user_id',this.LoginUserId);
      this._AuthService.logoutFunction(fd).subscribe((res:any) => {
        console.log(res);
      })
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('userData');
      if (!localStorage.getItem('isLoggedin')) {
        this.router.navigate(['/authentication/side-login']);
      }
    }
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }
  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }
}
