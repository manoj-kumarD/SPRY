import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- FILTER & SORT BAR -->
    <div class="controls">
      <div class="control">
        <label>Status</label>
        <select (change)="filter = $any($event.target).value">
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div class="control">
        <label>Sort by</label>
        <select (change)="order = $any($event.target).value">
          <option value="asc">Due Date ↑</option>
          <option value="desc">Due Date ↓</option>
        </select>
      </div>

      
      <div class="control">
        <label>Order</label>
        <select (change)="order = $any($event.target).value">
          <option value="asc">Ascending ↑</option>
          <option value="desc">Descending ↓</option>
        </select>
      </div>

     <div class="control">
      <label>Sort</label>
      <select (change)="order = $any($event.target).value">
      <option value="asc">A → Z</option>
      <option value="desc">Z → A</option>
      </select>
    </div>

    </div>

    <!-- TASK LIST -->
    <div class="card" *ngFor="let task of visible">
      <div class="head">
        <h3>{{ task.title }}</h3>
        <span class="status" [ngClass]="statusClass(task.status)">
          {{ task.status }}
        </span>
      </div>

      <p>{{ task.description }}</p>

      <div class="foot">
        <small>Due: {{ task.dueDate }}</small>
        <div>
          <button class="edit" (click)="onEdit(task)">Edit</button>
          <button class="delete" (click)="delete(task.id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* CONTROLS BAR */
    .controls {
      display: flex;
      gap: 16px;
      align-items: center;
      background: white;
      padding: 12px 16px;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    }

    .control {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
    }

    .control label {
      font-weight: 600;
      color: #555;
    }

    .control select {
      height: 36px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      min-width: 140px;
    }

    /* TASK CARD */
    .card {
      background: white;
      padding: 16px;
      border-radius: 10px;
      margin-bottom: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,.08);
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }

    .pending { background: #f39c12; }
    .progress { background: #3498db; }
    .completed { background: #2ecc71; }

    .foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    button {
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      color: white;
      cursor: pointer;
    }

    .edit { background: #3498db; margin-right: 6px; }
    .delete { background: #e74c3c; }
  `]
})
export class TaskCard {

  @Input() onEdit!: (task: Task) => void;

  tasks: Task[] = [];
  filter: 'All' | Task['status'] = 'All';
  order: 'asc' | 'desc' = 'asc';

  constructor(private service: TaskService) {
    this.service.tasks$.subscribe(t => this.tasks = t);
  }

  get visible() {
    let list = [...this.tasks];
    if (this.filter !== 'All') {
      list = list.filter(t => t.status === this.filter);
    }
    list.sort((a, b) =>
      
      this.order === 'asc'
        ? a.dueDate.localeCompare(b.dueDate)
        : b.dueDate.localeCompare(a.dueDate)
    );
    return list;
  }

  delete(id: string) {
    this.service.deleteTask(id);
  }

  statusClass(status: Task['status']) {
    return status === 'Pending'
      ? 'pending'
      : status === 'In Progress'
      ? 'progress'
      : 'completed';
  }
}
