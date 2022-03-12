import axios from "axios";

import { OfflineNotifyService } from "../exceptions/OfflineNotifyService";
import { NotifyService } from "./NotifyService";

class NotifyServiceImpl implements NotifyService {
    async execute(alarmId: string): Promise<void> {
        try {
            await axios.post(`${process.env.HOST}/alarm-notifier/${alarmId}`);
        } catch (err) {
            throw new OfflineNotifyService("Offline notify service");
        }
    }
}

export { NotifyServiceImpl };
