import { TestBed } from '@angular/core/testing';

import { ServerMediatorService } from './server-mediator.service';

describe('ServerMediatorService', () => {
  let service: ServerMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
