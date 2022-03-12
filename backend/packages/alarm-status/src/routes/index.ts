import { Router } from "express";

import { AlarmsRoutes } from "./alarms.routes";

const routes = Router();

routes.use("/alarm-status", AlarmsRoutes);

export { routes };
