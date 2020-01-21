import { MasterSettingsModule } from './master-settings.module';

describe('MasterSettingsModule', () => {
  let masterSettingsModule: MasterSettingsModule;

  beforeEach(() => {
    masterSettingsModule = new MasterSettingsModule();
  });

  it('should create an instance', () => {
    expect(masterSettingsModule).toBeTruthy();
  });
});
