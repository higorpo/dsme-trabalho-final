import { body } from "express-validator";

class CreatePropertyValidator {
    validate() {
        return [
            body("address").isString(),
            body("ownerName").isString(),
            body("ownerPhone").isMobilePhone("pt-BR"),
        ];
    }
}

export { CreatePropertyValidator };
