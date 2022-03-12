import { Property } from "../../generated/client";

interface ListPropertiesService {
    execute(): Promise<Property[]>;
}

export { ListPropertiesService };
