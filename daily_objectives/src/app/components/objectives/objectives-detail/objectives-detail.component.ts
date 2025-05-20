import { Component, Input, OnInit } from '@angular/core';
import { Goal } from '../../../models/goal.models';
import { ObjectivesService } from '../../../services/objectives.service';
import { Router } from '@angular/router';
import { ObjectiveUpdateComponent } from "../objective-update/objective-update.component";
import { CommonModule } from '@angular/common';
import { ObjectiveCreateComponent } from "../objective-create/objective-create.component";
import { dailyGoalStatus } from '../../../models/dailyGoalStatus.model';

@Component({
  selector: 'app-objectives-detail',
  standalone: true,
  imports: [ObjectiveUpdateComponent, CommonModule],
  templateUrl: './objectives-detail.component.html',
  styleUrl: './objectives-detail.component.css'
})
export class ObjectivesDetailComponent implements OnInit{
  
  
  @Input() goal:Goal = {} as Goal;
  showDeleteView:boolean = false;
  showUpdateView:boolean = false;

  constructor(private objectiveService:ObjectivesService, private router:Router){}

  ngOnInit(): void {
    
  }


  clear(){
    window.location.reload();
  }


  async confirmDailyTask(){
    let todayStr = new Date().toISOString().split('T')[0];
    await this.objectiveService.postDailyGoalStatus(this.goal.id, todayStr, true);
    window.location.reload();
  }

  async confirmDelete(){
    await this.objectiveService.deleteGoal(this.goal.id);
    window.location.reload();
  }
  cancelDelete(){
    this.showDeleteView=!this.showDeleteView
  }

}
