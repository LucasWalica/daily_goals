import { Component } from '@angular/core';
import { NavbarComponent } from "../../reusable/navbar/navbar.component";

@Component({
  selector: 'app-objectives-list',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './objectives-list.component.html',
  styleUrl: './objectives-list.component.css'
})
export class ObjectivesListComponent {

}
