import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from 'src/app/views/landing-page/landing-page.component';

import { MaterialModule } from './material-module';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EsriComponent } from './views/esri/esri.component';
import { ForecastComponent } from './views/forecast/forecast.component';
import { DialogForcastDetailComponent } from './dialogs/dialog-forcast-detail/dialog-forcast-detail.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    NavbarComponent,
    EsriComponent,
    ForecastComponent,
    DialogForcastDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, // Allows ngModel
    ReactiveFormsModule, // Allows Form Control,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    //{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
