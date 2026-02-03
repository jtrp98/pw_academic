import { Page, expect, Locator } from '@playwright/test';

export class BaseActionHelper {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillInput(selector: string, value: string) {
        await this.page.locator(selector).fill(value);
    }

    async fillInputByLocator(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async clickButton(name: string | RegExp) {
        await this.page.getByRole('button', { name }).click();
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async selectFromDropdown(buttonName: string, optionName: string) {
        await this.page.getByRole('button', { name: buttonName }).click();
        
        const option = this.page.getByRole('option', { name: optionName, exact: true });
        await option.click();
    }

    async selectFromListbox(optionName: string) {
        await this.page
            .getByRole('listbox')
            .getByRole('option', { name: optionName })
            .click();
    }

    async selectFromListboxExact(optionName: string) {
        await this.page
            .getByRole('listbox')
            .getByRole('option', { name: optionName, exact: true }) 
            .click();
    }

    async waitForSweetAlert(expectedText?: string) {
        const modal = this.page.locator('.swal2-popup');
        
        await expect(modal).toBeVisible({ timeout: 5000 });

        if (expectedText) {
            const content = this.page.locator('#swal2-content, #swal2-html-container');
            await expect(content).toContainText(expectedText);
        }
    }

    async confirmSweetAlert() {
        const confirmBtn = this.page.locator('.swal2-confirm');
        await confirmBtn.click();
        
        await expect(this.page.locator('.swal2-popup')).toBeHidden();
    }
}