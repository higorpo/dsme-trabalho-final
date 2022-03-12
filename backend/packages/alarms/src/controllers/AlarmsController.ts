import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import { NotFound } from "../exceptions/NotFound";
import { CreateAlarmService } from "../services/CreateAlarmService";
import { FindAlarmService } from "../services/FindAlarmService";
import { UpdateAlarmService } from "../services/UpdateAlarmService";

class AlarmsController {
    constructor(
        private createAlarmService: CreateAlarmService,
        private findAlarmService: FindAlarmService,
        private updateAlarmService: UpdateAlarmService
    ) {
        //
    }

    async create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { propertyId, isActivated } = req.body;

        try {
            const alarm = await this.createAlarmService.execute({
                propertyId,
                isActivated,
            });

            return res.status(201).json(alarm).send();
        } catch (err) {
            if (err instanceof AlreadyExistsException) {
                return res.status(400).send({ error: err.message });
            }
            if (
                err instanceof AlreadyExistsException ||
                err instanceof NotFound
            ) {
                return res.status(400).send({ error: err.message });
            }
            return res.status(500).send({ error: "Unexpected error" });
        }
    }

    async update(req: Request, res: Response) {
        const { id: alarmId } = req.params;
        const { isActivated } = req.body;

        try {
            const alarm = await this.updateAlarmService.execute(
                alarmId,
                isActivated
            );

            return res.json(alarm).send();
        } catch (err) {
            return res.status(500).send({ error: "Unexpected error" });
        }
    }

    async find(req: Request, res: Response) {
        const { id: alarmId } = req.params;

        try {
            const alarm = await this.findAlarmService.execute(alarmId);

            return res.json(alarm).send();
        } catch (err) {
            if (err instanceof NotFound) {
                return res.status(404).send({ error: err.message });
            }
            return res.status(500).send({ error: "Unexpected error" });
        }
    }
}

export { AlarmsController };
