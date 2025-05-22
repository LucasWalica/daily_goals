import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { AuthService } from '../../../services/auth.service';
import { ObjectivesService } from '../../../services/objectives.service';
import { Goal } from '../../../models/goal.models';
import { Router } from '@angular/router';
import { ObjectivesDetailComponent } from "../objectives-detail/objectives-detail.component";
import { CommonModule } from '@angular/common';
import { ObjectiveCreateComponent } from "../objective-create/objective-create.component";
import { FooterComponent } from "../../reusable/footer/footer.component";

@Component({
  selector: 'app-objectives-list',
  standalone: true,
  imports: [NavbarComponent, ObjectivesDetailComponent, CommonModule, ObjectiveCreateComponent, FooterComponent],
  templateUrl: './objectives-list.component.html',
  styleUrl: './objectives-list.component.css'
})
export class ObjectivesListComponent implements OnInit{

  goals:Goal[] = [] as Goal[];
  selectedGoal:Goal = {} as Goal;
  showDetailView:boolean = false;
  showCreateView:boolean =false;
  
  constructor(
    private auth:AuthService, 
    private objectiveService:ObjectivesService, 
    private router:Router){
  }
  
  async ngOnInit(): Promise<void> {
     this.goals = await this.objectiveService.getUsersGoals();
  }

  selectGoal(goal:Goal){
    this.selectedGoal = goal;
    this.showDetailView = !this.showDetailView;
  }


}