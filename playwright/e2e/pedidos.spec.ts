import { test, expect } from '@playwright/test'

// AAA - Arrange, Act, Assert

test('Deve consultar um pedido aprovado', async ({ page }) => {
  const orderID = 'VLO-A204IM'
  
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByTestId('search-order-id').fill(orderID)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  // Aqui eu pensei em localizar o paragráfo com o texto igual a Pedido e então achar o próximo paragráfo após isso. 
  // Com isso, eu tenho acesso ao número do pedido que é mostrado na tela e consigo validar se é o pedido que eu fiz a pesquisa.
  const orderNum = page.locator("//p[text()='Pedido']/following-sibling::p")
  await expect(orderNum).toBeVisible();
  await expect(orderNum).toContainText(orderID);

  // Com a ajuda da IA eu verifiquei que poderia encontrar se existe o card referente do pedido na tela e então procurar pelo texto APROVADO.
  // Eu pensei que essa não seria a melhor alternativa, pois posso ter o texto APROVADO em qualquer outro lugar deste card.
  const orderCardResult = page.getByTestId(`order-result-${orderID}`)
  await expect(orderCardResult).toBeVisible();

  // Então aqui eu decidi refinar ainda mais minha busca, procurando por um elemento dentro do card que possui as classes do texto que estou querendo validar.
  const status = orderCardResult.locator('[class*="rounded-full"][class*="text-sm"]')
  await expect(status).toBeVisible();
  
  // Após encontrar o elemento então eu faço a validação do texto APROVADO, mas também decidi validar se as classes de estilização do texto APROVADO aparecem.
  // Com isso eu garanto que o texto APROVADO foi encontrado e que as classes do texto também são referentes ao APROVADO, e não estão vermelhas.
  await expect(status).toContainText('APROVADO');
  await expect(status).toHaveClass(/bg-green-100/);
  await expect(status).toHaveClass(/text-green-700/);
})