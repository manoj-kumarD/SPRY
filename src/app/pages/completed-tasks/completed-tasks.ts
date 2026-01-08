import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Completed Tasks</h2>
    <div *ngFor="let task of tasks">
      {{task.title}} - {{task.dueDate}}
    </div>
  `
})
export class CompletedTasks {

  tasks: any[] = [];

  constructor(taskService: TaskService) {
    taskService.tasks$.subscribe(t =>
      this.tasks = t.filter(x => x.status === 'Completed')
    );
  }
}
