import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import httpProxy from "express-http-proxy";

const app = express();

const selectProxyHost = (req: Request) => {
    if (req.path.startsWith("/properties")) {
        return "http://localhost:8001";
    }
    if (req.path.startsWith("/alarms")) {
        return "http://localhost:8002";
    }
    if (req.path.startsWith("/alarm-status")) {
        return "http://localhost:8003";
    }
    if (req.path.startsWith("/alarm-monitor")) {
        return "http://localhost:8004";
    }
    if (req.path.startsWith("/alarm-notifier")) {
        return "http://localhost:8005";
    }
    return "undefined";
};

app.use((req: Request, res: Response, next: NextFunction) => {
    httpProxy(selectProxyHost(req))(req, res, next);
});

app.listen(process.env.PORT, () =>
    console.log(`Server is running on PORT ${process.env.PORT}!`)
);
