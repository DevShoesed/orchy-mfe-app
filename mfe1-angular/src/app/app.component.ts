import { Component, Inject } from '@angular/core';
import { MicroFrontendPropertiesProvider } from '../providers/micro-frontend-properties-provider';
import { createMenuApi,OrchyMenuApi } from 'orchy-menu-plugin/dist/index';
@Component({
  selector: 'angular-mfe',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orchy-angular-typescript-template';
  orchyMenuApi!:OrchyMenuApi

  constructor(
    @Inject(MicroFrontendPropertiesProvider) private microforntendProperties:MicroFrontendPropertiesProvider
  ) {
    this.orchyMenuApi = createMenuApi(microforntendProperties.eventBus)
  }
  
  ngOnInit() {
    
    this.microforntendProperties.eventBus.next({
      message: 'Angular MFE is loaded'
    })

    this.orchyMenuApi.registerMenu({
      label: 'Dashboard', url: '/angular-mfe/dashboard', name: 'dashboard', microfrontend: 'angular-mfe'
    })

    this.orchyMenuApi.registerMenu({
      label: 'Page 1', url: '/angular-mfe/page1', name: 'page-1', microfrontend: 'angular-mfe'
    })

    
  }

  ngOnDestroy() {
    this.orchyMenuApi.unregisterMenu({label: 'Dashboard', url: '/angular-mfe/dashboard', name: 'dashboard', microfrontend: 'angular-mfe'})
    this.orchyMenuApi.unregisterMenu({label: 'Page 1', url: '/angular-mfe/page1', name: 'page-1', microfrontend: 'angular-mfe'})
    this.microforntendProperties.eventBus.unsubscribe();
  }
  
}
