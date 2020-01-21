import { TestBed, inject } from '@angular/core/testing';

import { NavigationDataProiderService } from './navigation-data-proider.service';

describe('NavigationDataProiderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationDataProiderService]
    });
  });

  it('should be created', inject([NavigationDataProiderService], (service: NavigationDataProiderService) => {
    expect(service).toBeTruthy();
  }));
});
