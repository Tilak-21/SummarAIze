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

const promptBox = document.getElementById('prompt-box');
const aiButton = document.getElementById('ai-button');
const outputArea = document.getElementById('outputArea');

const text = aiButton.addEventListener('click', () => {

      // Create a new paragraph element
      const newParagraph = document.createElement('p');
      newParagraph.textContent = "Welcome to summarAIze, a tool designed to provide real-time feedback for students. We are currently in the development phase and appreciate your feedback."
      // Append the new paragraph to the output area
      outputArea.appendChild(newParagraph);
})

document.getElementById('rubricButton').addEventListener('click', function() {
      document.getElementById('rubric-container').style.display = 'block';
      document.getElementById('file-container').style.display = 'none';
  });
  
  document.getElementById('fileButton').addEventListener('click', function() {
      document.getElementById('rubric-container').style.display = 'none';
      document.getElementById('file-container').style.display = 'flex';
  });

//grab the text from the rubric tab's textbox
aiButton.addEventListener('click', function () {
    let rubric = document.getElementById('textbox').value;
  });

async function fetchProcessedData() {
    const response = await fetch("http://localhost:5000/api/processed-data");
    const data = await response.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

async function sendToAI() {
    const response = await fetch("http://localhost:5000/api/processed-data");
    const processedData = await response.json();

    const aiResponse = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData)
    });

    const result = await aiResponse.json();
    document.getElementById("output").textContent = "AI Analysis Result: " + JSON.stringify(result, null, 2);
}

async function processData() {
    const response = await fetch("/api/process-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    document.getElementById("output1").innerText = result.message;
}

async function fetchProcessedData() {
    try {
        const response = await fetch("/api/processed-data");
        const data = await response.json();

        // Display raw JSON in the <pre> tag (for debugging)
        // document.getElementById("output").innerText = JSON.stringify(data, null, 2);

        // Ensure the data is an array before processing
        const students = Array.isArray(data) ? data : Object.values(data);

        // Get the output area and clear previous content
        const outputArea = document.getElementById("outputArea");
        outputArea.innerHTML = ""; 
        outputArea.classList.add("grid-container");

        // Loop through student data and create individual containers
        students.forEach(student => {
            const studentDiv = document.createElement("div");
            studentDiv.classList.add("student-box");

            studentDiv.innerHTML = `
                <p><strong>ID:</strong> ${student.id}</p>
                <p><strong>Quiz ID:</strong> ${student.quiz_id}</p>
                <p><strong>Score:</strong> ${student.score}</p>
                <p><strong>Course ID:</strong> ${student.course_id}</p>
                <p><strong>Attempt:</strong> ${student.attempt}</p>
            `;

            outputArea.appendChild(studentDiv);
        });

    } catch (error) {
        console.error("Error fetching processed data:", error);
        document.getElementById("outputArea").innerHTML = `<p style="color: red;">Failed to fetch data</p>`;
    }
}

// Attach event listener to the "View Processed Data" button
document.getElementById("view-data-btn").addEventListener("click", fetchProcessedData);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("process-data-btn").addEventListener("click", processData);
    document.getElementById("view-data-btn").addEventListener("click", fetchProcessedData);
});
