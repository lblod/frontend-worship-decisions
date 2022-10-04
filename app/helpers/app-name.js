import { helper } from '@ember/component/helper';
import config from 'frontend-worship-decisions/config/environment';

export default helper(function appName() {
  return config.appName;
});
