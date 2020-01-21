import { InventoryDefinationModuleModule } from './inventory-defination-module.module';

describe('InventoryDefinationModuleModule', () => {
  let inventoryDefinationModuleModule: InventoryDefinationModuleModule;

  beforeEach(() => {
    inventoryDefinationModuleModule = new InventoryDefinationModuleModule();
  });

  it('should create an instance', () => {
    expect(inventoryDefinationModuleModule).toBeTruthy();
  });
});
