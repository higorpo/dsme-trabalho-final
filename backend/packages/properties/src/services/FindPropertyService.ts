import { Property } from "../../generated/client";

interface FindPropertyService {
    execute(propertyId: string): Promise<Property>;
}

export { FindPropertyService };
