import { Property } from "../../generated/client";
import { prisma } from "../config/prisma";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import {
    CreatePropertyService,
    CreatePropertyServiceDTO,
} from "./CreatePropertyService";

class CreatePropertyServiceImpl implements CreatePropertyService {
    async execute({
        address,
        ownerName,
        ownerPhone,
    }: CreatePropertyServiceDTO): Promise<Property> {
        const propertyCount = await prisma.property.count({
            where: {
                address,
            },
        });

        if (propertyCount > 0) {
            throw new AlreadyExistsException(
                "Property already exists at this address"
            );
        }

        const property = prisma.property.create({
            data: {
                address,
                ownerName,
                ownerPhone,
            },
        });

        return property;
    }
}

export { CreatePropertyServiceImpl };
