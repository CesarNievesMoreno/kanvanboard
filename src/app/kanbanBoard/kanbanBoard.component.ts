import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  task: Task;
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [];
    this.in();
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }
  addTask = () =>{
    const ntask = ({...this.task});
    if(!!ntask.name){
      this.tasks.push(ntask);
      this.in();
      this.configureTasksForRendering();
    }
  }
  moveBack = (taskToMove:Task) =>{
    const tasks: Task[] = [...this.tasks];
    const newtask = tasks.find( task => task.name == taskToMove.name);
    if(newtask.stage > 0){
      newtask.stage -=1;
    }
    this.tasks = tasks;
    this.configureTasksForRendering();
  }
  moveForward = (taskToMove:Task) =>{
    const tasks: Task[] = [...this.tasks];
    const newtask = tasks.find( task => task.name == taskToMove.name);
    if(newtask.stage < 3){
      newtask.stage +=1;
    }
    this.tasks = tasks;
    this.configureTasksForRendering();
  }
  deleteTask = (taskToDelete:Task) =>{
    const tasks: Task[] = [...this.tasks];
    const newtasks = tasks.filter(task => task.name !== taskToDelete.name);
    this.tasks = newtasks;
    this.configureTasksForRendering();
  }
  in = () => {
    this.task = {name:"",stage:0};
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}