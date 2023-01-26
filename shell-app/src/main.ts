import './style.css'

import '@orchy-mfe/web-component'

import OrchyMicroFrontend from '@orchy-mfe/spa-adapter'
import MyEventBus from './types/myEventBus'
import {createMenuApi} from 'orchy-menu-plugin/dist'






export class VanillaMfeTypeScript extends OrchyMicroFrontend {
  async mount() {
    
    const eventBus:MyEventBus<unknown> = new MyEventBus<unknown>()
    
     /* Create and subscribe menuApi */
     const menuApi = createMenuApi(eventBus)
    
    
    this.getContainer().innerHTML = `
    <div class="d-flex" id="wrapper">
      <!-- Sidebar-->
      <div class="border-end bg-white" id="sidebar-wrapper">
        <div class="sidebar-heading border-bottom bg-light">orchy-mfe POC</div>
        <div class="list-group list-group-flush" id="menuContainer">
            
          
        </div>
      </div>
      <!-- Page content wrapper-->
      <div id="page-content-wrapper">
        <!-- Top navigation-->
        <nav class="navbar navbar-expand-xl navbar-light bg-light border-bottom">
          <div class="container-fluid">
            <button id="sidebarToggle" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="/angular-mfe">Angular MFE</a></li>
              </ul> 
            </div>
          </div>
        </nav>
        <!-- Page content-->
        <div id="content-container" class="container-fluid">
          
        </div>
      </div>
    </div>
    `
    this.setupTogleSidebar()

    /* Create and mount orchy WebComponent */ 
    const orchyWc = document.createElement('orchy-wc')
    orchyWc.setAttribute('id', 'orchy-wc')
    orchyWc.setAttribute('basePath', '/')
    orchyWc.setAttribute('configurationName', 'shell-orchy-config.json')

    orchyWc.eventBus = eventBus
    document.querySelector('#content-container')?.appendChild(orchyWc)


   /* Menu Plugin */
    menuApi.menuItems$.subscribe(
      {
        next: (menu) => {
          const menuContainer = document.getElementById('menuContainer')
          if(menuContainer){
              menuContainer.innerHTML = ''
              menu.forEach((m) => {
                  const newLink = document.createElement('a')
                  newLink.innerHTML = m.label
                  newLink.href = m.url
                  newLink.className = 'list-group-item list-group-item-action list-group-item-light p-3'
                  document.getElementById('menuContainer')?.appendChild(newLink)
                })
          }
        }
 
      })

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
    eventBus.unsubscribe()
  }
}

customElements.define('vanilla-mfe-typescript', VanillaMfeTypeScript)