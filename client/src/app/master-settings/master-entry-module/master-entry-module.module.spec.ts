import { MasterEntryModuleModule } from './master-entry-module.module';

describe('MasterEntryModuleModule', () => {
  let masterEntryModuleModule: MasterEntryModuleModule;

  beforeEach(() => {
    masterEntryModuleModule = new MasterEntryModuleModule();
  });

  it('should create an instance', () => {
    expect(masterEntryModuleModule).toBeTruthy();
  });
});
