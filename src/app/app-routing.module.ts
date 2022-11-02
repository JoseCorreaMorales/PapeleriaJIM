import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: LoginComponent,  pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'table', component: TableComponent},
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
