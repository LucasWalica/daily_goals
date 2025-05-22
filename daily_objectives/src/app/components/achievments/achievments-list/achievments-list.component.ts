import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";
import { Achievment, UserAchievment } from '../../../models/userAchievment.model';
import { AuthService } from '../../../services/auth.service';
import { AchievmentsService } from '../../../services/achievments.service';
import { FooterComponent } from "../../reusable/footer/footer.component";

@Component({
  selector: 'app-achievments-list',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './achievments-list.component.html',
  styleUrl: './achievments-list.component.css'
})
export class AchievmentsListComponent implements OnInit{

  achievments: UserAchievment[] = [] as UserAchievment[];

  constructor(private auth:AuthService, private achievmentService:AchievmentsService){}

  async ngOnInit(): Promise<void> {
    this.achievments = await this.achievmentService.getUserAchievments();
  }
}
