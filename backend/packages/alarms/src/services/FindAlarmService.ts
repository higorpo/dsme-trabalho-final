import { Alarm } from "../../generated/client";

interface FindAlarmService {
    execute(alarmId: string): Promise<Alarm>;
}

export { FindAlarmService };
