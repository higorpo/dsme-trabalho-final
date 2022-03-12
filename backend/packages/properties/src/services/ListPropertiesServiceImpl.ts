import { Property } from "../../generated/client";
import { prisma } from "../config/prisma";
import { ListPropertiesService } from "./ListPropertiesService";

class ListPropertiesServiceImpl implements ListPropertiesService {
    async execute(): Promise<Property[]> {
        const properties = await prisma.property.findMany();

        return properties;
    }
}

export { ListPropertiesServiceImpl };
