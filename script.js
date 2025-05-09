const API_URL = "https://api.mymemory.translated.net/get";
const LANG_CODES = { yoruba: "yo", hausa: "ha", igbo: "ig" };

const dictionary = {
    "hello": { yoruba: "Pẹlẹ o", hausa: "Sannu", igbo: "Ndewo" },
    "good": { yoruba: "Dara", hausa: "Da kyau", igbo: "Ọma" },
    "water": { yoruba: "Omi", hausa: "Ruwa", igbo: "Mmiri" },
    "food": { yoruba: "Ounje", hausa: "Abinci", igbo: "Nri" },
    "school": { yoruba: "Ile-ẹkọ", hausa: "Makaranta", igbo: "Ulo akwukwo" },
    "mother": { yoruba: "Iya", hausa: "Uwa", igbo: "Nne" },
    "father": { yoruba: "Baba", hausa: "Uba", igbo: "Nna" },
    "thank you": { yoruba: "O ṣeun", hausa: "Na gode", igbo: "Daalụ" }
};

const translateBtn = document.getElementById('translate-btn');
const englishInput = document.getElementById('english-word');
const wordChips = document.querySelectorAll('.chip');
const loadingIndicator = document.getElementById('loading');

const results = {
    yoruba: document.getElementById('yoruba-result'),
    hausa: document.getElementById('hausa-result'),
    igbo: document.getElementById('igbo-result')
};

translateBtn.addEventListener('click', translateWord);
englishInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') translateWord();
});

wordChips.forEach(chip => {
    chip.addEventListener('click', () => {
        englishInput.value = chip.textContent;
        translateWord();
    });
});

async function translateWord() {
    const word = englishInput.value.toLowerCase().trim();
    if (!word) return alert("Please enter a word");

    if (dictionary[word]) {
        displayResults(dictionary[word]);
        return;
    }

    loadingIndicator.style.display = 'block';
    try {
        const [yoruba, hausa, igbo] = await Promise.all([
            fetchTranslation(word, "yoruba"),
            fetchTranslation(word, "hausa"),
            fetchTranslation(word, "igbo")
        ]);

        const translations = { yoruba, hausa, igbo };
        dictionary[word] = translations;
        displayResults(translations);
    } catch (error) {
        console.error(error);
        displayError();
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

async function fetchTranslation(word, lang) {
    const url = `${API_URL}?q=${encodeURIComponent(word)}&langpair=en|${LANG_CODES[lang]}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.responseData?.translatedText || "Translation not available";
}

function displayResults(translations) {
    for (let lang in results) {
        results[lang].textContent = translations[lang] || "Translation not available";
    }
}

function displayError() {
    for (let lang in results) {
        results[lang].textContent = "Error loading translation";
    }
}
