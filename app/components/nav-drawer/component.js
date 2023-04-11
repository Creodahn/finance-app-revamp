import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class NavDrawerComponent extends Component {
  @service
  navDrawerManager;

  @service
  session;

  get currentState() {
    return this.navDrawerManager.isOpen ? 'open' : 'closed';
  }

  @action
  signOut(e) {
    e.preventDefault();
    this.session.invalidate();
  }
}
