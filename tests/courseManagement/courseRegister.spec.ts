import { test, Page, expect } from '@playwright/test';
import { CourseRegisterPage } from '../../pages/courseManagement/courseRegister.page';
import { bypassIfNeeded, getDomain } from '../../helpers/bypass.helper';
import { courseRegisterData } from '../../data/courseManagement/courseRegister.data';

test.describe('Course Register - CREATE', () => {
    let page: Page;
    let coursePage: CourseRegisterPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await bypassIfNeeded(page);
        coursePage = new CourseRegisterPage(page);
    });

    test('CREATE course scenarios (positive → negative)', async () => {
        const failedCases: string[] = [];

        for (const [index, data] of courseRegisterData.create.entries()) {
            await test.step(
                `${index + 1}. ${data.caseType.toUpperCase()} | code=${data.code}`,
                async () => {
                    try {
                        await page.goto(`${getDomain()}BP1/courseRegister.aspx`);
                        await page.waitForLoadState('networkidle');
                        await coursePage.searchClassRoom('ตอ. 1');

                        await coursePage.createCourse(data, data.expectedMessage); 
                    } catch (err) {

                        const errorMessage = `${index + 1}. ${data.caseType} | code=${data.code}`;
                        failedCases.push(errorMessage);
                        console.error(`Failed at: ${errorMessage}`, err);

                        test.info().annotations.push({
                            type: 'CREATE FAILED',
                            description: `${errorMessage} -> ${err}`,
                        });
                    }
                }
            );
        }

        expect(failedCases, `The following cases failed: \n${failedCases.join('\n')}`).toHaveLength(0);
    });

    test.afterAll(async () => {
        await page.close();
    });
});