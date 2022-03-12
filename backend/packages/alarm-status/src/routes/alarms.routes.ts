import { Router, Request, Response } from "express";

import { AlarmsController } from "../controllers/AlarmsController";
import { CreateAlarmServiceImpl } from "../services/CreateAlarmServiceImpl";
import { CreateAlarmValidator } from "../validators/CreateAlarmValidator";

const AlarmsRoutes = Router();

const createAlarmService = new CreateAlarmServiceImpl();
const controller = new AlarmsController(createAlarmService);

AlarmsRoutes.post(
    "/",
    new CreateAlarmValidator().validate(),
    (req: Request, res: Response) => controller.create(req, res)
);

export { AlarmsRoutes };
