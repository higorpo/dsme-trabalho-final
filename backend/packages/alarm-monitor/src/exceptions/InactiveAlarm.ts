class InactiveAlarm extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export { InactiveAlarm };
