import { RoFixedAssestModule } from './ro-fixed-assest.module';

describe('RoFixedAssestModule', () => {
  let roFixedAssestModule: RoFixedAssestModule;

  beforeEach(() => {
    roFixedAssestModule = new RoFixedAssestModule();
  });

  it('should create an instance', () => {
    expect(roFixedAssestModule).toBeTruthy();
  });
});
