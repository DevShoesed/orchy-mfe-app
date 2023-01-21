import { Component, Inject } from '@angular/core';
import { MicroFrontendPropertiesProvider } from '../providers/micro-frontend-properties-provider';

@Component({
  selector: 'angular-mfe',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orchy-angular-typescript-template';

  constructor(
    @Inject(MicroFrontendPropertiesProvider) private microforntendProperties:MicroFrontendPropertiesProvider
  ) {
    // this.microforntendProperties.eventBus.subscribe((e) => {
    //   console.log(e);
    // })
  }
  
  ngOnInit() {
    this.microforntendProperties.eventBus.next({
      type: 'menuInject',
      data: [
        {name: 'Dashboard', url: '/angular-mfe/dashboard'}
      ]
    })
  }

  ngOnDestroy() {
    this.microforntendProperties.eventBus.unsubscribe();
  }
  
}
