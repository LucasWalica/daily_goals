import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  

  constructor(private router:Router, private authService:AuthService, @Inject(PLATFORM_ID) private platformId: Object){}

  userIsLogged:boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userIsLogged = this.authService.userIsAuthenticated()
      if(!this.userIsLogged){
        this.router.navigate([""])
      }
    }
  }


  goToObjectives(){
    this.router.navigate(["objectives"])
  }

  goToAchievments(){
    this.router.navigate(["achievments"])
  }

  goToCalendar(){
    this.router.navigate(["home"])
  }
}
