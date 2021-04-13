import { Component, OnInit } from '@angular/core';
import { FichiertemporaireService } from '../../services/fichiertemporaire.service';
import { UnePhotoTemporaire } from '../../services/requests.model';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { observable, Observable } from 'rxjs';

@Component({
  template: `<label for="NewPhoto" *ngIf="envoiEnCours==false" class="label-file" style="color: chocolate; " id='libellenouvellephoto' >Sélectionner une photo à envoyer </label>
  <input type="file"
          id="NewPhoto"
          #fileInput class="input-file"
          alt="clic"
          accept="image/png, image/jpeg"
          (change)="onFileInput(fileInput.files)"
          style="color:cadetblue;">
  `, styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public envoiEnCours = false;

  errors: string[] = [];
  file: File | null = null;

  constructor(private yvidia: FichiertemporaireService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onFileInput(files: FileList | null): void {

    if (files) {

      const monJson: UnePhotoTemporaire = {
        nomFichier: files[0].name,
        dateCreation: new Date(),
        numeroLicence: 'A00J1D2',
        contenuContentType: 'image/jpeg',
        contenu: '',
        apercu: '',
        uuid: uuidv4()
      };

      const reader = new FileReader();

      reader.onload = (e: any) => {

        const imageSmall = new Image();
        const imageBig = new Image();
        let maphotoBase64 = '';
        let mavignetteBase64 = '';

        imageSmall.src = e.target.result;
        imageSmall.onload = rs => {

          imageBig.src = e.target.result;
          imageBig.onload = rt => {

            maphotoBase64 = this.imageToDataUrl(imageBig, 4000, 3000);
            mavignetteBase64 = this.imageToDataUrl(imageSmall, 800, 600);

            monJson.contenu = maphotoBase64;
            monJson.apercu = mavignetteBase64;

            /*this.yvidia.postFichier(monJson)*/
            this.envoiEnCours = true;
            this.showSnackbar(`Envoi en cours...`, '', 1000);

            // tslint:disable-next-line: deprecation
            this.yvidia.postFichierTemporaire(monJson).subscribe(
              {
                next: ({ error }) => {
                  if (!error) {
                    this.showSnackbar(`Envoi réussi...`, '', 1000);
                  } else {
                    this.errors = error.errors ?? [error.message];
                    this.envoiEnCours = false;
                  }
                },
                error: () => {
                  this.errors = [`Pas de connexion Internet`];
                  this.envoiEnCours = false;
                },

              });

          };
        };
      };

      reader.readAsDataURL(files[0]);
    }



  }

  imageToDataUrl(img: HTMLImageElement, widthImg: number, heightImg: number): string {

    let imageRetour = '';

    const maxWidth = widthImg;
    const maxHeight = heightImg;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    if (width !== img.width || height !== img.height) {
      imageRetour = this.compressImage(img.src, width, height);
    } else {
      imageRetour = img.src;
    }

    imageRetour = imageRetour.split(',')[1];

    return imageRetour;

  }

  base64ToDataUri(base64: any): string {
    return `data:image/jpg;base64,${base64}`;
  }

  compressImage(src: string, newX: number, newY: number): string {

    let imgCompressed = '';

    const img = new Image();
    img.src = src;
    const elem = document.createElement('canvas');
    elem.width = newX;
    elem.height = newY;
    const ctx = elem.getContext('2d');
    if (ctx != null) {
      ctx.drawImage(img, 0, 0, newX, newY);
      elem.addEventListener('load', () => {

      });
      imgCompressed = elem.toDataURL('image/jpeg');


    }

    return imgCompressed;
  }

  showSnackbar(content: string, action: string = '', duree: number = 2000): void {
    const sb = this.snackBar.open(content, action, {
      duration: duree,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right',
      panelClass: ['custom-style']
    });

    const myObservable = sb.afterDismissed();

    // Create observer object
    const myObserver = {
      next: (x: any) => console.log(''),
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => setTimeout(() => {
        this.envoiEnCours = false;
      }, duree + 1000)
    };

    // tslint:disable-next-line: deprecation
    myObservable.subscribe(myObserver);


  }

}
