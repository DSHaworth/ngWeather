import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsriComponent } from './views/esri/esri.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'esri', component: EsriComponent},

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
