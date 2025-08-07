import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { HelloComponentComponent } from '../hello-component/hello-component.component';
import { DemoComponent } from '../demo/demo.component';
@Component({
  selector: 'app-testing',
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


  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {

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

