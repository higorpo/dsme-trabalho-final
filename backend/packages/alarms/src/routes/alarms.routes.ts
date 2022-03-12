import { Router, Request, Response } from "express";

import { AlarmsController } from "../controllers/AlarmsController";
import { CreateAlarmServiceImpl } from "../services/CreateAlarmServiceImpl";
import { FindAlarmServiceImpl } from "../services/FindAlarmServiceImpl";
import { UpdateAlarmServiceImpl } from "../services/UpdateAlarmServiceImpl";
import { CreateAlarmValidator } from "../validators/CreateAlarmValidator";
import { UpdateAlarmValidator } from "../validators/UpdateAlarmValidator";

const AlarmsRoutes = Router();

const createAlarmService = new CreateAlarmServiceImpl();
const findAlarmsService = new FindAlarmServiceImpl();
const updateAlarmService = new UpdateAlarmServiceImpl();
const controller = new AlarmsController(
    createAlarmService,
    findAlarmsService,
    updateAlarmService
);

AlarmsRoutes.get("/:id", (req, res) => controller.find(req, res));
AlarmsRoutes.post(
    "/",
    new CreateAlarmValidator().validate(),
    (req: Request, res: Response) => controller.create(req, res)
);
AlarmsRoutes.put(
    "/:id",
    new UpdateAlarmValidator().validate(),
    (req: Request, res: Response) => controller.update(req, res)
);

export { AlarmsRoutes };
