import { body } from "express-validator";

class CreateMonitorValidator {
    validate() {
        return [body("alarmId").isString()];
    }
}

export { CreateMonitorValidator };
