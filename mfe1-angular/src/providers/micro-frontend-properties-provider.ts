import { Injectable } from "@angular/core";
import {MicroFrontendProperties} from '@orchy-mfe/models';
import {ReplaySubject} from 'rxjs'

export class MicroFrontendPropertiesProvider implements MicroFrontendProperties {
  basePath: string = '/';
  eventBus = new ReplaySubject<unknown>();
  angularBasePath: string = '';
  [x: string]: unknown;

  private constructor() {}
}
