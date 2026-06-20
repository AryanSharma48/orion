import express from 'express';
import cors from 'cors';
import ingestRouter from './routes/ingest';
import riskmapRouter from './routes/riskmap';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/ingest', ingestRouter);
app.use('/riskmap', riskmapRouter);
app.use('/flags', riskmapRouter); // /flags/recent is in riskmap.ts

app.get('/health', (req, res) => {
    res.json({ status: "ok", service: "anomaly-engine" });
});

const PORT = process.env.ANOMALY_PORT || 8001;
app.listen(PORT, () => {
    console.log(`Anomaly Engine listening on port ${PORT}`);
});
