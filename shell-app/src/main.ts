import './style.css'
// import viteLogo from './assets/vite.svg?raw'
// import typescriptLogo from './assets/typescript.svg?raw'
// import {setupCounter} from './counter'

import '@orchy-mfe/web-component'

import OrchyMicroFrontend from '@orchy-mfe/spa-adapter'

export class VanillaMfeTypeScript extends OrchyMicroFrontend {
  async mount() {
    // mfeProperties.eventBus.subscribe((e) => {
    //   console.log(e)
    // })

    this.getContainer().innerHTML = `
    <div class="d-flex" id="wrapper">
      <!-- Sidebar-->
      <div class="border-end bg-white" id="sidebar-wrapper">
        <div class="sidebar-heading border-bottom bg-light">orchy-mfe POC</div>
        <div class="list-group list-group-flush">
          <a class="list-group-item list-group-item-action list-group-item-light p-3" href="/">Home</a>
          <a class="list-group-item list-group-item-action list-group-item-light p-3" href="/angular-mfe">Angular</a>
        </div>
      </div>
      <!-- Page content wrapper-->
      <div id="page-content-wrapper">
        <!-- Top navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div class="container-fluid">
            <button class="btn btn-primary" id="sidebarToggle">Toggle Menu</button>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">

            </div>
          </div>
        </nav>
        <!-- Page content-->
        <div class="container-fluid">
          <orchy-wc basePath="/" configurationName="shell-orchy-config.json"></orchy-wc>    
        </div>
      </div>
    </div>
    `
    this.setupTogleSidebar()
    // setupCounter(document.querySelector('#counter') as HTMLButtonElement)
  }

  setupTogleSidebar() {
    const sidebarToggle = document.body.querySelector('#sidebarToggle')

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', event => {
        event.preventDefault()
        document.body.classList.toggle('sb-sidenav-toggled')
        localStorage.setItem('sb|sidebar-toggle', (document.body.classList.contains('sb-sidenav-toggled')).toString())
    })
    }
  }
  
  async unmount() {
    this.getContainer().innerHTML = ''
  }
}

customElements.define('vanilla-mfe-typescript', VanillaMfeTypeScript)