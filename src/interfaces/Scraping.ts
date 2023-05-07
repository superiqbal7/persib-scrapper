import { TableRow } from '../domain/TableRow';

export interface Scraping {
  fetchTableData(url: string, fields: string[]): Promise<TableRow[]>;
}
