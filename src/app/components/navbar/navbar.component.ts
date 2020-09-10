import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/models/nav-item';
import { NavbarService } from 'src/app/services/ui/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menu: NavItem[];

  constructor(
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.menu = this.navbarService.getNavbarMenu();
  }

}
