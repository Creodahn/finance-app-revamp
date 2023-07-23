import Component from '@glimmer/component';

export default class AccountListComponent extends Component {
  get anyEditedOrPersisted() {
    return this.args.model?.any(
      (account) => account.edited || account.persisted
    );
  }
}
