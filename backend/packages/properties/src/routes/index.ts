import { Router } from "express";

import { PropertiesRoutes } from "./properties.routes";

const routes = Router();

routes.use("/properties", PropertiesRoutes);

export { routes };
