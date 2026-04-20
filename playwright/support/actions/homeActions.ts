import { Page } from '@playwright/test'

export function createHomeActions(page: Page) {
  return {
    async openConfigurator() {
      await page.goto('/')
      await page.getByRole('link', { name: /Configure Agora/i }).click()
    }
  }
}
