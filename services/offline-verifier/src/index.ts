import express from 'express';
import cors from 'cors';
import verifyRouter from './routes/verify';
import generateRouter from './routes/generate';
import reportRouter from './routes/report';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // for image_base64

app.use('/verify', verifyRouter);
app.use('/generate', generateRouter);
app.use('/report', reportRouter);
app.use('/reports', reportRouter); // alias

app.get('/health', (req, res) => {
    res.json({ status: "ok", service: "offline-verifier" });
});

const PORT = process.env.VERIFIER_PORT || 8002;
app.listen(PORT, () => {
    console.log(`Offline Verifier listening on port ${PORT}`);
});
