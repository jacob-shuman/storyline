import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-element-card',
  templateUrl: './element-card.component.html',
  styleUrls: ['./element-card.component.css']
})
export class ElementCardComponent {
  @Input() containerClass: string;
  @Input() element: { id: string, name: string, description: string };
  @Input() type: 'character' | 'group' | 'object' | 'place' | 'event' | 'none';

  @Input() btnClass: string;
  @Input() btnClick: () => any = () => { };

  constructor() { }

}
