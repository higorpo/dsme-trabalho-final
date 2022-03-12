interface NotifyService {
    execute(alarmId: string): Promise<void>;
}

export { NotifyService };
