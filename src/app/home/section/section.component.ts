import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.sass']
})
export class SectionComponent implements OnInit {
  @Input() imgSideRight: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
