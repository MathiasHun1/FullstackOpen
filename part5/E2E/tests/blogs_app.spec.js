const { test, expect, beforeEach, describe } = require('@playwright/test')
const { usersCreator } = require('./helper')
const { request } = require('http')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Blogs')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({page, request}) => {
      await request.post('http://localhost:5173/api/test/reset')
      await usersCreator(request)
    })

    test('succeeds with correct credentials', async ({page}) => {
      await page.getByLabel('username').fill('lali')
      await page.getByLabel('password').fill('admin')

      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('lali logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await page.getByLabel('username').fill('lali')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({page, request}) => {
      await request.post('http://localhost:5173/api/test/reset')
      await usersCreator(request)
      await page.getByLabel('username').fill('lali')
      await page.getByLabel('password').fill('admin')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Add new blog' }).click()

      await page.getByLabel('title').fill('title from a test')
      await page.getByLabel('author').fill('author from a test')
      await page.getByLabel('url').fill('www.testurl.net')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('title from a test')).toBeVisible()
      await expect(page.getByTestId('blogElement')).toContainText('title from a test')
    })

    describe('and some blogs exist', () => {
      beforeEach(async ({ page, request }) => {
        await page.getByRole('button', { name: 'Add new blog' }).click()
        await page.getByLabel('title').fill('title from a test')
        await page.getByLabel('author').fill('author from a test')
        await page.getByLabel('url').fill('www.testurl.net')
        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'Add new blog' }).click()
        await page.getByLabel('title').fill('winettou adventures')
        await page.getByLabel('author').fill('Karl May')
        await page.getByLabel('url').fill('www.winettou.net')
        await page.getByRole('button', { name: 'create' }).click()
      })

      test.only('blog can be liked', async ({ page }) => {
        const blogElement = await page
          .getByTestId('blogElement')
          .filter({hasText: 'title from a test'})

        await blogElement.getByRole('button', { name: 'view' }).click()
        const likesCounter = blogElement.getByTestId('likes-counter')
        await expect(likesCounter).toHaveText('0')

        await blogElement.getByTestId('like-button').click()
        await expect(likesCounter).toHaveText('1')
      })
    })
  })
})