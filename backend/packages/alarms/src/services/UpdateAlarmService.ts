import { Alarm } from "../../generated/client";

interface UpdateAlarmService {
    execute(alarmId: string, isActivated: boolean): Promise<Alarm>;
}

export { UpdateAlarmService };
