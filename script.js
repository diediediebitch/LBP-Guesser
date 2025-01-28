const episodeDropdown = document.getElementById('episode-dropdown');
const episodeImage = document.getElementById('episode-image');
const scoreDisplay = document.getElementById('score');
const feedbackDisplay = document.getElementById('feedback');

let episodes = []; // Array to hold episode names
let currentEpisode = null;
let score = 0;

let highScoreKey = 'highScore_LBP'; // Unique key for LBP high score
// Retrieve saved values from localStorage or initialize with defaults
let gameData = JSON.parse(localStorage.getItem(highScoreKey)) || {
    highScore: 0,
    correctGuesses: 0,
    incorrectGuesses: 0
};

// Ensure values are numbers and default to 0 if missing or invalid
let highScore = gameData.highScore || 0;
let correctGuesses = gameData.correctGuesses || 0;
let incorrectGuesses = gameData.incorrectGuesses || 0;

// Function to load photo names (you can hardcode them for now)
function loadEpisodes() {
    episodes = [
    "1-1 Introduction",
    "1-2 First Steps",
    "1-3 Get A Grip",
    "1-4 Skate To Victory",
    "2-1 Swinging Safari",
    "2-2 Burning Forest",
    "2-3 The Meerkat Kingdom",
    "3-1 The Wedding Reception",
    "3-2 The Darkness",
    "3-3 Skulldozer",
    "4-1 Boom Town",
    "4-2 The Mines",
    "4-3 Serpent Shrine",
    "5-1 Lowrider",
    "5-2 Subway",
    "5-3 The Construction Site",
    "6-1 Endurance Dojo",
    "6-2 Sensei's Lost Castle",
    "6-3 The Terrible Oni's Volcano",
    "7-1 The Dancer's Court",
    "7-2 Elephant Temple",
    "7-3 Great Magician's Palace",
    "8-1 The Frozen Tundra",
    "8-2 The Bunker",
    "8-3 The Collector's Lair",
    "8-4 The Collector",
    ];

    episodes.forEach(episode => {
        const option = document.createElement('option');
        option.value = episode;
        option.textContent = episode;
        episodeDropdown.appendChild(option);
    });
	
	// Initialize the score display
    updateScoreDisplay();

    // Start the game by selecting a random level and photo
    startGame();
}


// Function to update the score and ratio display
function updateScoreDisplay() {
    let totalGuesses = correctGuesses + incorrectGuesses;
    let ratio = totalGuesses > 0 ? ((correctGuesses / totalGuesses) * 100).toFixed(2) : '0.00';

    scoreDisplay.innerHTML = `
        Score: ${score} | High Score: ${highScore}<br>
        <br>Ratio: ${ratio}%<br>
        Correct: ${correctGuesses} | Incorrect: ${incorrectGuesses}
    `;
}


// Function to start the game
function startGame() {
    const randomIndex = Math.floor(Math.random() * episodes.length);
    currentEpisode = episodes[randomIndex];

    // Get a random photo from the level's folder
    const randomFrame = getRandomFrame();
    episodeImage.src = `frames/${currentEpisode}/${randomFrame}`; // Set the image source to the random photo
}

// Function to get a random photo
function getRandomFrame() {
    const frameNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    const formattedNumber = String(frameNumber).padStart(3, '0'); // Format as "001" to "010"
    return `photo_${formattedNumber}.png`;
}

// Function to reset the score
function resetScore() {
    if (confirm("Are you sure you want to reset your score?")) {
        score = 0; // Reset the current score
        correctGuesses = 0; // Reset correct guesses
        incorrectGuesses = 0; // Reset incorrect guesses
        highScore = 0; // Reset high score
        localStorage.setItem(highScoreKey, highScore); // Update high score in localStorage
        updateScoreDisplay(); // Update the display
        alert("Score has been reset!"); // Optional alert
    }
}

// Event listener for the reset score button
document.getElementById('reset-score').addEventListener('click', resetScore);

// Function to check guess
document.getElementById('submit-guess').addEventListener('click', () => {
    const userGuess = episodeDropdown.value;
    if (userGuess === currentEpisode) {
        score++;
		correctGuesses++; // Increase correct guesses
        feedbackDisplay.textContent = "Correct!";
    } else {
		incorrectGuesses++; // Increase incorrect guesses
        feedbackDisplay.textContent = `Incorrect! It was ${currentEpisode}.`;
        // Reset score if guess is incorrect
        score = 0;
    }

    // Check if current score is a new high score
    if (score > highScore) {
        highScore = score;
    }
	
	    // Save all data to localStorage
    localStorage.setItem(highScoreKey, JSON.stringify({
        highScore,
        correctGuesses,
        incorrectGuesses
    }));
	
    // Update the score display
    updateScoreDisplay();
    startGame(); // Start a new game round
});

// Load the levels on page load
loadEpisodes();
