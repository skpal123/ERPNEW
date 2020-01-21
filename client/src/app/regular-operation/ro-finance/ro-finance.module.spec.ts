import { RoFinanceModule } from './ro-finance.module';

describe('RoFinanceModule', () => {
  let roFinanceModule: RoFinanceModule;

  beforeEach(() => {
    roFinanceModule = new RoFinanceModule();
  });

  it('should create an instance', () => {
    expect(roFinanceModule).toBeTruthy();
  });
});
