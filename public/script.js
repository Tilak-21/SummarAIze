document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("process-data-btn").addEventListener("click", processData);
    document.getElementById("view-data-btn").addEventListener("click", fetchProcessedData);
    document.getElementById("analyze-data-btn").addEventListener("click", sendToAI);
});

/**
 * Calls the backend to process Canvas data and remove PII.
 */
async function processData() {
    try {
        const response = await fetch("/api/process-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        document.getElementById("output").innerText = result.message;
    } catch (error) {
        document.getElementById("output").innerText = "Error processing data!";
        console.error("Error:", error);
    }
}

/**
 * Fetches processed data (without PII) from the backend.
 */
async function fetchProcessedData() {
    try {
        const response = await fetch("/api/processed-data");
        const data = await response.json();
        document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById("output").innerText = "Error fetching processed data!";
        console.error("Error:", error);
    }
}

/**
 * Sends processed data to AI for further analysis.
 */
async function sendToAI() {
    try {
        // First, get the processed data
        const processedResponse = await fetch("/api/processed-data");
        const processedData = await processedResponse.json();

        // Send the processed data to AI
        const aiResponse = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(processedData)
        });

        const result = await aiResponse.json();
        document.getElementById("output").innerText = "AI Analysis Result: " + JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById("output").innerText = "Error analyzing data!";
        console.error("Error:", error);
    }
}
