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
        ...this.todoForm.value
      };
      this.userList.push(newTodo);
      this.todoForm.reset({ title: '', completed: false });
    }
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
}
