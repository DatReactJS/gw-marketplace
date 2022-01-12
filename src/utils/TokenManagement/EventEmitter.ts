export default class EventEmitter {
  events: any;
  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName: string | number) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName: string | number, fn: (...args: any[]) => void) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName: string | number, fn: (...args: any[]) => void) {
    const onceFn = (...args: any[]) => {
      this.removeListener(eventName, onceFn);
      fn.apply(this, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName: string | number, ...args: any[]) {
    this._getEventListByName(eventName).forEach(
      (fn: (...args: any[]) => void) => {
        fn.apply(this, args);
      },
    );
  }

  removeListener(eventName: string | number, fn: (...args: any[]) => void) {
    this._getEventListByName(eventName).delete(fn);
  }
}
