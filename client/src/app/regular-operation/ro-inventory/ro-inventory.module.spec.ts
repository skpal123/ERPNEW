import { RoInventoryModule } from './ro-inventory.module';

describe('RoInventoryModule', () => {
  let roInventoryModule: RoInventoryModule;

  beforeEach(() => {
    roInventoryModule = new RoInventoryModule();
  });

  it('should create an instance', () => {
    expect(roInventoryModule).toBeTruthy();
  });
});
