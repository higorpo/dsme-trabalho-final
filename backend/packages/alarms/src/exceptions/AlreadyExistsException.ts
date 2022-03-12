class AlreadyExistsException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export { AlreadyExistsException };
