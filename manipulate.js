const QUESTIONS_API_BASE_URL = 'https://www.algoexpert.io/api/fe/questions';

async function fetchQuestions() {
    // Fetch questions from the API
    const response = await fetch(QUESTIONS_API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch questions from API');
    }
    const questions = await response.json();
    return questions;
}

function getQuestionsByCategory(questions) {
    // Organize questions by category
    const questionsByCategory = {};
    questions.forEach(question => {
        if (!questionsByCategory[question.category]) {
            questionsByCategory[question.category] = [];
        }
        questionsByCategory[question.category].push(question);
    });
    return questionsByCategory;
}

function createCategory(category, questions) {
    // Create and return an HTML element for a category
    const div = document.createElement('div');
    div.classList.add('category');
    
    const h2 = document.createElement('h2');
    h2.textContent = category;
    div.appendChild(h2);

    // Loop through the questions and add them to the div
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = question.title;
        questionDiv.appendChild(questionTitle);
        
        // Add more content from the question (e.g., description)
        const questionDescription = document.createElement('p');
        questionDescription.textContent = question.description;
        questionDiv.appendChild(questionDescription);
        
        div.appendChild(questionDiv);
    });

    return div;
}

window.addEventListener('load', async () => {
    try {
        // Fetch the questions
        const questions = await fetchQuestions();

        // Get the questions organized by category
        const questionsByCategory = getQuestionsByCategory(questions);

        // Target element where the content will be displayed
        const mainDataElement = document.getElementById('maindata');

        // Create and append category sections to the target element
        for (const category in questionsByCategory) {
            const categorySection = createCategory(category, questionsByCategory[category]);
            mainDataElement.appendChild(categorySection);
        }
    } catch (error) {
        console.error('Error fetching or displaying questions:', error);
    }
});
