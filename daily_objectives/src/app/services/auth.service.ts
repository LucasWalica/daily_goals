import { Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class AuthService {



  constructor(private router:Router, @Inject(PLATFORM_ID) private platformId: Object){}

  private url = "http://localhost:8000/api/users/";
  private token:string|null = {} as string;

  register(username:string,email:string, password:string){
    
    const datosUser=JSON.stringify({
      username:username,
      password:password,
      email:email
    });
    console.log(datosUser)
    fetch(`${this.url}register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: datosUser
    })
      .then(response => {
        console.log('Response:', response);
        if (response.ok) {
          return response.json(); 
        } else {
          return response.json().then(errorData => {
            throw new Error(JSON.stringify(errorData)); 
          });
        }
      })
      .then(data => {
        console.log('Data:', data);
        this.router.navigate(['']);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
  }

  async login(email: string, password: string): Promise<number> {
    const datosUser = JSON.stringify({ email, password });
    console.log(datosUser);
  
    try {
      const response = await fetch(`${this.url}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: datosUser
      });
  
      const responseBody = await response.json();
  
      if (response.ok) {
        if (responseBody.token) {
          console.log(responseBody.token);
          this.setToken(responseBody.token);
        }
        
        this.router.navigate(['home']);
        return 1; // Éxito
      } else {
        console.error("Login fallido:", responseBody);
        return 0; // Error
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return 0; // Error
    }
  }

  // need to generate token and get device_name
  async postFCMToken(token:any, device_name:any){
    fetch(`${this.url}user/fcmtoken/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, device_name})
    })
      .then(response => {
        console.log('Response:', response);
        if (response.ok) {
          return response.json(); 
        } else {
          return response.json().then(errorData => {
            throw new Error(JSON.stringify(errorData)); 
          });
        }
      })
      .then(data => {
        console.log('Data:', data);
        this.router.navigate(['']);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  logout(){
    this.token = null;
    localStorage.removeItem('objective_token');
    localStorage.removeItem('username');
    localStorage.removeItem('inquilino_id');
    this.router.navigate(['']);
  }


  setToken(token:string){
    this.token = token;
    localStorage.setItem('objective_token', token);
  }

  getToken(){
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('objective_token');
      return this.token;
    }
    return null;
  }



  userIsAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

}
