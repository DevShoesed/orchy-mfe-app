import { Component, Inject } from '@angular/core';
import { MicroFrontendPropertiesProvider } from '../providers/micro-frontend-properties-provider';
import {createMenuApi,OrchyMenuApi} from 'orchy-menu-plugin'
import { MenuItem } from 'orchy-menu-plugin/types/models';
@Component({
  selector: 'angular-mfe',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orchy-angular-typescript-template';
  orchyMenuApi!:OrchyMenuApi
  menuItemDashBoard!:MenuItem
  menuItemPage1!:MenuItem

  constructor(
    @Inject(MicroFrontendPropertiesProvider) private microforntendProperties:MicroFrontendPropertiesProvider
  ) {
    this.orchyMenuApi = createMenuApi(microforntendProperties.eventBus)
  }
  
  ngOnInit() {
    this.menuItemDashBoard = {label: 'Dashboard', url: '/angular-mfe/dashboard', name: 'dashboard', microfrontend: 'angular-mfe'}
    this.menuItemPage1 = {label: 'Page 1', url: '/angular-mfe/page1', name: 'page-1', microfrontend: 'angular-mfe'}

    this.microforntendProperties.eventBus.next({
      message: 'Angular MFE is loaded'
    })

    this.orchyMenuApi.registerMenu(this.menuItemDashBoard)
    this.orchyMenuApi.registerMenu(this.menuItemPage1)
    
  }

  ngOnDestroy() {
    
    this.orchyMenuApi.unregisterMenu(this.menuItemDashBoard)
    this.orchyMenuApi.unregisterMenu(this.menuItemPage1)
    this.microforntendProperties.eventBus.unsubscribe();
  }
  
}
