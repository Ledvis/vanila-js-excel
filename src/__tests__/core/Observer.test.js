import Observer from '@/core/Observer';

describe('Observer', () => {
  it('should contain event callbacks IF subscribed AND remove event IF unsubscribed', () => {
    const observer = new Observer();
    const mockEventName = 'test';
    const expectedEventCount = 2;

    expect('events' in observer).toEqual(true);
    expect(observer.events).toEqual({});

    const unsubscribe = observer.on(mockEventName, () => ({}));
    observer.on(mockEventName, () => ({}));

    expect(observer.events[mockEventName].length).toEqual(expectedEventCount);

    unsubscribe();

    expect(observer.events[mockEventName].length).toEqual(1);
  });

  it('should contain different events IF subscribed', () => {
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

  it('should invoke all registered event callbacks AND return if event is not registered', () => {
    const mockCb1 = jest.fn();
    const mockCb2 = jest.fn();
    const mockEventName1 = 'test1';
    const mockEventName2 = 'test2';
    const mockArrg = 'hey';
    const observer = new Observer();

    expect(observer.emit(mockEventName1)).toBe(undefined);

    observer.on(mockEventName1, mockCb1);
    observer.on(mockEventName2, mockCb2);

    observer.emit(mockEventName1, mockArrg);

    expect(mockCb1).toHaveBeenCalledWith(mockArrg);
    expect(mockCb2).not.toHaveBeenCalled();

    observer.emit(mockEventName2, mockArrg);

    expect(mockCb2).toHaveBeenCalled();
  });
});
