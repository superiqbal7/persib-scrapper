import axios from 'axios';
import cheerio from 'cheerio';
import { TableRow } from '../domain/TableRow';
import { Scraping } from '../interfaces/Scraping';

export class Scrapper implements Scraping {
  async fetchTableData(url: string, fields: string[]): Promise<TableRow[]> {
    const { data: htmlContent } = await axios.get(url);
    const $ = cheerio.load(htmlContent);
    const rows: TableRow[] = [];

    $('table tbody tr').each((_, tr) => {
      const row: TableRow = {};
      $(tr)
        .find('td')
        .each((index, td) => {
          if (fields[index]) {
            row[fields[index]] = $(td).text().trim();
          }
        });
      rows.push(row);
    });

    return rows;
  }
}
