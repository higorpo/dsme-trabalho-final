import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { NotFound } from "../exceptions/NotFound";
import { CreateAlarmService } from "../services/CreateAlarmService";

class AlarmsController {
    constructor(private createAlarmService: CreateAlarmService) {
        //
    }

    async create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { alarmId } = req.body;

        try {
            const alarm = await this.createAlarmService.execute(alarmId);

            return res.status(201).json(alarm).send();
        } catch (err) {
            if (err instanceof NotFound) {
                return res.status(400).send({ error: err.message });
            }
            return res.status(500).send({ error: "Unexpected error" });
        }
    }
}

export { AlarmsController };
