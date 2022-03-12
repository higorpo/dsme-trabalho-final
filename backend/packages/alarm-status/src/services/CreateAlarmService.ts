import { AlarmStatus } from "../../generated/client";

interface CreateAlarmService {
    execute(alarmId: string): Promise<AlarmStatus>;
}

export { CreateAlarmService };
