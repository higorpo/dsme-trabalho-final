import { Alarm } from "../../generated/client";

interface CreateAlarmServiceDTO {
    propertyId: string;
    isActivated: boolean;
}

interface CreateAlarmService {
    execute(data: CreateAlarmServiceDTO): Promise<Alarm>;
}

export { CreateAlarmService, CreateAlarmServiceDTO };
