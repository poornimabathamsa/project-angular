import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloComponentComponent } from './hello-component/hello-component.component';
import { TestingComponent } from './testing/testing.component';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HelloComponentComponent,
    TestingComponent,
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello Poornima';
  date = `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()}`;

  favoriteColorControl = new FormControl('');

  profileForm = new FormGroup({
    // firstName: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  // Store submitted form values
  submittedData = {
    firstName: '',
    lastName: '',
    // add other expected properties
  };
  onSubmit() {
    if (this.profileForm.valid) {
      this.submittedData = this.profileForm.value as { firstName: string; lastName: string };
      const firstName = this.profileForm.value.firstName;
      const lastName = this.profileForm.value.lastName;

      alert(`Submitted Name: ${firstName} ${lastName}`);
    }
  }
}
