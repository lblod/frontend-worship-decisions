import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ImpersonationService extends Service {
  @service store;
  @tracked originalAccount;
  @tracked originalGroup;
  @tracked originalRoles;

  get isImpersonating() {
    return Boolean(this.originalAccount);
  }

  async load() {
    const response = await fetch('/impersonations/current');

    if (response.ok) {
      const result = await response.json();
      const originalAccountId =
        result.data.relationships['original-account'].data.id;

      const originalGroupId =
        result.data.relationships['original-session-group'].data.id;
      const [originalAccount, originalGroup] = await Promise.all([
        this.store.findRecord('account', originalAccountId, {
          include: 'gebruiker',
        }),
        this.store.findRecord('bestuurseenheid', originalGroupId, {
          include: 'classificatie',
          reload: true,
        }),
      ]);

      this.originalAccount = originalAccount;
      this.originalGroup = originalGroup;
      this.originalRoles = result.data.attributes['original-session-roles'];
    }
  }

  async impersonate(accountId) {
    const response = await fetch('/impersonations', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'impersonations',
          relationships: {
            impersonates: {
              data: {
                type: 'accounts',
                id: accountId,
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(
        'An exception occurred while trying to impersonate someone: ' +
          JSON.stringify(result.errors)
      );
    }
  }

  async stopImpersonation() {
    if (this.isImpersonating) {
      const response = await fetch('/impersonations/current', {
        method: 'DELETE',
      });

      if (response.ok) {
        this.originalAccount = null;
        this.originalGroup = null;
        this.originalRoles = [];
      }
    }
  }
}
