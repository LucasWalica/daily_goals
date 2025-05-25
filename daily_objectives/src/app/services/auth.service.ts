import { Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { getMessaging, getToken, Messaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { isSupported } from "firebase/analytics";



@Injectable({
  providedIn: 'root'
})

export class AuthService {


  firebaseConfig = {
    apiKey: "AIzaSyAtWuBiJnkZ0Xuz9YjHKKtjhG5hc881kkU",
    authDomain: "daily-objectives-3e576.firebaseapp.com",
    projectId: "daily-objectives-3e576",
    storageBucket: "daily-objectives-3e576.firebasestorage.app",
    messagingSenderId: "804064260090",
    appId: "1:804064260090:web:d828b016806b4c6292be43",
    measurementId: "G-BQ3RB851ZC"
  };

  app = initializeApp(this.firebaseConfig);
  messaging: Messaging | null = null;
  analytics: any = null;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.messaging = getMessaging(this.app);
      this.initAnalytics();
    }
  }

  async initAnalytics() {
    if (await isSupported()) {
      this.analytics = getAnalytics(this.app);
    }
  }

  private url = "https://dailygoals-production.up.railway.app/api/users/";
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
          await this.postFCMToken();
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
async postFCMToken() {
  if (!isPlatformBrowser(this.platformId)) return;

  const authToken = this.getToken();

  try {
    // 🔧 1. Registrar el Service Worker manualmente
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    
    // ✅ 2. Obtener el token usando ese Service Worker
    if(!this.messaging) return;
    const fcmToken = await getToken(this.messaging, {
      vapidKey: 'BMPEmdIW_vr2mPXavN3r7Ub5bjPR418nBr1utIYke_WguY1Bc5C6bgdzwzTzMMKhty1RLxkT1ngCRCfDT4vhXo4',
      serviceWorkerRegistration: registration,
    });

    if (!fcmToken) {
      console.warn("No se generó el FCM token.");
      return;
    }

    // 📱 3. Obtener info del dispositivo
    const device_name = navigator.userAgent;

    // 🚀 4. Enviar token al backend
    const response = await fetch(`${this.url}user/fcmtoken/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({ token: fcmToken, device_name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    console.log('FCM Token enviado correctamente:', data);
    
  } catch (error) {
    console.error('Error al obtener o enviar el FCM token:', error);
  }
}


  logout(){
    this.token = null;
    localStorage.removeItem('objective_token');
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
