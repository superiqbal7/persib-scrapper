import express from 'express';
import cors from 'cors';
import "express-async-errors";
import dotenv from 'dotenv';
// import Sentry from './config/sentry';
import * as Sentry from "@sentry/node"
import { json } from 'body-parser';
import { getSentryConfig } from "./config/sentry"
import { scrapperRouter } from './routes/scrapper';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

// load environment variables from .env file
dotenv.config();

// create a new instance of the Express app
const app = express();

Sentry.init(getSentryConfig(app))

// Add Sentry request handler middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// use the cors middleware to enable CORS for all origins
app.use(cors());

// use the json middleware to parse request bodies
app.use(json());

// register the postsRouter for handling requests to /posts
app.use(scrapperRouter);

// throw a NotFoundError for any other routes that are not handled
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

// Add Sentry error handler middleware
app.use(Sentry.Handlers.errorHandler());

// handle errors using the errorHandler middleware
app.use(errorHandler);

export { app };
