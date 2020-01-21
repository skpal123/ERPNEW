import { HrPayrollModule } from './hr-payroll.module';

describe('HrPayrollModule', () => {
  let hrPayrollModule: HrPayrollModule;

  beforeEach(() => {
    hrPayrollModule = new HrPayrollModule();
  });

  it('should create an instance', () => {
    expect(hrPayrollModule).toBeTruthy();
  });
});
