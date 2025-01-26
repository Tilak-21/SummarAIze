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

