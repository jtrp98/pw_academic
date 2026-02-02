import { Page, expect, Locator } from '@playwright/test';

export class BaseActionHelper {
    constructor(protected page: Page) { }

    async fillInput(selector: string, value: string) {
        const input = this.page.locator(selector);
        await expect(input).toBeVisible();
        await input.fill(value);
    }

    async fillInputByLocator(locator: Locator, value: string) {
        await expect(locator).toBeVisible();
        await locator.fill(value);
    }

    async clickButton(name: string | RegExp) {
        const button = this.page.getByRole('button', { name });
        await expect(button).toBeEnabled();
        await button.click();
    }

    async click(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.click();
    }

    async selectFromDropdown(
        buttonName: string,
        optionName: string
    ) {
        const button = this.page.getByRole('button', { name: buttonName });
        await expect(button).toBeVisible();
        await button.click();

        const option = this.page.getByRole('option', { name: optionName });
        await expect(option).toBeVisible();
        await option.click();
    }

    async selectFromListbox(optionName: string) {
        const option = this.page
            .getByRole('listbox')
            .getByRole('option', { name: optionName });

        await expect(option).toBeVisible();
        await option.click();
    }

    async selectFromListboxExact(optionText: string) {
        const option = this.page
            .getByRole('listbox')
            .getByRole('option', { name: new RegExp(`^${optionText}$`) });

        await expect(option).toBeVisible();
        await option.click();
    }


    async waitForSweetAlert(expectedText?: string, timeout = 5000) {
        const modal = this.page.locator('.swal2-popup');
        await modal.waitFor({ state: 'visible', timeout });

        if (expectedText) {
            const content = this.page.locator('#swal2-content');
            await expect(content).toHaveText(expectedText);
        }
    }


    async confirmSweetAlert() {
        const confirmBtn = this.page.locator('.swal2-confirm');
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();

        await expect(this.page.locator('.swal2-popup')).toBeHidden();
    }


}
