export const appConfig = {
  apiUrl: '/api/v1',
  scrapperPort: process.env.PORT || 5051,
  sentryDsn: process.env || '',
  nodeEnv: process.env.NODE_ENV
};
