import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
 template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">

      <div class="field">
        <input placeholder="Title" formControlName="title" />
        <small class="error"
          *ngIf="form.controls.title.touched && form.controls.title.invalid">
          Title is required
        </small>
      </div>

      <div class="field">
        <input placeholder="Description" formControlName="description" />
      </div>

      <div class="field">
        <input type="date" formControlName="dueDate" />
        <small class="error"
          *ngIf="form.controls.dueDate.touched && form.controls.dueDate.invalid">
          Due date is required
        </small>
      </div>

      <div class="field">
        <select formControlName="status">
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        class="add-btn"
        [disabled]="form.invalid">
        {{ editId ? 'Update Task' : 'Add Task' }}
      </button>

    </form>
  `,
  styles: [`
    .form {
      display: flex;
      align-items: flex-end;
      gap: 12px;
      background: #ffffff;
      padding: 14px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      flex-wrap: nowrap;
    }

    .field {
      display: flex;
      flex-direction: column;
      flex: 1 1 0;            /* 🔑 allow inputs to shrink */
      min-width: 0;           /* 🔑 critical for flex shrink */
    }

    input, select {
      height: 38px;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 14px;
      width: 100%;            /* 🔑 fill available space */
    }

    .error {
      font-size: 12px;
      color: #e74c3c;
      margin-top: 4px;
    }

    .add-btn {
      height: 38px;
      padding: 0 18px;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;         /* 🔑 button never shrinks */
    }

    .add-btn:disabled {
      background: #b7e1c2;
      cursor: not-allowed;
    }

    /* 📱 Responsive safety */
    @media (max-width: 900px) {
      .form {
        flex-wrap: wrap;
      }

      .add-btn {
        width: 100%;
      }
    }

  `]

})
export class TaskForm {

  form;                 // 👈 declare only
  editId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    // 👇 initialize INSIDE constructor
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['Pending'],
      dueDate: ['', Validators.required]
    });
  }

  load(task: Task) {
    this.editId = task.id;
    this.form.patchValue(task);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // 👈 IMPORTANT
      return;
    }

    const task: Task = {
      id: this.editId ?? Date.now().toString(),
      title: this.form.value.title!,
      description: this.form.value.description || '',
      status: this.form.value.status as Task['status'],
      dueDate: this.form.value.dueDate!
    };

    this.editId
      ? this.taskService.updateTask(task)
      : this.taskService.addTask(task);

    this.form.reset({ status: 'Pending' });
    this.editId = null;
  }

}
