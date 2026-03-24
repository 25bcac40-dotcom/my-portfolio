// ==================
// AUTH CHECK
// ==================
function checkAuth() {
  if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = 'login.html';
  }
}
```

Save it, then in Command Prompt:
```
git add .
git commit -m "fix auth redirect"
git push

function logout() {
  sessionStorage.clear();
  window.location.href = '/login.html';
}

// ==================
// LOGIN PAGE
// ==================
function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(tab + '-panel').classList.add('active');
  event.target.classList.add('active');
}

async function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-pass').value.trim();
  const msg = document.getElementById('login-msg');
  msg.className = 'msg';

  if (!email || !password) {
    msg.textContent = '⚠️ Please fill in all fields.';
    msg.className = 'msg error'; return;
  }
  try {
    const res = await fetch('https://mokshamarys-space.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('userEmail', data.email);
      msg.textContent = '✅ Login successful! Redirecting...';
      msg.className = 'msg success';
      setTimeout(() => window.location.href = '/index.html', 1000);
    } else {
      msg.textContent = '❌ ' + data.error;
      msg.className = 'msg error';
    }
  } catch {
    msg.textContent = '❌ Could not connect to server.';
    msg.className = 'msg error';
  }
}

async function register() {
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-pass').value.trim();
  const password2 = document.getElementById('reg-pass2').value.trim();
  const msg = document.getElementById('reg-msg');
  msg.className = 'msg';

  if (!email || !password || !password2) {
    msg.textContent = '⚠️ Please fill in all fields.';
    msg.className = 'msg error'; return;
  }
  if (password !== password2) {
    msg.textContent = '⚠️ Passwords do not match.';
    msg.className = 'msg error'; return;
  }
  try {
    const res = await fetch('https://mokshamarys-space.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      msg.textContent = '✅ Account created! You can now login.';
      msg.className = 'msg success';
      setTimeout(() => switchTab('login'), 1500);
    } else {
      msg.textContent = '❌ ' + data.error;
      msg.className = 'msg error';
    }
  } catch {
    msg.textContent = '❌ Could not connect to server.';
    msg.className = 'msg error';
  }
}

// ==================
// CONTACT FORM
// ==================
async function sendMessage() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const msg = document.getElementById('form-msg');
  msg.className = 'msg';

  if (!name || !email || !message) {
    msg.textContent = '⚠️ Please fill in all fields.';
    msg.className = 'msg error'; return;
  }
  try {
    const res = await fetch('https://mokshamarys-space.onrender.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    const data = await res.json();
    if (data.success) {
      msg.textContent = '✅ Message sent! Thank you.';
      msg.className = 'msg success';
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
    }
  } catch {
    msg.textContent = '❌ Could not connect to server.';
    msg.className = 'msg error';
  }
}

// ==================
// SHOW USER EMAIL
// ==================
function showUserEmail() {
  const email = sessionStorage.getItem('userEmail');
  const el = document.getElementById('user-email');
  if (email && el) el.textContent = email;
}