export default {
  events: {},

  // 发布/触发事件
  tigger(eventName: string, ...args: any) {
    const events = this.events as { [eventName: string]: (...args: any[]) => any };
    if (eventName && events[eventName]) {
      events[eventName](...args);
    }
  },

  // 订阅/监听事件
  on(eventName: string, eventHandle: (...args: any[]) => any) {
    Object.assign(this.events, {
      [eventName]: eventHandle
    });
  }
}