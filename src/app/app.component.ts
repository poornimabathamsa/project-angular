import { Component, inject } from '@angular/core';

import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
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
    RouterOutlet,
    RouterLink,
    HelloComponentComponent,
    TestingComponent, // if you need to route to it,
    DemoComponent,FormsModule
  ],
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   http = inject(HttpClient)
  userList: any[] = []
  filterStatus: 'all' | 'yes' | 'no' = 'all';


   ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos/')
      .subscribe(data => (this.userList = data));
  }
 
 // Returns filtered list based on completion status
  get filteredList(): any[] {
    if (this.filterStatus === 'yes') {
      return this.userList.filter(user => user.completed);
    } else if (this.filterStatus === 'no') {
      return this.userList.filter(user => !user.completed);
    }
    return this.userList;
  }
}



