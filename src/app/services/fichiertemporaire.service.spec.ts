import { TestBed } from '@angular/core/testing';

import { FichiertemporaireService } from './fichiertemporaire.service';

describe('FichiertemporaireService', () => {
  let service: FichiertemporaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichiertemporaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
