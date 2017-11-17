import { Component, OnInit, NgModule, OnChanges, ViewEncapsulation, Input, Output, EventEmitter, ElementRef, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.template.html',
  styleUrls: ['side-menu.style.scss']
})

export class SideMenuComponent implements OnInit, AfterViewInit {

    @Input() menulist: any;
    @Output() open: EventEmitter<number> = new EventEmitter<number>();
    @Output() close: EventEmitter<number> = new EventEmitter<number>();
    @Output() onItemSelect: EventEmitter<number> = new EventEmitter<number>();

    menuState: boolean;
    private targetElement: any;
    private overlayElem: any;

    constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) {
        this.addOverlayElement();
    }

    ngOnInit() {
       this.menuState = false;
    }

    ngAfterViewInit() {

    }

    menuToggle() {
        this.menuState = !this.menuState;
        this.toggleOverlay();
        if (this.menuState) {
            this.open.emit();
        } else {
            this.close.emit();
        }
    }

    closeMenu() {
        this.menuState = false;
        this.overlayElem.style['opacity'] = 0;
    }

    private onItemClick(item: any) {
        this.onItemSelect.emit(item);
        this.closeMenu();
    }

    private toggleSubMenu(item: any) {
        item.expand = !item.expand;
    }

    private addOverlayElement() {
        this.overlayElem = document.createElement('div');
        this.overlayElem.classList.add('pl-menu-overlay');
        this.overlayElem.style['position'] = 'fixed';
        this.overlayElem.style['background'] = 'rgba(0, 0, 0, 0.7)';
        this.overlayElem.style['top'] = 0;
        this.overlayElem.style['left'] = 0;
        this.overlayElem.style['right'] = 0;
        this.overlayElem.style['bottom'] = 0;
        this.overlayElem.style['opacity'] = 0;
        this.overlayElem.style['pointer-events'] = 'none';
        this.overlayElem.style['transition'] = 'all .2s linear';
        document.getElementsByTagName('body')[0].appendChild(this.overlayElem);
    }

    private toggleOverlay() {
        if (this.overlayElem.style['opacity'] === 0) {
            this.overlayElem.style['opacity'] = 1;
        } else if (this.overlayElem.style['opacity'] === 1) {
            this.overlayElem.style['opacity'] = 0;
        }
    }
 }

@NgModule({
  imports:      [CommonModule],
  declarations: [SideMenuComponent, ClickOutsideDirective],
  exports:      [SideMenuComponent, ClickOutsideDirective]
})
export class SideMenuModule { }
