import Service from '@ember/service';

export default class AlertService extends Service {
  events = ['alertReceived'];

  on(eventName, handler) {
    if (this.events.includes(eventName)) {
      this[eventName] = handler;
    } else {
      throw `Undefined alert event ${eventName}`;
    }
  }

  broadcast(alert) {
    this.alertReceived(alert);
  }
}
