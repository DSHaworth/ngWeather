import { Injectable } from '@angular/core';
import { NavItem } from 'src/app/models/nav-item';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  menu: NavItem[] = [
    {
      displayName: 'Home',
      iconName: 'fas fa-angle-right',
      route: '/home',
    },
    {
      displayName: 'About',
      iconName: 'fas fa-angle-right',
      route: '/about',
    }
  ];

  getNavbarMenu(): NavItem[] {
    return this.menu;
  }
}
