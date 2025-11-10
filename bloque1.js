//Bloquer clic droit et sélection
document.addEventListener('contextmenu', e => { e.preventDefault(); flashMessage("Action non autorisée"); });
document.addEventListener('selectstart', e => { e.preventDefault(); flashMessage("Action non autorisée"); });
document.addEventListener('dragstart', e => { e.preventDefault(); flashMessage("Action non autorisée"); });


//Bloquer raccourcis courants (F12, Ctrl+S, Ctrl+U, Ctrl+Shift+I/C)
document.addEventListener('keydown', function(e) {
const key = (e.key || '').toString();
const blocked = (
key === 'F12' ||
(e.ctrlKey && (key.toLowerCase() === 's' || key.toLowerCase() === 'u')) ||
(e.ctrlKey && e.shiftKey && (key.toLowerCase() === 'i' || key.toLowerCase() === 'c'))
);
if (blocked) {
e.preventDefault();
e.stopPropagation();
flashMessage("Action non autorisée");
}
});

// petit message utilisateur
function flashMessage(text) {
try {
let el = document.getElementById('__flash_msg_protect');
if (!el) {
el = document.createElement('div');
el.id = '__flash_msg_protect';
Object.assign(el.style, {
position: 'fixed', top: '10px', right: '10px', background: '#f44', color: '#fff',
padding: '8px 12px', borderRadius: '6px', zIndex: 9999999, fontFamily: 'sans-serif'
});
document.body.appendChild(el);
}
el.textContent = text;
setTimeout(() => el.remove(), 1200);
} catch (err) {}
}
