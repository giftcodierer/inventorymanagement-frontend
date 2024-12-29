import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }