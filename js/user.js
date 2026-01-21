// User Functions - SIPP

// Cek akses user saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  checkUserAccess();
  initUserDashboard();

  // Setup event listeners
  setupUserEventListeners();
  setupSidebarHandlers();
});

// ============ SIDEBAR MANAGEMENT ============
function toggleSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar) {
    sidebar.classList.toggle('show');
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar && window.innerWidth <= 768) {
    sidebar.classList.remove('show');
  }
}

function selectMenu(event, sectionId) {
  event.preventDefault();
  
  // Update active menu
  const menuItems = document.querySelectorAll('.sidebar-menu a');
  menuItems.forEach(item => item.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  // Show section
  showSection(sectionId);
  
  // Close sidebar on mobile
  closeSidebar();
}

function setupSidebarHandlers() {
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('mainSidebar');
    const hamburger = document.getElementById('sidebarToggle');
    
    if (sidebar && hamburger && window.innerWidth <= 768) {
      if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove('show');
      }
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    const sidebar = document.getElementById('mainSidebar');
    if (sidebar && window.innerWidth > 768) {
      sidebar.classList.remove('show');
    }
  });
}

// Inisialisasi Dashboard User
function initUserDashboard() {
  const user = getCurrentUser();
  
  displayDashboardStats(user.id);
  loadPeminjamanUser(user.id);
  loadBukuTable();
  loadRiwayatUser(user.id);
}

// Setup Event Listeners
function setupUserEventListeners() {
  const searchBuku = document.getElementById('searchBuku');
  if (searchBuku) {
    searchBuku.addEventListener('keyup', function() {
      filterBukuTable(this.value);
    });
  }
}

// ============ DASHBOARD STATS ============
function displayDashboardStats(userId) {
  const peminjamanUser = database.peminjaman.filter(p => p.pegawaiId === userId);
  const peminjamanAktif = peminjamanUser.filter(p => p.status === 'active' || p.status === 'overdue');
  const peminjamanOverdue = peminjamanUser.filter(p => p.status === 'overdue');
  const totalDenda = peminjamanUser.reduce((sum, p) => sum + p.denda, 0);
  const totalDipinjam = peminjamanUser.length;

  document.getElementById('bukuDipinjam').textContent = peminjamanAktif.length;
  document.getElementById('bukuOverdue').textContent = peminjamanOverdue.length;
  document.getElementById('totalDendaUser').textContent = formatRupiah(totalDenda);
  document.getElementById('totalDipinjam').textContent = totalDipinjam;
}

// ============ PEMINJAMAN USER ============
function loadPeminjamanUser(userId) {
  const tbody = document.getElementById('peminjamanUserTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const peminjamanUser = database.peminjaman.filter(p => p.pegawaiId === userId && (p.status === 'active' || p.status === 'overdue'));

  if (peminjamanUser.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Tidak ada peminjaman aktif</td></tr>';
    return;
  }

  peminjamanUser.forEach(pinjam => {
    const buku = cariData(database.buku, 'id', pinjam.bukuId);
    const statusClass = pinjam.status === 'overdue' ? 'overdue' : 'active';
    const statusText = pinjam.status === 'overdue' ? '⚠️ OVERDUE' : '✓ Aktif';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${pinjam.id}</strong></td>
      <td>${buku ? buku.title : '-'}</td>
      <td>${formatTanggal(pinjam.tanggalPinjam)}</td>
      <td>${formatTanggal(pinjam.tanggalJatuhTempo)}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      <td><strong>${formatRupiah(pinjam.denda)}</strong></td>
    `;
    tbody.appendChild(row);
  });
}

// ============ DAFTAR BUKU ============
function loadBukuTable() {
  const tbody = document.getElementById('bukuTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  database.buku.forEach(buku => {
    const statusClass = buku.stock > 0 ? 'available' : 'unavailable';
    const statusText = buku.stock > 0 ? `✓ Tersedia (${buku.stock})` : 'Habis';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${buku.id}</td>
      <td><strong>${buku.title}</strong></td>
      <td>${buku.author}</td>
      <td>${buku.publisher}</td>
      <td>${buku.year}</td>
      <td>${buku.stock}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
    `;
    tbody.appendChild(row);
  });
}

function filterBukuTable(searchTerm) {
  const tbody = document.getElementById('bukuTableBody');
  if (!tbody) return;

  const rows = tbody.querySelectorAll('tr');
  const term = searchTerm.toLowerCase();

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(term) ? '' : 'none';
  });
}

// ============ RIWAYAT PEMINJAMAN ============
function loadRiwayatUser(userId) {
  const tbody = document.getElementById('riwayatTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const peminjamanUser = database.peminjaman.filter(p => p.pegawaiId === userId);
  const pengembalianUser = database.pengembalian.filter(p => p.pegawaiId === userId);

  // Gabung peminjaman dan pengembalian
  const riwayat = [
    ...peminjamanUser.map(p => ({
      type: 'peminjaman',
      id: p.id,
      bukuId: p.bukuId,
      tanggalPinjam: p.tanggalPinjam,
      tanggalJatuhTempo: p.tanggalJatuhTempo,
      status: p.status,
      denda: p.denda
    })),
    ...pengembalianUser.map(p => ({
      type: 'pengembalian',
      id: p.id,
      bukuId: p.bukuId,
      tanggalPinjam: p.tanggalPinjam,
      tanggalJatuhTempo: p.tanggalJatuhTempo,
      status: 'returned',
      denda: p.denda,
      tanggalKembali: p.tanggalKembali
    }))
  ];

  if (riwayat.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Belum ada riwayat peminjaman</td></tr>';
    return;
  }

  riwayat.forEach(item => {
    const buku = cariData(database.buku, 'id', item.bukuId);
    let statusClass, statusText;

    if (item.status === 'overdue') {
      statusClass = 'overdue';
      statusText = '⚠️ OVERDUE';
    } else if (item.status === 'active') {
      statusClass = 'active';
      statusText = '✓ Aktif';
    } else {
      statusClass = 'returned';
      statusText = '✓ Dikembalikan';
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td>${buku ? buku.title : '-'}</td>
      <td>${formatTanggal(item.tanggalPinjam)}</td>
      <td>${formatTanggal(item.tanggalJatuhTempo)}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      <td><strong>${formatRupiah(item.denda)}</strong></td>
    `;
    tbody.appendChild(row);
  });
}

// ============ EXPORT ============
function exportRiwayat() {
  const user = getCurrentUser();
  const peminjamanUser = database.peminjaman.filter(p => p.pegawaiId === user.id);
  
  const data = peminjamanUser.map(p => {
    const buku = cariData(database.buku, 'id', p.bukuId);
    return {
      'ID Peminjaman': p.id,
      'Buku': buku ? buku.title : '-',
      'Tanggal Pinjam': formatTanggal(p.tanggalPinjam),
      'Jatuh Tempo': formatTanggal(p.tanggalJatuhTempo),
      'Status': p.status,
      'Denda': formatRupiah(p.denda)
    };
  });

  if (data.length === 0) {
    tampilAlert('warning', 'Tidak ada data untuk diexport');
    return;
  }

  exportToCSV(data, 'riwayat-peminjaman-' + user.id);
}

// ============ NAVIGATION ============
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = 'block';
  }

  // Update sidebar active menu
  const menuLinks = document.querySelectorAll('.sidebar-menu a');
  menuLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  if (event.target) {
    event.target.classList.add('active');
  }
}
