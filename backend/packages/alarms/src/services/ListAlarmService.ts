import { Alarm } from "../../generated/client";

interface ListAlarmService {
    execute(propertyId: string): Promise<Alarm[]>;
}

export { ListAlarmService };
