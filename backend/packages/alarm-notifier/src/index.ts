import axios from "axios";
import "dotenv/config";
import express, { Request, Response } from "express";

const app = express();

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

        return res.status(201).send();
    } catch (err) {
        return res.status(500).send({ error: "Unexpected error" });
    }
});

app.listen(process.env.PORT, () =>
    console.log(`Server is running on PORT ${process.env.PORT}!`)
);
