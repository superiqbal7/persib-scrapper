import { Scraping } from '../interfaces/Scraping';
import { TableRow } from './TableRow';

export class ScrapingService {
  constructor(private scrapper: Scraping) {}

  async fetchTableData(url: string, fields: string[]): Promise<TableRow[]> {
    return this.scrapper.fetchTableData(url, fields);
  }
}
