/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertfyService } from './alertfy.service';

describe('Service: Alertfy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertfyService]
    });
  });

  it('should ...', inject([AlertfyService], (service: AlertfyService) => {
    expect(service).toBeTruthy();
  }));
});
