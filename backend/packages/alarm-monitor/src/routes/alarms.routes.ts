import { Router, Request, Response } from "express";

import { MonitorController } from "../controllers/MonitorController";
import { CreateMonitorServiceImpl } from "../services/CreateMonitorServiceImpl";
import { NotifyServiceImpl } from "../services/NotifyServiceImpl";
import { CreateMonitorValidator } from "../validators/CreateMonitorValidator";

const AlarmsRoutes = Router();

const notifyService = new NotifyServiceImpl();
const createMonitorService = new CreateMonitorServiceImpl(notifyService);
const controller = new MonitorController(createMonitorService);

AlarmsRoutes.post(
    "/",
    new CreateMonitorValidator().validate(),
    (req: Request, res: Response) => controller.create(req, res)
);

export { AlarmsRoutes };
