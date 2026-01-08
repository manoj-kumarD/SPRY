import { Routes } from '@angular/router';
import { TaskDashboard } from './components/task-dashboard/task-dashboard';
import { CompletedTasks } from './pages/completed-tasks/completed-tasks';

export const routes: Routes = [
  { path: '', component: TaskDashboard },
  { path: 'completed', component: CompletedTasks }
];
