import { test as base } from '@playwright/test'

import { createCheckoutActions } from './actions/checkoutActions'
import { createConfiguratorActions } from './actions/configuratorActions'
import { createHomeActions } from './actions/homeActions'
import { createOrderLookupActions } from './actions/orderLookupActions'
import { createSuccessActions } from './actions/successActions'

type App = {
  checkout: ReturnType<typeof createCheckoutActions>
  configurator: ReturnType<typeof createConfiguratorActions>
  home: ReturnType<typeof createHomeActions>
  orderLookup: ReturnType<typeof createOrderLookupActions>
  success: ReturnType<typeof createSuccessActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      checkout: createCheckoutActions(page),
      configurator: createConfiguratorActions(page),
      home: createHomeActions(page),
      orderLookup: createOrderLookupActions(page),
      success: createSuccessActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'