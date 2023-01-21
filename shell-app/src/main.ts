import './style.css'
// import viteLogo from './assets/vite.svg?raw'
// import typescriptLogo from './assets/typescript.svg?raw'
// import {setupCounter} from './counter'
import shellOrchyConfig from './assets/config/shell-orchy-config.json'

import '@orchy-mfe/web-component'

import OrchyMicroFrontend from '@orchy-mfe/spa-adapter'

export class VanillaMfeTypeScript extends OrchyMicroFrontend {
  async mount() {
    this.getContainer().innerHTML = `
    <div class="container">
      <div class="header">
        <div class="logo">orchy-mfe POC</div>
      </div>
      <div class="sidebar">sidebar</div>
      <div class="content">
        <orchy-wc orchy-element configurationName="${shellOrchyConfig}"></orchy-wc>
      </div>
    </div>
    `

    // setupCounter(document.querySelector('#counter') as HTMLButtonElement)
  }

  async unmount() {
    this.getContainer().innerHTML = ''
  }
}

customElements.define('vanilla-mfe-typescript', VanillaMfeTypeScript)