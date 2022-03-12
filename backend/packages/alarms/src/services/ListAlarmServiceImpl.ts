import { Alarm } from "../../generated/client";
import { prisma } from "../config/prisma";
import { ListAlarmService } from "./ListAlarmService";

class ListAlarmServiceImpl implements ListAlarmService {
    async execute(propertyId: string): Promise<Alarm[]> {
        const alarms = await prisma.alarm.findMany({
            where: {
                propertyId,
            },
        });

        return alarms;
    }
}

export { ListAlarmServiceImpl };
