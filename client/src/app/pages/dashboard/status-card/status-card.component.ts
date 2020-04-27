import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card  [ngClass]="{'off': !on}">
      <div class="icon-container" (click)="onClick()" >
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
        <button class="update-button" nbButton ghost status="primary" (click)="onEditClick()"><nb-icon icon="edit"></nb-icon></button>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter(this.on);
  @Output() edit: EventEmitter<boolean> = new EventEmitter(this.on);

  onClick(){
    this.toggle.emit(this.on)
  }

  onEditClick(){
    this.edit.emit(this.on)
  }
}
