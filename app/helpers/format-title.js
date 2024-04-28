import { dasherize } from '@ember/string';
import { helper } from '@ember/component/helper';

export default helper(function formatTitle([title]) {
  return dasherize(title).replace(/-/g, ' ');
});
