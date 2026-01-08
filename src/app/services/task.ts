import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private subject = new BehaviorSubject<Task[]>(this.load());
  tasks$ = this.subject.asObservable();

  addTask(task: Task) {
    this.update([...this.subject.value, task]);
  }

  updateTask(task: Task) {
    this.update(this.subject.value.map(t => t.id === task.id ? task : t));
  }

  deleteTask(id: string) {
    this.update(this.subject.value.filter(t => t.id !== id));
  }

  private update(tasks: Task[]) {
    this.subject.next(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  private load(): Task[] {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }
}
