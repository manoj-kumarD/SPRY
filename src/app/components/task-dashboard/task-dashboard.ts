import { Component } from '@angular/core';
import { TaskSummary } from '../task-summary/task-summary';
import { TaskForm } from '../task-form/task-form';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [TaskSummary, TaskForm, TaskCard],
  template: `
    <div class="dashboard">
      <app-task-summary></app-task-summary>
      <app-task-form #f></app-task-form>
      <app-task-card [onEdit]="f.load.bind(f)"></app-task-card>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 900px; margin: auto; padding: 20px; }
  `]
})
export class TaskDashboard {}
