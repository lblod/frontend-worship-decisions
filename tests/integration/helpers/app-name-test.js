import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import config from 'frontend-worship-decisions/config/environment';

module('Integration | Helper | app-name', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns the appName key from the environment config', async function (assert) {
    let currentAppName = config.appName;

    config.appName = 'foo';

    await render(hbs`{{app-name}}`);
    assert.dom().hasText('foo');

    config.appName = currentAppName;
  });
});
