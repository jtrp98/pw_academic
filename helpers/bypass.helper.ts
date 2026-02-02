import { Page } from '@playwright/test';

export function getMode(): string {
  return process.env.MODE ?? 'prod';
}

export function getDomain(): string {
  switch (getMode()) {
    case 'beta':
      return 'https://dev-academic.schoolbright.co/';
    case 'dev':
      return 'https://dev-ui-academic.schoolbright.co/';
    default:
      return 'https://academic.schoolbright.co/';
  }
}

export function getSchoolId(): string | undefined {
  return process.env.SCHOOL_ID;
}

export async function bypassIfNeeded(page: Page) {
  const schoolId = process.env.SCHOOL_ID;

  if (!schoolId) return;

  const token = process.env[`BYPASS_TOKEN_${schoolId}`];
  if (!token) return;

  const url = `${getDomain()}${token}`;
  await page.goto(url);
}

