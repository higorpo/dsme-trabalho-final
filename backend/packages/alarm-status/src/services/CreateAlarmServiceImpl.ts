import axios from "axios";

import { AlarmStatus } from "../../generated/client";
import { prisma } from "../config/prisma";
import { NotFound } from "../exceptions/NotFound";
import { CreateAlarmService } from "./CreateAlarmService";

class CreateAlarmServiceImpl implements CreateAlarmService {
    async execute(alarmId: string): Promise<AlarmStatus> {
        try {
            await axios.get(`${process.env.HOST}/alarms/${alarmId}`);
        } catch (err) {
            throw new NotFound("Alarm not found");
        }

        const alarm = prisma.alarmStatus.create({
            data: {
                alarmId,
            },
        });

        return alarm;
    }
}

export { CreateAlarmServiceImpl };
