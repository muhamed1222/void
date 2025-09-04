describe('Smoke Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should have Today screen', async () => {
    await expect(element(by.text('Сегодня'))).toBeVisible();
  });
  
  it('should navigate to Diagnostics screen', async () => {
    await element(by.text('Diagnostics')).tap();
    await expect(element(by.text('Диагностика'))).toBeVisible();
  });
  
  it('should navigate to Console screen', async () => {
    await element(by.text('Console')).tap();
    await expect(element(by.text('Консоль'))).toBeVisible();
  });
});