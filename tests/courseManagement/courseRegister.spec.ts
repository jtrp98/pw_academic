import { test, Page, expect } from '@playwright/test';
import { CourseRegisterPage } from '../../pages/courseManagement/courseRegister.page';
import { getDomain } from '../../helpers/bypass.helper';
import { courseRegisterData } from '../../data/courseManagement/courseRegister.data';

test.describe('Course Register - CREATE', () => {
    for (const [index, data] of courseRegisterData.create.entries()) {
        
        test(`${index + 1}. ${data.caseType.toUpperCase()} | code=${data.code}`, async ({ page }) => {
            const coursePage = new CourseRegisterPage(page);

            try {
                await page.goto(`${getDomain()}BP1/courseRegister.aspx`);
                await page.waitForLoadState('networkidle');
                await coursePage.searchClassRoom('ตอ. 1');
                await coursePage.createCourse(data, data.expectedMessage);

            } catch (err) {
                test.info().annotations.push({
                    type: 'CREATE FAILED',
                    description: `Code: ${data.code} -> ${err}`,
                });

                throw err;
            }
        });
    }
});

test.describe('Course Register - EDIT', () => {
    
    test('Edit Course Name', async ({ page }) => {
        const coursePage = new CourseRegisterPage(page);
        const originalData = courseRegisterData.create[0]; 
        
        const updateData = { 
            ...originalData, 
            name: 'ชื่อวิชาแก้ไขแล้ว_V2',
            expectedMessage: 'บันทึกข้อมูลเรียบร้อย'
        };

        await page.goto(`${getDomain()}BP1/courseRegister.aspx`);
        await page.waitForLoadState('networkidle');
        await coursePage.searchClassRoom('ตอ. 1');

        await coursePage.editCourse(originalData.code, updateData, updateData.expectedMessage);
    });

});