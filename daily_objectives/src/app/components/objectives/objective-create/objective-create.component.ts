import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObjectivesService } from '../../../services/objectives.service';
import { Goal } from '../../../models/goal.models';

@Component({
  selector: 'app-objective-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './objective-create.component.html',
  styleUrl: './objective-create.component.css'
})
export class ObjectiveCreateComponent {



goalCreateForm!: FormGroup;


 constructor(
    private objectiveService: ObjectivesService,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
      // Esperamos a que goal esté definido
      this.goalCreateForm = this.fb.group({
        //id: [Validators.required],
        //user: [Validators.required],
        title: [null,Validators.required],
        description: [null, Validators.required],
        color: [null, Validators.required],
        start_time: [null],
        end_time: [null]
      });
    }

  cancelCreate(): void {
    window.location.reload();
  }

  confirmCreate(): void {
    console.log(this.goalCreateForm.valid)
    if (this.goalCreateForm.valid) {
      const createdGoal: Goal = this.goalCreateForm.value;
      this.objectiveService.postGoal(createdGoal)
        .then(() => {
          console.log("Goal created successfully");
          window.location.reload();
        })
        .catch(error => {
          console.error("Update failed:", error);
        });
    }
  }

}
