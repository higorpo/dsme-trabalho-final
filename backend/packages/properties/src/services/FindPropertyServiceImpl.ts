import { Property } from "../../generated/client";
import { prisma } from "../config/prisma";
import { NotFound } from "../exceptions/NotFound";
import { FindPropertyService } from "./FindPropertyService";

class FindPropertyServiceImpl implements FindPropertyService {
    async execute(propertyId: string): Promise<Property> {
        const property = await prisma.property.findUnique({
            where: {
                id: propertyId,
            },
        });

        if (!property) {
            throw new NotFound("Property not found");
        }

        return property;
    }
}

export { FindPropertyServiceImpl };
