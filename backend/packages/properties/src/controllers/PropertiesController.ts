import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import { NotFound } from "../exceptions/NotFound";
import { CreatePropertyService } from "../services/CreatePropertyService";
import { FindPropertyService } from "../services/FindPropertyService";
import { ListPropertiesService } from "../services/ListPropertiesService";

class PropertiesController {
    constructor(
        private createPropertyService: CreatePropertyService,
        private listPropertiesService: ListPropertiesService,
        private findPropertyService: FindPropertyService
    ) {
        //
    }

    async create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { address, ownerName, ownerPhone } = req.body;

        try {
            const property = await this.createPropertyService.execute({
                address,
                ownerName,
                ownerPhone,
            });

            return res.status(201).json(property).send();
        } catch (err) {
            if (err instanceof AlreadyExistsException) {
                return res.status(400).send({ error: err.message });
            }
            return res.status(500).send({ error: "Unexpected error" });
        }
    }

    async list(req: Request, res: Response) {
        const properties = await this.listPropertiesService.execute();

        return res.json(properties).send();
    }

    async find(req: Request, res: Response) {
        const { id: propertyId } = req.params;

        try {
            const property = await this.findPropertyService.execute(propertyId);

            return res.json(property).send();
        } catch (err) {
            if (err instanceof NotFound) {
                return res.status(404).send({ error: err.message });
            }
            return res.status(500).send({ error: "Unexpected error" });
        }
    }
}

export { PropertiesController };
