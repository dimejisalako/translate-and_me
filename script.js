// Dictionary of common words in English and their translations
const dictionary = {
    "hello": {
        "yoruba": "Pẹlẹ o",
        "hausa": "Sannu",
        "igbo": "Ndewo"
    },
    "good": {
        "yoruba": "Dara",
        "hausa": "Da kyau",
        "igbo": "Ọma"
    },
    "water": {
        "yoruba": "Omi",
        "hausa": "Ruwa",
        "igbo": "Mmiri"
    },
    "food": {
        "yoruba": "Ounje",
        "hausa": "Abinci",
        "igbo": "Nri"
    },
    "school": {
        "yoruba": "Ile-ẹkọ",
        "hausa": "Makaranta",
        "igbo": "Ulo akwukwo"
    },
    "mother": {
        "yoruba": "Iya",
        "hausa": "Uwa",
        "igbo": "Nne"
    },
    "father": {
        "yoruba": "Baba",
        "hausa": "Uba",
        "igbo": "Nna"
    },
    "thank you": {
        "yoruba": "O ṣeun",
        "hausa": "Na gode",
        "igbo": "Daalụ"
    }
};

// DOM Elements
const translateBtn = document.getElementById('translate-btn');
const englishInput = document.getElementById('english-word');
const yorubaResult = document.getElementById('yoruba-result');
const hausaResult = document.getElementById('hausa-result');
const igboResult = document.getElementById('igbo-result');
const wordChips = document.querySelectorAll('.chip');

// Translate function
function translateWord() {
    const word = englishInput.value.toLowerCase().trim();
    
    if (word === "") {
        alert("Please enter a word to translate");
        return;
    }
    
    if (dictionary[word]) {
        yorubaResult.textContent = dictionary[word].yoruba;
        hausaResult.textContent = dictionary[word].hausa;
        igboResult.textContent = dictionary[word].igbo;
    } else {
        yorubaResult.textContent = "Translation not available";
        hausaResult.textContent = "Translation not available";
        igboResult.textContent = "Translation not available";
    }
}

// Event Listeners
translateBtn.addEventListener('click', translateWord);

// Allow Enter key to trigger translation
englishInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        translateWord();
    }
});

// Add click event to word chips
wordChips.forEach(chip => {
    chip.addEventListener('click', function() {
        englishInput.value = this.textContent;
        translateWord();
    });
});