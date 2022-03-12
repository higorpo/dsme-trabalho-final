import { body } from "express-validator";

class CreateAlarmValidator {
    validate() {
        return [body("propertyId").isString(), body("isActivated").isBoolean()];
    }
}

export { CreateAlarmValidator };
