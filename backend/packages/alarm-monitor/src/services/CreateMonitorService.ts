import { Monitor } from "../../generated/client";

interface CreateMonitorService {
    execute(alarmId: string): Promise<Monitor>;
}

export { CreateMonitorService };
