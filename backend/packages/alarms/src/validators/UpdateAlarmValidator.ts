import { body } from "express-validator";

class UpdateAlarmValidator {
    validate() {
        return [body("isActivated").isBoolean()];
    }
}

export { UpdateAlarmValidator };
