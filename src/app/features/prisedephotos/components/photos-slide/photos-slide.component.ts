import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-photos-slide',
  template: `
  <div>sdgsdfgsfdgsdfg</div>

 <picture *ngif(newphotoSent)>
 <img src="{{ newphotoSent }}" alt="image"/>
 </picture>

  `,
  styleUrls: ['./photos-slide.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosSentComponent implements OnInit {

  @Input() newphotoSent?: string;

  constructor() { }

  ngOnInit(): void { }

}

// <picture *ngFor="let photoSent of photoSentList">
// <img src="{{ photoSent.name }}" alt="image"/>
// </picture>
