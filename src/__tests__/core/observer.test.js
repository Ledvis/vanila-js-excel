import Observer from 'src/core/Observer';

describe('Observer', () => {
  test('should contain events IF subscribed', () => {
    const observer = new Observer();
    const mockEventName = 'test';
    const expectedEventCount = 2;

    observer.on(mockEventName, () => ({}));
    observer.on(mockEventName, () => ({}));
    expect(observer.events[mockEventName].length).toEqual(expectedEventCount);
  });

  test('should contain different events IF subscribed', () => {
    const observer = new Observer();
    const mockFirstEventName = 'test1';
    const mockSecondEventName = 'test2';
    const expectedFirstEventCount = 1;
    const expectedSecondEventCount = 1;

    observer.on(mockFirstEventName, () => ({}));
    observer.on(mockSecondEventName, () => ({}));
    expect(observer.events[mockFirstEventName].length).toEqual(expectedFirstEventCount);
    expect(observer.events[mockFirstEventName].length).toEqual(expectedSecondEventCount);
  });
});
