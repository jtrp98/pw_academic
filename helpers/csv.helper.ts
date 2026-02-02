import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function readCSV<T>(filePath: string): T[] {
  const file = fs.readFileSync(filePath);
  return parse(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}
