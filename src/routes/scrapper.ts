import express, { Request, Response, NextFunction} from 'express';
import { appConfig } from '../config/appConfig';
import { body } from "express-validator";
import { validateRequest } from '../middleware/validate-request';
import { NotFoundError } from '../errors/not-found-error';
import Logger from "../utils/logger"
import { Scrapper } from '../infrastructure/Scrapper';
import { ScrapingService } from '../domain/ScrapingService';
// create a new router instance
const router = express.Router();

router.get('/api/v1', validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(`Running app in ${process.env.NODE_ENV} , base url: ${appConfig.apiUrl}... 🚀`)
})


// get scrapped table data
router.post(`${appConfig.apiUrl}/scrapper`, [
    body('url').not().isEmpty().withMessage("URL is required"),
    body('fields').not().isEmpty().withMessage("Fields is required")
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scrapper = new Scrapper();
      const scrapingService = new ScrapingService(scrapper);
      const { url, fields } = req.body;
      const data = await scrapingService.fetchTableData(url, fields);
      if (!data) {
        throw new NotFoundError();
      }
      res.status(200).json(data);
    }
    catch (error) {
      Logger.error(error)
      return next(error)
    }   
  }
);

export { router as scrapperRouter };
