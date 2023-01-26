import {BehaviorSubject, Observable, ReplaySubject, shareReplay} from 'rxjs'
import {MenuItem, MyEvent} from '../types'

export class OrchyMenuApi {
    readonly  REGISTER_MENU_EVENT_LABEL = 'registerMenu'
    readonly  UNREGISTER_MENU_EVENT_LABEL = 'unregisterMenu'
    
    private menuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([])
    private _eventBus?:ReplaySubject<MyEvent>
    

    menuItems$ :Observable<MenuItem[]> = this.menuItems.asObservable().pipe(shareReplay(1))

    constructor(eventBus:ReplaySubject<MyEvent>){
        this._eventBus = eventBus
        
        this._eventBus.subscribe((event) => {
            if(event.label == this.REGISTER_MENU_EVENT_LABEL ) {
                this.registerMenuAction(event.payload)
            }
            if(event.label == this.UNREGISTER_MENU_EVENT_LABEL ) {
                this.unregisterMenuAction(event.payload)
            }
        })
    }

    get currentMenuItems(): MenuItem[] {
        return this.menuItems.getValue()
    }

    
    registerMenu(menuItem:MenuItem) {
        this._eventBus?.next({
            label: this.REGISTER_MENU_EVENT_LABEL,
            payload: {...menuItem}
        })
    }
    
    unregisterMenu(menuItem:MenuItem) {
        this._eventBus?.next({
            label: this.UNREGISTER_MENU_EVENT_LABEL,
            payload: menuItem
        })
    }

    private registerMenuAction(menuItem:MenuItem) {
        this.menuItems.next([...this.currentMenuItems, menuItem])

    }
    private unregisterMenuAction(menuItem:MenuItem) {
        this.menuItems.next(
            this.currentMenuItems.filter( m => m.microfrontend !== menuItem.microfrontend || m.name != menuItem.name)
        )
    }
    
}

export function createMenuApi(eventBus:ReplaySubject<MyEvent>) {
    return new OrchyMenuApi(eventBus)
}

