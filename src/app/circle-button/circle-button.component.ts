import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.css']
})
export class CircleButtonComponent {
  @Input() tooltip: string;
  @Input() containerClass: string;
  @Input() disabled: boolean;
  @Input() icon: string;

  @Input() btnLink: string;

  constructor() { }

}
