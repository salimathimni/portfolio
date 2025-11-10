const chatBox = document.getElementById('chat-box');
const chatbot = document.querySelector('.chatbot-floating');
const minimizeBtn = document.querySelector('.minimize-btn');

const info = {
    "age": "il est né le 18 avril 2003.",
    "nom": "Salim Athimni",
    "poste": "est un étudiant en 3ᵉ année de Licence en Sciences Informatiques, spécialisé en Génie Logiciel",
    "formation": "Licence en Sciences Informatiques – Génie Logiciel à l’Université de Gabès, Institut Supérieur d’Informatique de Médenine. Baccalauréat en Sciences Informatiques au Lycée de Bardo, Tunis.",
    "email": "salim.athimni@gmail.com",
    "téléphone": "+216 90 335 581",
    "adresse": "12 Rue 4186 Ezzouhour 1 Tunis, Tunisie",
    "front-end": "HTML5, CSS3, JavaScript, TypeScript, React, Angular, Vue.js, Android Studio, Ionic",
    "back-end": "Python, Java, PHP (Laravel), C# (.NET Core), Node.js, SQL Server, MongoDB",
    "devops": "Git, GitHub, Docker, Agile/Scrum",
    "ai": "Data Science, Deep Learning, Machine Learning, Cloud AI, Analyse de données",
    "education": "Licence Sciences Informatiques - Génie Logiciel, Développement Web & Applications, Data Science, Linux, DevOps",
    "languages": "Arabe (langue maternelle), Français (courant), Anglais (intermédiaire), Allemand (débutant)",
    "projects": "Application de gestion de Transport (React/Node.js),............",
    "permis": "Permis de conduire Catégorie B, Scrum Foundation, .............................",
    "experience": "..............................",
    "skills": "Front-end (HTML5, CSS3, JS, React, Angular), Back-end (Python, Java, PHP, .NET), DevOps (Git, Docker, Cloud), AI (Data Science, Machine Learning), Montage video / Photoshop"
};

const keywords = {
    "age": ["age","naissance","old","vie"],
    "nom": ["nom","qui","personne","toi","salim"],
    "poste": ["poste","travail","métier","profession","job","work"],
    "formation": ["formation","études","université","licence","diplôme","bac"],
    "email": ["email","mail","courriel","contact"],
    "téléphone": ["téléphone","numéro","tél","portable","appel"],
    "adresse": ["adresse","habite","ville","tunis"],
    "front-end": ["front","html","css","javascript","react","angular"],
    "back-end": ["back","python","java","php","node","sql","net"],
    "devops": ["devops","git","docker","cloud","scrum","agile","azure"],
    "ai": ["ai","data","machine","learning","deep","intelligence","analyse"],
    "education": ["formation","éducation","cours","diplôme"],
    "languages": ["langue","arabic","français","anglais","allemand"],
    "projects": ["projet","portfolio","github","réalisations"],
    "permis": ["permis","conduire","certification"],
    "experience": ["expérience","stage","freelance","travail","emploi"],
    "skills": ["compétence","skills","savoir","aptitude","technique"]
};

function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);

    const textLower = text.toLowerCase();
    let response = "Désolé, je ne comprends pas votre question. Veuillez vérifier votre question en français.";

    // 🔹 Nouvelle logique : garder l’ordre des mots détectés
    let matches = [];
    for (let key in keywords) {
        for (let word of keywords[key]) {
            const index = textLower.indexOf(word);
            if (index !== -1 && info[key]) {
                matches.push({ index, value: info[key] });
                break;
            }
        }
    }

    if (matches.length > 0) {
        matches.sort((a, b) => a.index - b.index);

        // 🔹 Si "nom" est présent, le placer en premier
        const nomMatch = matches.find(m => m.value === info.nom);
        if (nomMatch) {
            matches = [nomMatch, ...matches.filter(m => m !== nomMatch)];
        }

        response = matches.map(m => m.value).join(" , ");
    }else {
        if (textLower.includes("bonjour") || textLower.includes("salut") || textLower.includes("hello") || textLower.includes("hi") || textLower.includes("hey"))
            response = "Bonjour ! Je suis l'assistant de Salim. Comment puis-je vous aider ?";
        else if (textLower.includes("merci") || textLower.includes("thank you") || textLower.includes("thank u") || textLower.includes("thanks"))
            response = "Je vous en prie !";
        else if (textLower.includes("disponible"))
            response = "Salim est disponible pour des opportunités en développement Full Stack ou IA.";
    }

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        botMsg.textContent = response;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);

    input.value = '';
}

document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

minimizeBtn.addEventListener('click', function() {
    chatbot.classList.toggle('minimized');
    minimizeBtn.className = chatbot.classList.contains('minimized')
        ? 'fas fa-plus minimize-btn'
        : 'fas fa-minus minimize-btn';
});


const images = document.querySelectorAll('.projects img');
const lis = document.querySelectorAll('.project-list li');

images.forEach(img => {
  img.addEventListener('mouseover', () => {
    const index = img.dataset.index;
    lis.forEach(li => li.classList.remove('active'));
    lis[index].classList.add('active');
  });
  img.addEventListener('mouseout', () => {
    lis.forEach(li => li.classList.remove('active'));
  });
});
