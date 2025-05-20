import { Component, Input, OnInit } from '@angular/core';
import { Goal } from '../../../models/goal.models';
import { ObjectivesService } from '../../../services/objectives.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-objective-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './objective-update.component.html',
  styleUrl: './objective-update.component.css'
})
export class ObjectiveUpdateComponent implements OnInit  {

  @Input() goal: Goal = {} as Goal;

  goalUpdateForm!: FormGroup;

  constructor(
    private objectiveService: ObjectivesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Esperamos a que goal esté definido
    this.goalUpdateForm = this.fb.group({
      id: [this.goal.id, Validators.required],
      user: [this.goal.user, Validators.required],
      title: [this.goal.title, Validators.required],
      description: [this.goal.description, Validators.required],
      color: [this.goal.color, Validators.required],
      start_time: [this.goal.start_time],
      end_time: [this.goal.end_time]
    });
  }

  cancelUpdate(): void {
    window.location.reload();
  }

  confirmUpdate(): void {
    console.log(this.goalUpdateForm.valid)
    if (this.goalUpdateForm.valid) {
      const updatedGoal: Goal = this.goalUpdateForm.value;
      this.objectiveService.updateGoal(updatedGoal.id, updatedGoal)
        .then(() => {
          console.log("Goal updated successfully");
          window.location.reload();
        })
        .catch(error => {
          console.error("Update failed:", error);
        });
    }
  }
}
