import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.sass']
})
export class CardSectionComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
