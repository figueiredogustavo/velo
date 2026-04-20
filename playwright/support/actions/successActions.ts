import { Page, expect } from '@playwright/test'

export function createSuccessActions(page: Page) {
  return {
    async expectStatus(title: RegExp | string) {
      await expect(page).toHaveURL(/\/success/)
      await expect(page.getByRole('heading', { name: title })).toBeVisible()
    }
  }
}
