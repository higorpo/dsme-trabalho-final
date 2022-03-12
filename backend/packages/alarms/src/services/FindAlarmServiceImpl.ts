import { Alarm } from "../../generated/client";
import { prisma } from "../config/prisma";
import { NotFound } from "../exceptions/NotFound";
import { FindAlarmService } from "./FindAlarmService";

class FindAlarmServiceImpl implements FindAlarmService {
    async execute(alarmId: string): Promise<Alarm> {
        const alarm = await prisma.alarm.findUnique({
            where: {
                id: alarmId,
            },
        });

        if (!alarm) {
            throw new NotFound("Alarm not found");
        }

        return alarm;
    }
}

export { FindAlarmServiceImpl };
