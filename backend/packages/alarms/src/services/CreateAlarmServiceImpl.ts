import axios from "axios";

import { Alarm } from "../../generated/client";
import { prisma } from "../config/prisma";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import { NotFound } from "../exceptions/NotFound";
import {
    CreateAlarmService,
    CreateAlarmServiceDTO,
} from "./CreateAlarmService";

class CreateAlarmServiceImpl implements CreateAlarmService {
    async execute({
        propertyId,
        isActivated,
    }: CreateAlarmServiceDTO): Promise<Alarm> {
        try {
            await axios.get(`${process.env.HOST}/properties/${propertyId}`);
        } catch (err) {
            throw new NotFound("Property not found");
        }

        const alarmCount = await prisma.alarm.count({
            where: {
                propertyId,
            },
        });

        if (alarmCount > 0) {
            throw new AlreadyExistsException("Alarm already exists");
        }

        const alarm = prisma.alarm.create({
            data: {
                isActivated,
                propertyId,
            },
        });

        return alarm;
    }
}

export { CreateAlarmServiceImpl };
