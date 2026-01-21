import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCard } from './task-card';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




//  get visible()  {
//     let list = [...this.tasks];
//     if (this.filter !== 'All') {
//       list = list.filter(t => t.status === this.filter);
//     }
//     // list.sort((a, b) =>
    //   this.order === 'asc'
    //     ? a.dueDate.localeCompare(b.dueDate)
    //     : b.dueDate.localeCompare(a.dueDate)


  //   list.sort((a,b)=>{
  //     // let result = 0;
  //   //   if(this.sortBy === 'title'){
  //   //     result = a.title.localeCompare(b.title);
  //   //   } else{
  //   //     result = a.dueDate.localeCompare(b.dueDate);
  //   //   }
  //   // return this.order === 'asc' ? result : -result;

  //   const result = a.title.localeCompare(b.title);
  //   return this.order === 'asc' ? result : -result;
  //   });


  //   return list;
  // }
