import { expect, Page } from '@playwright/test';
import { BaseActionHelper } from '../../helpers/baseAction.helper';

export type CourseData = {
	code: string;
	name: string;
	codeEn: string;
	nameEn: string;
	group: string;
	type: string;
	credit: string;
	hour: string;
	totalHour: string;
};

const SELECTORS = {
	inputCode: '#ctl00_MainContent_modalPlanCode',
	inputName: '#ctl00_MainContent_modalPlanName',
	inputCodeEn: '#ctl00_MainContent_modalPlanCodeEn',
	inputNameEn: '#ctl00_MainContent_modalPlanNameEn',
	inputHour: '#ctl00_MainContent_modalPlanHour',
	inputTotalHour: '#ctl00_MainContent_modalTotalHour',
	btnManageData: 'จัดการข้อมูล',
	linkAddCourse: 'เพิ่มวิชา',
	btnSubjectGroup: 'เลือกกลุ่มสาระการเรียนรู้',
	btnSubjectType: 'เลือกประเภทวิชา',
	btnCredit: 'เลือกหน่วยกิต',
	btnSave: /save|บันทึก/,
	btnSelectLevel: 'เลือกระดับชั้น',
	btnSearch: 'search ค้นหา'
};

export class CourseRegisterPage {
	private action: BaseActionHelper;

	constructor(private page: Page) {
		this.action = new BaseActionHelper(page);
	}

	async openAddCourse() {
		await this.action.clickButton(SELECTORS.btnManageData);
		await this.page.getByRole('link', { name: SELECTORS.linkAddCourse }).click();
	}

	async fillCourseForm(data: CourseData) {

		const codeInput = this.page.locator(SELECTORS.inputCode);
        await expect(codeInput).toBeVisible({ timeout: 10000 }); 
        
		await this.action.fillInput(SELECTORS.inputCode, data.code);
		await this.action.fillInput(SELECTORS.inputName, data.name);
		await this.action.fillInput(SELECTORS.inputCodeEn, data.codeEn);
		await this.action.fillInput(SELECTORS.inputNameEn, data.nameEn);
		await this.action.fillInput(SELECTORS.inputHour, data.hour);
		await this.action.fillInput(SELECTORS.inputTotalHour, data.totalHour);
	}

	async selectDropdowns(data: CourseData) {
		await this.action.clickButton(SELECTORS.btnSubjectGroup);
		await this.action.selectFromListbox(data.group);

		await this.action.clickButton(SELECTORS.btnSubjectType);
		await this.action.selectFromListbox(data.type);

		await this.action.clickButton(SELECTORS.btnCredit);
		await this.action.selectFromListboxExact(data.credit);
	}

	async save() {
		await this.action.clickButton(SELECTORS.btnSave);
	}

	async searchClassRoom(className: string) {
		const selectLevelBtn = this.page.getByRole('button', { name: SELECTORS.btnSelectLevel });

		if (await selectLevelBtn.isVisible()) {
			await selectLevelBtn.click();
		}

		await this.action.selectFromListbox(className);
		await this.action.clickButton(SELECTORS.btnSearch);
	}

	async createCourse(data: CourseData, expectedAlertText: string) {
		await this.openAddCourse();

		await this.fillCourseForm(data);

		await this.selectDropdowns(data);

		await this.save();

		await this.action.waitForSweetAlert(expectedAlertText);
		await this.action.confirmSweetAlert();
	}

	async editCourse(identifier: string, newData: CourseData, expectedAlertText: string = 'บันทึกข้อมูลเรียบร้อย') {
		const row = this.page.getByRole('row').filter({ hasText: identifier }).first();
		const editButton = row.locator('.fa-edit');
		await expect(editButton).toBeVisible();
		await editButton.click();

		await expect(this.page.locator('#myModal2')).toBeVisible();

		if (newData.name) {
			await this.action.fillInput(SELECTORS.inputName, newData.name);
		}
		if (newData.nameEn) {
			await this.action.fillInput(SELECTORS.inputNameEn, newData.nameEn);
		}

		await this.selectDropdowns(newData);

		await this.save();
		await this.action.waitForSweetAlert(expectedAlertText);
		await this.action.confirmSweetAlert();
	}
}