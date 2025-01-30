import express from "express";
import fs from "fs";
import cors from "cors";
import axios from "axios";
import path from "path";

const app = express();
const PORT = 6969;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Define __dirname for ES Modules
const __dirname = path.resolve();

// Serve static frontend files correctly
app.use(express.static(path.join(__dirname, "..", "public")));  // If `public/` is outside backend/

// Define correct paths for data files
const CANVAS_DB_PATH = path.join(__dirname, "data", "canvasData.json");
const PROCESSED_DB_PATH = path.join(__dirname, "data", "processedData.json");

// Function to read JSON
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading file:", err);
        return null;
    }
};

// Function to write JSON
const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        console.log(`Data written to ${filePath}`);
    } catch (err) {
        console.error("Error writing file:", err);
    }
};

// Process Canvas Data (removing PII)
const processCanvasData = () => {
    const rawData = readJsonFile(CANVAS_DB_PATH);
    if (!rawData) return;

    const processedData = {
        quiz_submissions: rawData.quiz_submissions.map(({ name, email, user_id, ...rest }) => rest),
    };

    writeJsonFile(PROCESSED_DB_PATH, processedData);
};

// API Endpoints
app.get("/api/canvas-data", (req, res) => {
    const rawData = readJsonFile(CANVAS_DB_PATH);
    rawData ? res.json(rawData) : res.status(500).json({ error: "Failed to load Canvas data" });
});

app.post("/api/process-data", (req, res) => {
    processCanvasData();
    res.json({ message: "Data processed and stored successfully." });
});

app.get("/api/processed-data", (req, res) => {
    const cleanedData = readJsonFile(PROCESSED_DB_PATH);
    cleanedData ? res.json(cleanedData) : res.status(500).json({ error: "Failed to load processed data" });
});

// Serve frontend (Ensure correct path to `index.html`)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));  // Adjust this based on your folder structure
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
