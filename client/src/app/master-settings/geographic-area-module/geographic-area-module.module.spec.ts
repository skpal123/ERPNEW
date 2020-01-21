import { GeographicAreaModuleModule } from './geographic-area-module.module';

describe('GeographicAreaModuleModule', () => {
  let geographicAreaModuleModule: GeographicAreaModuleModule;

  beforeEach(() => {
    geographicAreaModuleModule = new GeographicAreaModuleModule();
  });

  it('should create an instance', () => {
    expect(geographicAreaModuleModule).toBeTruthy();
  });
});
