import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicroFrontendPropertiesProvider } from '../providers/micro-frontend-properties-provider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: APP_BASE_HREF,
    useFactory: (microFrontendProperties: MicroFrontendPropertiesProvider) => {
      return microFrontendProperties.angularBasePath
    },
    deps: [MicroFrontendPropertiesProvider]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
