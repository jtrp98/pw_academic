import { readCSV } from "../../helpers/csv.helper";
import path from 'path';

const testData = readCSV<any>(
  path.resolve(__dirname, 'courseRegister.csv')
);

export const courseRegisterData = {create : testData};

