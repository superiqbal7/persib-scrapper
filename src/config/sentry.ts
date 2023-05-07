import * as Sentry from '@sentry/node';
import * as Tracing from "@sentry/tracing";
import { Application } from "express";

const { NODE_ENV, SENTRY_DSN } = process.env

export const getSentryConfig = (app: Application) => ({
    dsn: NODE_ENV === "production" || NODE_ENV === "staging" ? SENTRY_DSN : undefined,
    environment: NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
})

