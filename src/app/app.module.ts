import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';

import {ROUTES}                 from './app.routes';

import { AppComponent }         from './app.component';
import { HomeComponent}         from './home/home.component';
import { AboutComponent}        from './about/about.component';



@NgModule({
    declarations:[
        AppComponent, 
        HomeComponent,
        AboutComponent
    ],
    imports:[
        BrowserModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers:[],
    bootstrap:[AppComponent]
})
export class AppModule {}
