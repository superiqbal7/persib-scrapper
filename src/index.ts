import { app } from './app';
import { appConfig } from "./config/appConfig";

// start the server and listen on the configured port
const start = async () => {
  app.listen(appConfig.scrapperPort, () => {
    console.log(`Running app in ${process.env.NODE_ENV} , base url: ${appConfig.apiUrl}... 🚀`);
  })  
};

start();
