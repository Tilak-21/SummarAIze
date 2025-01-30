import express from "express";
import fs from "fs";
import cors from "cors";
import axios from "axios";



const app = express();
const PORT = 6969;

app.use(cors());
app.use(express.json());

const CANVAS_DB_PATH = "./data/canvasData.json";
const PROCESSED_DB_PATH = "./data/processedData.json";

/**
 * Reads JSON data from a file.
 */
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading file:", err);
        return null;
    }
};

/**
 * Writes JSON data to a file.
 */
const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        console.log(`Data written to ${filePath}`);
    } catch (err) {
        console.error("Error writing file:", err);
    }
};

/**
 * Processes Canvas Data: Removes PII and saves the cleaned data.
 */
const processCanvasData = () => {
    const rawData = readJsonFile(CANVAS_DB_PATH);
    if (!rawData) return;

    const processedData = {
        quiz_submissions: rawData.quiz_submissions.map(({ name, email, user_id, ...rest }) => rest),
    };

    writeJsonFile(PROCESSED_DB_PATH, processedData);
};

/**
 * API to fetch raw Canvas-like data (simulated API call).
 */
app.get("/api/canvas-data", (req, res) => {
    const rawData = readJsonFile(CANVAS_DB_PATH);
    if (rawData) {
        res.json(rawData);
    } else {
        res.status(500).json({ error: "Failed to load Canvas data" });
    }
});

/**
 * API to process Canvas data and store cleaned results.
 */
app.post("/api/process-data", (req, res) => {
    processCanvasData();
    res.json({ message: "Data processed and stored successfully." });
});

/**
 * API to fetch processed (cleaned) data.
 */
app.get("/api/processed-data", (req, res) => {
    const cleanedData = readJsonFile(PROCESSED_DB_PATH);
    if (cleanedData) {
        res.json(cleanedData);
    } else {
        res.status(500).json({ error: "Failed to load processed data" });
    }
});

/**
 * API to send processed data for AI analysis (Simulated).
 */
app.post("/api/analyze", async (req, res) => {
    try {
        const aiResponse = await axios.post("https://your-ai-endpoint.com/analyze", req.body);
        res.json(aiResponse.data);
    } catch (error) {
        res.status(500).json({ error: "AI service failed", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
