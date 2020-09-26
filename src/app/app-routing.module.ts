import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsriComponent } from './views/esri/esri.component';
import { ForecastComponent } from './views/forecast/forecast.component';
import { HomeComponent } from './views/home/home.component';
import { WeatherComponent } from './views/weather/weather.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'weather', component: WeatherComponent},
  {path: 'esri', component: EsriComponent},
  {path: 'forecast', component: ForecastComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
