import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary">
      <div class="pending">Pending: {{pending}}</div>
      <div class="progress">In Progress: {{progress}}</div>
      <div class="completed">Completed: {{completed}}</div>
    </div>
  `,
  styles: [`
    .summary { display: flex; gap: 10px; margin-bottom: 20px; }
    .summary div {
      flex: 1; padding: 12px; color: white;
      border-radius: 8px; text-align: center; font-weight: bold;
    }
    .pending { background: #f39c12; }
    .progress { background: #3498db; }
    .completed { background: #2ecc71; }
  `]
})
export class TaskSummary {
  pending = 0;
  progress = 0;
  completed = 0;

  constructor(taskService: TaskService) {
    taskService.tasks$.subscribe(tasks => {
      this.pending = tasks.filter(t => t.status === 'Pending').length;
      this.progress = tasks.filter(t => t.status === 'In Progress').length;
      this.completed = tasks.filter(t => t.status === 'Completed').length;
    });
  }
}
