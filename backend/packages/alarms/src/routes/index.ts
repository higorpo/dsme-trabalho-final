import { Router } from "express";

import { AlarmsRoutes } from "./alarms.routes";

const routes = Router();

routes.use("/alarms", AlarmsRoutes);

export { routes };
