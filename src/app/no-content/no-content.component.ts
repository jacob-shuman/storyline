import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.sass']
})
export class NoContentComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  @Input() createButtonText: string;
  @Input() createButtonLink: string;
  
  @Input() altButtonText: string;
  @Input() altButtonLink: string;
  
  @Input() imagePath: string;
  @Input() imageTitle: string;
  @Input() imageAlt: string;

  constructor() { }

  ngOnInit() {
  }

}
