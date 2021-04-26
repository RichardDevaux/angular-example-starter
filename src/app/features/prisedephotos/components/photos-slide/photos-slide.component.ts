import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-photos-slide',
  templateUrl: './photos-slide.component.html',
  styleUrls: ['./photos-slide.component.css']
})
export class PhotosSentComponent implements OnInit {

  @Input() photoSentList: string[] = [];

  constructor() { }

  ngOnInit(): void { }

}


