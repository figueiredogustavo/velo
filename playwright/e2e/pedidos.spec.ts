import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { OrderLookupPage, OrderDetails } from '../support/pages/OrderLookupPage'
import { Navbar } from '../support/components/Navbar'
import {LandingPage} from '../support/pages/LandingPage'

test.describe('Consulta de Pedido', () => {

  let orderLookupPage: OrderLookupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderLookupLink()
    orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.validatePageLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-A204IM',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Gustavo Figueiredo',
        email: 'gustavo@velo.dev'
      },
      payment: 'À Vista'
    }
    await orderLookupPage.searchOrder(order.number)
    await orderLookupPage.validateOrderDetails(order)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-5B2CAH',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    await orderLookupPage.searchOrder(order.number)
    await orderLookupPage.validateOrderDetails(order)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-B4Z5FQ',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev'
      },
      payment: 'À Vista'
    }
    await orderLookupPage.searchOrder(order.number)
    await orderLookupPage.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    await orderLookupPage.searchOrder(order)

    await orderLookupPage.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {

    const orderNumber = 'CODIGO-INVALIDO'

    await orderLookupPage.searchOrder(orderNumber)

    await orderLookupPage.validateOrderNotFound()
  })
})