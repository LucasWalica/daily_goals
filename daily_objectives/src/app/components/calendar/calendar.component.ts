import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../reusable/navbar/navbar.component";
import { Goal } from '../../models/goal.models';
import { dailyGoalStatus } from '../../models/dailyGoalStatus.model';
import { ObjectivesService } from '../../services/objectives.service';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})

export class CalendarComponent implements OnInit {
  currentYear: number = {} as number;
  currentMonth: number = {} as number;
  calendarDays: any[] = [];

  allStatuses: dailyGoalStatus[] = [];

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private objectiveService:ObjectivesService){

  }

  async ngOnInit() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();

    this.allStatuses = await this.objectiveService.getCalender();
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const startDay = firstDay.getDay();

    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(this.currentYear, this.currentMonth, 0).getDate();

    this.calendarDays = [];

    // Días del mes anterior para completar la primera semana
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(this.currentYear, this.currentMonth - 1, prevMonthDays - i);
      this.calendarDays.push({
        date,
        inCurrentMonth: false,
        goals: this.getGoalsForDate(date),
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      this.calendarDays.push({
        date,
        inCurrentMonth: true,
        goals: this.getGoalsForDate(date),
      });
    }

    // Días del mes siguiente para completar la cuadrícula (hasta 42 días)
    while (this.calendarDays.length < 42) {
      const lastDate = this.calendarDays[this.calendarDays.length - 1].date;
      const date = new Date(lastDate);
      date.setDate(lastDate.getDate() + 1);

      this.calendarDays.push({
        date,
        inCurrentMonth: false,
        goals: this.getGoalsForDate(date),
      });
    }
  }

  getGoalsForDate(date: Date): Array<{ goal: Goal | null, completed: boolean }> {
    const dateStr = this.getDateStringLocal(date);
    return this.allStatuses
      .filter(status => status.date === dateStr)
      .map(status => ({
        goal: status.goal_details ? status.goal_details : null,
        completed: status.completed
      }))
      .filter(item => item.goal !== null);
  }
  

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  getDateStringLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
}
