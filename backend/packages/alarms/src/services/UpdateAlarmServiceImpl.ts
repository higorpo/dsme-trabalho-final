import { Alarm } from "../../generated/client";
import { prisma } from "../config/prisma";
import { UpdateAlarmService } from "./UpdateAlarmService";

class UpdateAlarmServiceImpl implements UpdateAlarmService {
    async execute(alarmId: string, isActivated: boolean): Promise<Alarm> {
        const alarm = await prisma.alarm.update({
            data: {
                isActivated,
            },
            where: {
                id: alarmId,
            },
        });

        return alarm;
    }
}

export { UpdateAlarmServiceImpl };
