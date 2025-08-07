import { Component, inject } from '@angular/core';

import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
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
    DemoComponent
  ],
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   http = inject(HttpClient)
  userList: any[] = []

  ngOnInit(): void {
    // debugger;
    this.getUsers()
  }

  getUsers() {
    // debugger;
    this.http.get('https://jsonplaceholder.typicode.com/todos/').subscribe((result: any) => {
      // debugger;
      this.userList = result
    })
  }
}



