import { action } from '@ember/object';
import { cancel, later } from '@ember/runloop';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'finance-app-revamp/config/environment';

export default class AlertPanelComponent extends Component {
  displayTimer = null;

  levels = {
    error: 'error-state',
    info: 'info-state',
    warning: 'warn-state',
  };

  timeout = 7500;

  @tracked level;

  @tracked levelText = '';

  @tracked message;

  @service alert;

  constructor() {
    super(...arguments);

    // this hooks the component into the service, which is
    // connected to other components and parts of the app
    // that could potentially send alerts to the user
    this._boundDisplayAlert = this.displayAlert.bind(this);
    this.alert.on('alertReceived', this._boundDisplayAlert);
  }

  displayAlert({ level, message }) {
    if (this.displayTimer) {
      cancel(this.displayTimer);
    }

    this.level = this.levels[level];
    this.levelText = level;
    this.message = message;

    // don't auto clear in test env
    if (ENV.environment !== 'test') {
      this.displayTimer = later(() => {
        this.clear();
      }, this.timeout);
    }

    return true;
  }

  @action
  clear() {
    this.level = null;
    this.levelText = '';
    this.message = null;

    if (this.displayTimer) {
      cancel(this.displayTimer);
    }
  }
}
