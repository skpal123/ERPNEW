import { SupportModuleModule } from './support-module.module';

describe('SupportModuleModule', () => {
  let supportModuleModule: SupportModuleModule;

  beforeEach(() => {
    supportModuleModule = new SupportModuleModule();
  });

  it('should create an instance', () => {
    expect(supportModuleModule).toBeTruthy();
  });
});
