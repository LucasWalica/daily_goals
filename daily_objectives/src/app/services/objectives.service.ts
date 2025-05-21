import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Goal } from '../models/goal.models';
import { dailyGoalStatus } from '../models/dailyGoalStatus.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesService {

  constructor(private auth:AuthService) { }

  private baseUrl = "http://localhost:8000/api/objectives/";


  async getUserData() {
    const url = `${this.baseUrl}user/points/`;
    try {
      const token = this.auth.getToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }


  async getCalender(){
    const url = `${this.baseUrl}calendar/`;
    try {
      const token = this.auth.getToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }

  async postDailyGoalStatus(goal:number, date:any, completed:boolean=true){
    const url = `${this.baseUrl}goal/daily/`;
    try {
      const token = this.auth.getToken();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        }, 
        body:JSON.stringify({goal, date, completed})
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }


  async postGoal(goal:Goal){
    const url = `${this.baseUrl}goal/`;
    try {
      const token = this.auth.getToken();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        }, 
        body:JSON.stringify(goal)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }


  async getGoal(id:number){
    const url = `${this.baseUrl}goal/${id}/`;
    try {
      const token = this.auth.getToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }

  async updateGoal(id:number, formData:any){
    const url = `${this.baseUrl}goal/update/${id}/`;
    try {
      const token = this.auth.getToken();
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }

  async deleteGoal(id:number){
    const url = `${this.baseUrl}goal/delete/${id}/`;
    try {
      const token = this.auth.getToken();
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }

  async getUsersGoals(){
    const url = `${this.baseUrl}goal/user/list/`;
    try {
      const token = this.auth.getToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }
  
}
