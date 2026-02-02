import { Page } from '@playwright/test';
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

export class CourseRegisterPage {
  private action: BaseActionHelper;

  constructor(private page: Page) {
    this.action = new BaseActionHelper(page);
  }

  async openAddCourse() {
    await this.action.clickButton('จัดการข้อมูล');
    await this.page.getByRole('link', { name: 'เพิ่มวิชา' }).click();
  }

  async fillCourseForm(data: CourseData) {
    await this.action.fillInput('#ctl00_MainContent_modalPlanCode', data.code);
    await this.action.fillInput('#ctl00_MainContent_modalPlanName', data.name);
    await this.action.fillInput('#ctl00_MainContent_modalPlanCodeEn', data.codeEn);
    await this.action.fillInput('#ctl00_MainContent_modalPlanNameEn', data.nameEn);
    await this.action.fillInput('#ctl00_MainContent_modalPlanHour', data.hour);
    await this.action.fillInput('#ctl00_MainContent_modalTotalHour', data.totalHour);
  }

  async selectSubject(subject: string) {
    await this.action.selectFromDropdown('เลือกกลุ่มสาระการเรียนรู้', subject);
  }
  async save() {
    await this.action.clickButton(/save|บันทึก/);
  }

  async searchClassRoom(data: string) {
    const selectLevelBtn = this.page.getByRole('button', { name: 'เลือกระดับชั้น' });

    if (await selectLevelBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await selectLevelBtn.click();
    }

    await this.action.selectFromListbox(data);
    await this.action.clickButton('search ค้นหา');
  }


  async createCourse(data: CourseData, modaltext: string) {
    await this.openAddCourse();
    await this.fillCourseForm(data);
    await this.action.clickButton("เลือกกลุ่มสาระการเรียนรู้");
    await this.action.selectFromListbox(data.group)
    await this.action.clickButton('เลือกประเภทวิชา');
    await this.action.selectFromListbox(data.type)
    await this.action.clickButton('เลือกหน่วยกิต');
    await this.action.selectFromListboxExact(data.credit)
    await this.save();
    await this.action.waitForSweetAlert(modaltext);
    await this.action.confirmSweetAlert();
  }

}
