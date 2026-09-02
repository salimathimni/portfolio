const chatBox = document.getElementById('chat-box');
const chatbot = document.querySelector('.chatbot-floating');
const minimizeBtn = document.querySelector('.minimize-btn');

/* ============================================================
   BASE DE CONNAISSANCE — toutes les informations disponibles
   ============================================================ */
const info = {
    // Identité
    "nom": "Salim Athimni",
    "age": "Salim est né le 18 avril 2003.",
    "poste": "Salim est technicien supérieur en Génie logiciel et systèmes d'information (Domaine : Sciences exactes et technologies · Sujet : Sciences de l'information).",
    "formation": "Il a étudié dans le domaine des Sciences informatiques : technicien supérieur en Génie logiciel et systèmes d'information, après une Licence en Sciences Informatiques – Génie Logiciel à l'Université de Gabès (Institut Supérieur d'Informatique de Médenine) et un Baccalauréat en Sciences Informatiques au Lycée de Bardo, Tunis.",

    // Contact
    "email": "Contact e-mail : salim.athimni@gmail.com.",
    "téléphone": "Son numéro de téléphone : +216 90 335 581.",
    "adresse": "Adresse : 12 Rue 4186 Ezzouhour 1, Tunis, Tunisie.",
    "reseaux": "Profils : LinkedIn → https://www.linkedin.com/in/salim-athimni/ · GitHub → https://github.com/salimathimni",

    // Compétences
    "front-end": "Compétences Front-end : HTML5, CSS3, JavaScript, TypeScript, React, Angular, Vue.js, Ionic, Android Studio.",
    "back-end": "Compétences Back-end : Python, Java, PHP (Laravel), C# (.NET Core), Node.js, SQL Server, MongoDB.",
    "devops": "Compétences DevOps : Git, GitHub, Docker, Virtualisation et cloud, CI/CD, Agile/Scrum.",
    "reseau": "Compétences systèmes & réseaux : Réseaux (routage, pare-feu), Virtualisation, Sécurité informatique.",
    "ai": "Intelligence Artificielle : Data Science, Deep Learning, Machine Learning, Cloud AI, Analyse de données, Vision par ordinateur.",
    "langues": "Langues : arabe (langue maternelle), français (courant), anglais (intermédiaire), allemand (débutant).",
    "montage": "Compétence supplémentaire : Montage vidéo et Photoshop.",
    "permis": "Permis de conduire Catégorie B · Certification Scrum Foundation.",
    "skills": "Compétences techniques : Front-end (HTML5, CSS3, JavaScript, React, Angular, Vue.js, Ionic, Android Studio), Back-end (Python, Java, PHP, C#, Node.js, SQL Server, MongoDB), DevOps (Git, GitHub, Docker, Virtualisation & cloud, Agile/Scrum), IA & Data (Data Science, Machine Learning, Deep Learning, Vision par ordinateur), Réseaux & sécurité, Montage vidéo / Photoshop.",

    // Expérience
    "experience": "Salim a réalisé 8 projets concrets (dont 2 projets de fin d'études) couvrant la vision par ordinateur, la sécurité réseau, le cloud, la cryptographie, l'éducation et le transport. Consultez la section « Projets » de son portfolio.",

    // Projets (vue d'ensemble)
    "projects": "Salim a réalisé 8 projets : détection d'âge par analyse faciale · détection d'accès interdit · installation d'un pare-feu pfSense sur Hyper-V · déploiement cloud automatisé (Docker/VM) · chiffrement de données par clés aléatoires · plateforme éducative d'apprentissage de l'anglais (PFE) · système d'alarme intelligent · plateforme de transport urbain en Tunisie (PFE).",

    // Projets individuels
    "p_age": "MOD-01 — Détection d'âge par analyse faciale : un modèle de vision par ordinateur (Deep Learning) estime si une personne a plus de 12 ans à partir de son visage.",
    "p_acces": "MOD-02 — Détection d'accès interdit : un modèle de reconnaissance faciale identifie les personnes interdites d'accès à un lieu ou à un système.",
    "p_pfsense": "MOD-03 — Pare-feu pfSense sur Hyper-V : installation et configuration de pfSense sur Hyper-V, avec la mise en place des premières règles de pare-feu pour sécuriser le réseau et contrôler le trafic entrant et sortant.",
    "p_cloud": "MOD-04 — Déploiement cloud automatisé : déploiement de projets sur le cloud via machines virtuelles et conteneurs Docker, avec automatisation du déploiement en temps réel (CI/CD).",
    "p_chiffre": "MOD-05 — Chiffrement de données par clés aléatoires : système de chiffrement garantissant la confidentialité des informations grâce à la génération de clés aléatoires.",
    "p_anglais": "MOD-06 (PFE) — Plateforme éducative d'apprentissage de l'anglais : plateforme interactive pour rendre l'apprentissage de l'anglais simple et accessible aux élèves du primaire, du collège et du lycée.",
    "p_alarme": "MOD-07 — Système d'alarme intelligent : détection d'incidents à domicile avec envoi automatique d'alertes par e-mail ou WhatsApp.",
    "p_transport": "MOD-08 (PFE) — Plateforme de transport urbain (Tunisie) : consultation et suivi en temps réel des horaires et trajets de bus grâce à la géolocalisation GPS.",
};

/* ============================================================
   MOTEUR DE RECONNAISSANCE
   Normalise les accents/majuscules, puis associe des mots-clés.
   ============================================================ */
function normalize(str) {
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')   // retire les accents
        .replace(/['’]/g, ' ')             // apostrophes -> espace (sinon les mots se collent)
        .replace(/[^a-z0-9]+/g, ' ')      // retire ponctuation
        .trim();
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasWord(text, word) {
    if (!word) return false;
    const re = new RegExp('\\b' + escapeRegex(word) + '\\b', 'i');
    return re.test(text);
}

/* Chaque catégorie = clé info + mots-clés (écrits SANS accents). */
const keywords = {
    "nom": ["nom", "salim", "qui es tu", "qui est", "appelle", "tu es qui", "presente toi"],
    "age": ["age", "naissance", "anniversaire", "nee le", "ne le", "quelle age", "quel age"],
    "poste": ["poste", "profession", "metier", "fonction", "role", "technicien", "superieur", "diplome actuel", "domaine", "specialisation", "specialite", "sciences exactes", "sciences de l information", "genie logiciel et systemes d information"],
    "formation": ["formation", "etude", "etudes", "universite", "institut", "licence", "diplome", "bac", "lycee", "ecole", "cursus", "scolaire", "a etudie", "etudie", "etudier", "parcours"],
    "email": ["email", "mail", "courriel", "joindre", "ecrire"],
    "téléphone": ["telephone", "numero", "tel", "portable", "appel", "appele", "whatsapp", "sms", "contacter"],
    "adresse": ["adresse", "domicile", "habite", "habitation", "ou vit", "ville", "vit il"],
    "reseaux": ["linkedin", "github", "lien", "reseau social", "reseaux sociaux", "profil", "site web", "gitlab"],
    "front-end": ["front", "front-end", "frontend", "html", "css", "javascript", "typescript", "react", "angular", "vue", "ionic", "android", "interface"],
    "back-end": ["back", "back-end", "backend", "python", "java", "php", "laravel", "node", "nodejs", "sql", "mongodb", "dotnet", "net", "serveur", "csharp", "c#"],
    "devops": ["devops", "git", "github", "docker", "cloud", "scrum", "agile", "azure", "aws", "deploiement", "ci", "container", "conteneur", "vm", "virtualisation", "cy"],
    "reseau": ["reseau", "routeur", "routage", "pare feu", "pare-feu", "firewall", "securite", "hyper-v", "hyperv", "systeme"],
    "ai": ["ai", "ia", "machine", "deep", "apprentissage", "intelligence", "data", "vision", "ordinateur", "neural", "modele", "predict"],
    "langues": ["langue", "langues", "arabe", "francais", "anglais", "allemand", "linguistique", "bilingue", "quel langage", "quelles langues"],
    "montage": ["montage", "photoshop", "video", "edition"],
    "permis": ["permis", "conduire", "voiture", "certification", "certificat", "scrum foundation", "formation certifiante"],
    "experience": ["experience", "stage", "freelance", "emploi", "carriere", "parcours", "travaille", "exerce", "realise"],
    "skills": ["competence", "competences", "skills", "aptitude", "aptitudes", "savoir", "technologie", "technologies", "maitrise", "sait faire", "tech"],
    "projects": ["projet", "projets", "portfolio", "realisation", "realisations", "realise", "realises", "module", "pfe", "fin d etudes", "creation", "creations", "combien de projet"],

    // Projets individuels
    "p_age": ["detection d age", "age faciale", "age par analyse", "mod 01", "mod-01"],
    "p_acces": ["acces interdit", "reconnaissance faciale", "personne interdite", "interdit d acces", "mod 02", "mod-02"],
    "p_pfsense": ["pare feu", "pare-feu", "parefeu", "pfsense", "hyper-v", "hyperv", "regle de pare feu", "mod 03", "mod-03"],
    "p_cloud": ["deploiement cloud", "deploiement automatise", "contener docker", "machine virtuelle", "mod 04", "mod-04"],
    "p_chiffre": ["chiffrement", "chiffrer", "cryptographie", "cles aleatoire", "cle aleatoire", "mod 05", "mod-05"],
    "p_anglais": ["plateforme educative", "apprentissage de l anglais", "apprendre l anglais", "primaire", "mod 06", "mod-06"],
    "p_alarme": ["alarme", "alerte", "incident a domicile", "domicile", "mod 07", "mod-07"],
    "p_transport": ["transport", "bus", "geolocalisation", "gps", "urbain", "horaire", "trajet", "mod 08", "mod-08"],
};

/* Si une catégorie spécifique est trouvée, on ne renvoie pas le résumé "skills" générique */
const SPECIFIC = new Set(["front-end", "back-end", "devops", "reseau", "ai", "langues", "montage", "permis"]);

function detectCategories(textLower) {
    const found = [];
    for (const key in keywords) {
        if (!info[key]) continue;
        for (const word of keywords[key]) {
            if (hasWord(textLower, word)) {
                found.push(key);
                break;
            }
        }
    }
    const seen = new Set();
    const unique = [];
    for (const key of found) if (!seen.has(key)) { seen.add(key); unique.push(key); }

    const hasSpecific = unique.some(k => SPECIFIC.has(k));
    return hasSpecific ? unique.filter(k => k !== "skills") : unique;
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);

    const textLower = normalize(text);
    let response = "Désolé, je n'ai pas trouvé cette information dans le portfolio de Salim. Essayez de me demander son parcours, ses compétences, ses projets ou ses coordonnées.";

    /* 1) Détection par mots-clés */
    const cats = detectCategories(textLower);

    /* 2) Salutations / formules de politesse / divers */
    const isGreeting = /\b(bonjour|salut|hello|hi|hey|coucou|bonsoir)\b/.test(textLower);
    const isThanks   = /\b(merci|thank you|thanks|thank u|merci beaucoup)\b/.test(textLower);
    const isBye      = /\b(au revoir|bye|a bientot|a+)\b/.test(textLower);
    const isHelp     = /\b(aide moi|aider moi|que peux tu|que sais tu|comment ca marche|help)\b/.test(textLower);
    const isAvailable= /\b(disponible|disponibilite|embauche|recrute|opportunite)\b/.test(textLower);
    const isWho      = /\b(qui es tu|qui es|tu es qui|qui est salim|presente toi)\b/.test(textLower);

    if (cats.length > 0) {
        response = cats.map(c => info[c]).join("\n\n");
    } else if (isGreeting) {
        response = "Bonjour ! Je suis l'assistant de Salim. Posez-moi une question sur son parcours, ses compétences, ses projets ou ses coordonnées.";
    } else if (isThanks) {
        response = "Je vous en prie ! N'hésitez pas si vous avez d'autres questions sur Salim.";
    } else if (isBye) {
        response = "Au revoir ! À bientôt sur le portfolio de Salim.";
    } else if (isHelp) {
        response = "Je peux vous renseigner sur : son profil et ses coordonnées, sa formation, ses compétences techniques, ses 8 projets réalisés, ses langues et ses certifications. Dites-moi ce qui vous intéresse !";
    } else if (isAvailable) {
        response = "Salim est disponible pour des opportunités en développement web Full Stack et en Intelligence Artificielle. Vous pouvez le contacter via salim.athimni@gmail.com ou +216 90 335 581.";
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

/* Interactions éventuelles du portfolio (sécurisé si les éléments n'existent pas) */
const images = document.querySelectorAll('.projects img');
const lis = document.querySelectorAll('.project-list li');

images.forEach(img => {
  img.addEventListener('mouseover', () => {
    const index = img.dataset.index;
    lis.forEach(li => li.classList.remove('active'));
    if (lis[index]) lis[index].classList.add('active');
  });
  img.addEventListener('mouseout', () => {
    lis.forEach(li => li.classList.remove('active'));
  });
});
