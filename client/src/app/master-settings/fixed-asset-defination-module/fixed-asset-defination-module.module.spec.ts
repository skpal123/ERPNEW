import { FixedAssetDefinationModuleModule } from './fixed-asset-defination-module.module';

describe('FixedAssetDefinationModuleModule', () => {
  let fixedAssetDefinationModuleModule: FixedAssetDefinationModuleModule;

  beforeEach(() => {
    fixedAssetDefinationModuleModule = new FixedAssetDefinationModuleModule();
  });

  it('should create an instance', () => {
    expect(fixedAssetDefinationModuleModule).toBeTruthy();
  });
});
