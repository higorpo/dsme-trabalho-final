import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { InactiveAlarm } from "../exceptions/InactiveAlarm";
import { NotFound } from "../exceptions/NotFound";
import { OfflineNotifyService } from "../exceptions/OfflineNotifyService";
import { CreateMonitorService } from "../services/CreateMonitorService";

class MonitorController {
    constructor(private createMonitorService: CreateMonitorService) {
        //
    }

    async create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { alarmId } = req.body;

        try {
            const alarm = await this.createMonitorService.execute(alarmId);

            return res.status(201).json(alarm).send();
        } catch (err) {
            if (err instanceof NotFound || err instanceof InactiveAlarm) {
                return res.status(400).send({ error: err.message });
            }
            if (err instanceof OfflineNotifyService) {
                return res.status(500).send({ error: err.message });
            }
            return res.status(500).send({ error: "Unexpected error" });
        }
    }
}

export { MonitorController };
