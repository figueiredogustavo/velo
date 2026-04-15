import { Page, expect } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
  const getOptionalCheckbox = (name: string) =>
    page.getByRole('checkbox', { name })

  return {
    async open() {
      await page.goto('/configure')
    },

    async selectColor(name: string) {
      await page.getByRole('button', { name }).click()
    },

    async selectWheels(name: string | RegExp) {
      await page.getByRole('button', { name }).click()
    },

    async checkOptional(name: string) {
      await getOptionalCheckbox(name).check()
      await expect(getOptionalCheckbox(name)).toBeChecked()
    },

    async uncheckOptional(name: string) {
      await getOptionalCheckbox(name).uncheck()
      await expect(getOptionalCheckbox(name)).not.toBeChecked()
    },

    async goToCheckout() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
      await expect(page).toHaveURL(/\/order$/)
    },

    async expectPrice(price: string) {
      const priceElement = page.getByTestId('total-price')
      await expect(priceElement).toBeVisible()
      await expect(priceElement).toHaveText(price)
    },

    async expectCarImageSrc(src: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]')
      await expect(carImage).toHaveAttribute('src', src)
    },
  }
}