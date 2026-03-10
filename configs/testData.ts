import { readFile } from 'fs/promises';
import path from 'path';

export interface DefaultRegistrationData {
  firstName: string;
  lastName: string;
  password: string;
}

export interface ShopCartData {
  searchQuery: string;
  productName: string;
  size: string;
  color: string;
  quantityToUpdate: number;
  successMessage: string;
}

export interface AdminData {
  basePath: string;
  username: string;
  password: string;
}

export interface TestData {
  defaultRegistration: DefaultRegistrationData;
  shopCart: ShopCartData;
  admin: AdminData;
}

const defaultPath = path.resolve(process.cwd(), 'data', 'test-data.json');

/**
 * Loads test data from JSON file (async). Uses DATA_FILE_PATH env or default path.
 */
export async function loadTestData(
  filePath: string = process.env.DATA_FILE_PATH ?? defaultPath
): Promise<TestData> {
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const content = await readFile(resolved, 'utf-8');
  return JSON.parse(content) as TestData;
}
