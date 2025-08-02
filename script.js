// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDV8PNIhIxqIFx21p5WesRsZwN8UtYxtBA",
    authDomain: "theloginpage-e9d0d.firebaseapp.com",
    projectId: "theloginpage-e9d0d",
    storageBucket: "theloginpage-e9d0d.appspot.com",
    messagingSenderId: "580143980611",
    appId: "1:580143980611:web:1b1a21beb48ee84cb5f4f6"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const resetForm = document.getElementById('reset-form');
const messageEl = document.getElementById('message');
const logoutBtn = document.getElementById('btn-logout');
const redirectBtn = document.getElementById('btn-redirect');

// Message handler (improved)
function showMessage(msg, isError = false) {
    messageEl.textContent = msg;
    messageEl.classList.remove('error', 'success');
    messageEl.classList.add(isError ? 'error' : 'success');
}

// Field clear utility
function clearFields() {
    ['reg-name', 'reg-surname', 'reg-age', 'reg-gender', 'reg-birthday', 'reg-email', 'reg-password',
        'login-email', 'login-password', 'reset-email'
    ]
    .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
}

// UI Switching
function showForm(formToShow) {
    [loginForm, registerForm, resetForm].forEach(f => f.classList.add('hidden'));
    formToShow.classList.remove('hidden');
    messageEl.textContent = "";
    clearFields();
}

// Event Bindings
document.getElementById('btn-show-register').onclick = () => showForm(registerForm);
document.getElementById('btn-show-login-from-register').onclick = () => showForm(loginForm);
document.getElementById('btn-show-login-from-reset').onclick = () => showForm(loginForm);
document.getElementById('btn-show-reset').onclick = () => showForm(resetForm);

// Register
document.getElementById('btn-register').onclick = () => {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    if (!name || !email || !password) {
        showMessage("❌ Please fill all required fields!", true);
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            showMessage(`✅ Welcome ${name}! Please login now.`);
            setTimeout(() => showForm(loginForm), 2000);
        })
        .catch(error => showMessage(`❌ ${error.message}`, true));
};

// Login
document.getElementById('btn-login').onclick = () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showMessage("❌ Enter email and password!", true);
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            localStorage.setItem("isLoggedIn", "true");
            showMessage(`🐶 Welcome ${user.user.email}!`);
            logoutBtn.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = "https://rohanplayhub.netlify.app/";
            }, 1500);
        })
        .catch(error => showMessage(`❌ ${error.message}`, true));
};

// Google Sign In
document.getElementById('btn-google-signin').onclick = () => {
    if (auth.currentUser) {
        showMessage(`⚠️ You're already logged in!`, true);
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            localStorage.setItem("isLoggedIn", "true");
            showMessage(`🎉 Hello ${result.user.displayName}!`);
            logoutBtn.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = "https://rohanplayhub.netlify.app/";
            }, 1500);
        })
        .catch(error => showMessage(`❌ ${error.message}`, true));
};

// Password Reset
document.getElementById('btn-reset-password').onclick = () => {
    const email = document.getElementById('reset-email').value.trim();

    if (!email) {
        showMessage("❌ Enter your email!", true);
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            showMessage(`✅ Reset email sent to ${email}`);
            setTimeout(() => showForm(loginForm), 4000);
        })
        .catch(error => showMessage(`❌ ${error.message}`, true));
};

// Logout
logoutBtn.onclick = () => {
    auth.signOut().then(() => {
        localStorage.removeItem("isLoggedIn");
        showMessage("👋 Logged out successfully!");
        logoutBtn.classList.add('hidden');
        redirectBtn.classList.add('hidden');
        setTimeout(() => window.location.reload(), 1000);
    }).catch(error => showMessage(`❌ ${error.message}`, true));
};

// On Load
window.onload = () => {
    auth.onAuthStateChanged(user => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (user && isLoggedIn) {
            logoutBtn.classList.remove('hidden');
            redirectBtn.classList.remove('hidden');
        } else {
            logoutBtn.classList.add('hidden');
            redirectBtn.classList.add('hidden');
        }
    });
};

// Redirect Btn
redirectBtn.onclick = () => {
    window.location.href = "https://rohanplayhub.netlify.app/";
};


// ***************************************************************************************************************


window.addEventListener("load", function() {
    const hash = window.location.hash;

    if (hash) {
        // Sabhi elements jinme id ho — aur div ya section tag ho — unko hide karo
        const allSections = document.querySelectorAll("div[id], section[id]");
        allSections.forEach((el) => {
            el.style.display = "none";
        });

        // URL ke hash se jo id mili hai usko show karo
        const target = document.querySelector(hash);
        if (target) {
            target.style.display = "block";
        }
    }
});

// ***********************************************Inspect section Blocking*********************************************************



document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});




document.onkeydown = function(e) {
    if (e.keyCode === 123) return false; // F12
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false; // Ctrl+Shift+I
    if (e.ctrlKey && e.keyCode === 85) return false; // Ctrl+U
    if (e.ctrlKey && e.keyCode === 83) return false; // Ctrl+S
};


// ************************************************Code Copy Blocking***********************************************************************************


document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', 'Copying is disabled!');
    e.preventDefault();
});

