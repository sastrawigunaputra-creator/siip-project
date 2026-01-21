// Autentikasi dan Session Management

// Fungsi Login
function handleLogin(email, password) {
  const user = database.users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    tampilAlert('danger', 'Email atau password salah!');
    return false;
  }

  // Simpan session
  setCurrentUser({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department
  });

  // Log ke audit trail
  addAuditLog('LOGIN', 'Authentication', `User ${user.name} berhasil login`, `Role: ${user.role}`);

  tampilAlert('success', `Selamat datang, ${user.name}!`);

  // Redirect sesuai role
  setTimeout(() => {
    if (user.role === 'admin') {
      window.location.href = 'admin/dashboard.html';
    } else {
      window.location.href = 'user/dashboard.html';
    }
  }, 1000);

  return true;
}

// Fungsi Logout
function handleLogout() {
  const user = getCurrentUser();
  if (user) {
    addAuditLog('LOGOUT', 'Authentication', `User ${user.name} logout`, '');
  }
  sessionStorage.removeItem('currentUser');
  window.location.href = '../index.html';
}

// Fungsi cek apakah user sudah login
function checkAuthentication() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = '../index.html';
    return false;
  }
  return true;
}

// Fungsi cek role (admin only)
function checkAdminAccess() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    alert('Anda tidak memiliki akses ke halaman ini!');
    window.location.href = '../index.html';
    return false;
  }
  return true;
}

// Fungsi cek role (user)
function checkUserAccess() {
  const user = getCurrentUser();
  if (!user || user.role !== 'user') {
    alert('Anda tidak memiliki akses ke halaman ini!');
    window.location.href = '../index.html';
    return false;
  }
  return true;
}

// Fungsi update header dengan info user
function updateUserHeader() {
  const user = getCurrentUser();
  if (user) {
    const userNameEl = document.getElementById('userName');
    const userRoleEl = document.getElementById('userRole');
    const userDepartmentEl = document.getElementById('userDepartment');

    if (userNameEl) userNameEl.textContent = user.name;
    if (userRoleEl) userRoleEl.textContent = user.role === 'admin' ? 'Admin (Petugas Perpustakaan)' : 'User (Pegawai)';
    if (userDepartmentEl) userDepartmentEl.textContent = user.department;
  }
}

// Fungsi toggle dropdown menu
function toggleUserMenu() {
  const dropdown = document.querySelector('.dropdown-menu');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

// Tutup dropdown jika klik di luar
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.dropdown-menu');
  const userMenu = document.querySelector('.user-menu');
  
  if (dropdown && userMenu && !userMenu.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

// Fungsi untuk menambah log audit
function addAuditLog(action, module, description, details) {
  const user = getCurrentUser();
  const timestamp = new Date();
  
  const auditEntry = {
    id: 'AUD' + (database.auditTrail.length + 1).toString().padStart(3, '0'),
    timestamp: timestamp.toLocaleString('id-ID'),
    userId: user ? user.id : 'UNKNOWN',
    action: action,
    module: module,
    description: description,
    details: details
  };

  database.auditTrail.push(auditEntry);
  saveDatabase();
}

// Set handler untuk form login saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  // Cek jika ada form login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      if (!email || !password) {
        tampilAlert('warning', 'Silakan isi email dan password');
        return;
      }

      handleLogin(email, password);
    });
  }

  // Update header jika user sudah login
  updateUserHeader();
});
