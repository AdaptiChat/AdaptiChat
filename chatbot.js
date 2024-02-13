async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const emotion = analyzeEmotion(userInput); // Simplified emotion analysis
    const prompt = generatePrompt(userInput, emotion);
    const response = await callGPTAPI(prompt);
    displayResponse(response);
}

function analyzeEmotion(text) {
    if (text.includes("sad") || text.includes("unhappy")) {
        return 'sadness';
    } else if (text.includes("happy") || text.includes("joy")) {
        return 'happiness';
    }
    // Add more conditions as needed
    return 'neutral';
}

function generatePrompt(text, emotion) {
    let prompt = `User says: "${text}"\n`;
    switch (emotion) {
        case 'sadness':
            prompt += "Chatbot (with empathy for sadness): ";
            break;
        case 'happiness':
            prompt += "Chatbot (with joy and excitement): ";
            break;
        default:
            prompt += "Chatbot: ";
    }
    return prompt;
}

async function callGPTAPI(prompt) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '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'
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].text;
}

function displayResponse(response) {
    document.getElementById('response').innerText = `Chatbot: ${response}`;
}
