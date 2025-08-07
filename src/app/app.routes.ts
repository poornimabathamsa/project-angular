// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponentComponent } from './hello-component/hello-component.component';
import { TestingComponent } from './testing/testing.component';

export const routes: Routes = [
 {
    path: '',
    component: HelloComponentComponent,
    title: 'H Component Us'
  },
  {
    path: 'user',
    component: TestingComponent,
    title: 'Testing Component Us'
  },
  // Add wildcard (catch-all) route at end:
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
