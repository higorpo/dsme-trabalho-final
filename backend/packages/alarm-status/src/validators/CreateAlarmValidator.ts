import { body } from "express-validator";

class CreateAlarmValidator {
    validate() {
        return [body("alarmId").isString()];
    }
}

export { CreateAlarmValidator };
