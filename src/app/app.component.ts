import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HelloComponentComponent } from './hello-component/hello-component.component';
import { DemoComponent } from './demo/demo.component';
import { TestingComponent } from './testing/testing.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    HelloComponentComponent,
    TestingComponent,
    DemoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  http = inject(HttpClient);
  userList: any[] = [];
  filterStatus: 'all' | 'yes' | 'no' = 'all';
  searchTerm: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';
  editingId: any;
  editTitle: any;
  editCompleted: any;

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }


  get sortedList(): any[] {
  const listCopy = [...this.filteredList];
  return listCopy.sort((a, b) =>
    this.sortDirection === 'asc' ? a.id - b.id : b.id - a.id
  );
}
   todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    completed: new FormControl(false)
  });


  ngOnInit() {
    this.loadTodos();
  }


  // render the  todos in datas
  loadTodos() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos/')
      .subscribe(data => (this.userList = data));
  }


   // Add new todo to the local list
  addTodo() {
    if (this.todoForm.valid) {
      const newTodo = {
        userId: 1,
        id: this.userList.length + 1,
        ...this.todoForm.value,
        Date :new Date()
      };
      this.userList.push(newTodo);
      this.todoForm.reset({ title: '', completed: false });
    }
  }


   startEdit(user: any) {
    this.editingId = user.id;
    this.editTitle = user.title;
    this.editCompleted = user.completed;
  }

  saveEdit() {
    this.userList = this.userList.map(u =>
      u.id === this.editingId ? { ...u, title: this.editTitle, completed: this.editCompleted } : u
    );
    this.editingId = null;
  }

  // Filtered data based on completion status and title search
  get filteredList(): any[] {
    let filtered = this.userList;

    if (this.filterStatus === 'yes') {
      filtered = filtered.filter(user => user.completed);
    } else if (this.filterStatus === 'no') {
      filtered = filtered.filter(user => !user.completed);
    }

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(user =>
        user.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    

    return filtered;
  }


  deleteTodo(id: number) {
  this.userList = this.userList.filter(user => user.id !== id);
}
}
