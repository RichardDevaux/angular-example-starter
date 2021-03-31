import { Component, OnInit } from '@angular/core';

@Component({
  template: `<label for="NewPhoto" class="label-file" style="color: chocolate; " id='libellenouvellephoto' >Sélectionner une photo à envoyer </label>
  <input type="file"
              id="NewPhoto" class="input-file" name="NewPhoto"
              accept="image/png, image/jpeg"
              alt="clic"
              style="color:cadetblue;">
              `,
  styleUrls: ['./selectionphoto.page.css']
})

// tslint:disable-next-line: component-class-suffix
export class SelectionphotoPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
