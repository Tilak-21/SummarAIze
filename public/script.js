document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("process-data-btn").addEventListener("click", processData);
    document.getElementById("view-data-btn").addEventListener("click", fetchProcessedData);
    document.getElementById("analyze-data-btn").addEventListener("click", sendToAI);
});

async function processData() {
    try {
        const response = await fetch("/api/process-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        document.getElementById("output1").innerText = result.message;
    } catch (error) {
        document.getElementById("output1").innerText = "Error processing data!";
        console.error("Error:", error);
    }
}

async function fetchProcessedData() {
    try {
        const response = await fetch("/api/processed-data");
        const data = await response.json();
        const students = Array.isArray(data.quiz_submissions) ? data.quiz_submissions : Object.values(data.quiz_submissions);

        const outputArea = document.getElementById("outputStudentInfo");
        outputArea.innerHTML = ""; 
        outputArea.classList.add("grid-container");

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
        document.getElementById("outputStudentInfo").innerHTML = `<p style="color: red;">Failed to fetch data</p>`;
    }
}

document.getElementById("view-data-btn").addEventListener("click", async function () {
    console.log("Fetching processed data...");  // Debugging
    try {
        const response = await fetch("http://localhost:6969/api/processed-data");
        console.log("Response received:", response);  // Debugging
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Processed Data:", data);  // Debugging

        const outputArea = document.getElementById("outputArea");
        outputArea.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error fetching processed data:", error);
        document.getElementById("outputArea").innerHTML = `<p style="color: red;">Failed to fetch data</p>`;
    }
});


document.getElementById('rubricButton').addEventListener('click', function() {
    document.getElementById('rubric-container').style.display = 'block';
    document.getElementById('file-container').style.display = 'none';
});

document.getElementById('fileButton').addEventListener('click', function() {
    document.getElementById('rubric-container').style.display = 'none';
    document.getElementById('file-container').style.display = 'block';
});

document.getElementById('ai-button').addEventListener('click', function () {
    let rubric = document.getElementById('textbox').value;
    const outputArea = document.getElementById("outputArea");
    outputArea.innerHTML = `<p>Rubric Text: ${rubric}</p>`;
});