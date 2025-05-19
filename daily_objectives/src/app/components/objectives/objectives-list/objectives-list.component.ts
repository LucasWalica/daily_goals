import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { AuthService } from '../../../services/auth.service';
import { ObjectivesService } from '../../../services/objectives.service';
import { Goal } from '../../../models/goal.models';

@Component({
  selector: 'app-objectives-list',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './objectives-list.component.html',
  styleUrl: './objectives-list.component.css'
})
export class ObjectivesListComponent implements OnInit{

  goals:Goal[] = [] as Goal[];
  
  constructor(private auth:AuthService, private objectiveService:ObjectivesService){

  }
  
  async ngOnInit(): Promise<void> {
     this.goals = await this.objectiveService.getUsersGoals();
  }


}