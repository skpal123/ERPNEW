import { HrPayrollDefinationModuleModule } from './hr-payroll-defination-module.module';

describe('HrPayrollDefinationModuleModule', () => {
  let hrPayrollDefinationModuleModule: HrPayrollDefinationModuleModule;

  beforeEach(() => {
    hrPayrollDefinationModuleModule = new HrPayrollDefinationModuleModule();
  });

  it('should create an instance', () => {
    expect(hrPayrollDefinationModuleModule).toBeTruthy();
  });
});
