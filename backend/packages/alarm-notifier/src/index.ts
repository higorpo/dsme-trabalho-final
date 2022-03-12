import axios from "axios";
import "dotenv/config";
import cors from "cors";
import events from "events";
import express, { Request, Response } from "express";

const app = express();

app.use(cors());

const eventEmitter = new events.EventEmitter();

app.post("/alarm-notifier/:alarmId", async (req: Request, res: Response) => {
    const { alarmId } = req.params;

    try {
        const { data: alarmData } = await axios.get(
            `${process.env.HOST}/alarms/${alarmId}`
        );

        const { data: propertyData } = await axios.get(
            `${process.env.HOST}/properties/${alarmData.propertyId}`
        );

        console.log(
            `\n\nO alarme ${alarmData.id} da casa ${propertyData.id} que fica no endereço ${propertyData.address} detectou um movimento suspeito!`
        );

        eventEmitter.emit("alarm-detected", alarmData.id);

        return res.status(201).send();
    } catch (err) {
        return res.status(500).send({ error: "Unexpected error" });
    }
});

app.get("/alarm-notifier/:alarmId", async (req: Request, res: Response) => {
    const { alarmId } = req.params;

    res.set({
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
    });
    res.flushHeaders();

    res.write("retry: 10000\n\n");

    eventEmitter.on("alarm-detected", (eventAlarmId) => {
        if (alarmId === eventAlarmId) {
            const data = `data: Um movimento foi detectado na casa às ${new Date().toLocaleTimeString()}!\n\n`;
            res.write(data);
        }
    });
});

app.listen(process.env.PORT, () =>
    console.log(`Server is running on PORT ${process.env.PORT}!`)
);
