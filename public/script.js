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
