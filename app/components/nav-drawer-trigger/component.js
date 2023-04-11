import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HeaderNavDrawerTriggerComponent extends Component {
  @service
  navDrawerManager;

  @action
  toggleDrawerState() {
    this.navDrawerManager.toggleDrawerState();
  }
}
