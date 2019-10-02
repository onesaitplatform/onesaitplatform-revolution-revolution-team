import { TestBed } from '@angular/core/testing';

import { JsonFileManagerService } from './json-file-manager.service';

describe('JsonFileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonFileManagerService = TestBed.get(JsonFileManagerService);
    expect(service).toBeTruthy();
  });
});
