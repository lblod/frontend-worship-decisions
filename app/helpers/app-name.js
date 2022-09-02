import { helper } from '@ember/component/helper';
import config from 'frontend-public-decisions/config/environment';

export default helper(function appName() {
  return config.appName;
});
