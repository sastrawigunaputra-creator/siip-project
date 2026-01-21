// Admin Functions - SIPP

// Cek akses admin saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  checkAdminAccess();
  initAdminDashboard();

  // Setup event listeners
  setupAdminEventListeners();
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

// Inisialisasi Dashboard
function initAdminDashboard() {
  displayDashboardStats();
  displayAuditTrail();
  loadBukuTable();
  loadPegawaiTable();
  loadPeminjamanAktifTable();
  loadPengembalianTable();
  loadLaporanStok();
  loadAuditLog();
  setupDatePickers();
  populateSelects();
}

// Setup Event Listeners
function setupAdminEventListeners() {
  // Form Peminjaman
  const formPinjam = document.getElementById('formPeminjaman');
  if (formPinjam) {
    document.getElementById('tanggalPinjam').addEventListener('change', function() {
      const jatuhTempo = hitungJatuhTempo(this.value);
      document.getElementById('tanggalJatuhTempo').value = jatuhTempo;
    });

    formPinjam.addEventListener('submit', function(e) {
      e.preventDefault();
      handlePeminjamanSubmit();
    });
  }

  // Form Pengembalian
  const formKembali = document.getElementById('formPengembalian');
  if (formKembali) {
    document.getElementById('peminjamanKembali').addEventListener('change', function() {
      loadDetilPeminjaman(this.value);
    });

    document.getElementById('tanggalKembali').addEventListener('change', function() {
      hitungDendaOtomatis();
    });

    formKembali.addEventListener('submit', function(e) {
      e.preventDefault();
      handlePengembalianSubmit();
    });
  }

  // Form Buku
  const formBuku = document.getElementById('formBuku');
  if (formBuku) {
    formBuku.addEventListener('submit', function(e) {
      e.preventDefault();
      handleBukuSubmit();
    });
  }

  // Form Pegawai
  const formPegawai = document.getElementById('formPegawai');
  if (formPegawai) {
    formPegawai.addEventListener('submit', function(e) {
      e.preventDefault();
      handlePegawaiSubmit();
    });
  }
}

// ============ DASHBOARD STATS ============
function displayDashboardStats() {
  const totalBuku = database.buku.length;
  const bukuTersedia = database.buku.filter(b => b.stock > 0).length;
  const peminjamanAktif = database.peminjaman.filter(p => p.status === 'active').length;
  const peminjamanOverdue = database.peminjaman.filter(p => p.status === 'overdue').length;
  const totalPegawai = database.pegawai.length;
  const totalDenda = database.peminjaman.reduce((sum, p) => sum + p.denda, 0);

  document.getElementById('totalBuku').textContent = totalBuku;
  document.getElementById('bukuTersedia').textContent = bukuTersedia;
  document.getElementById('peminjamanAktif').textContent = peminjamanAktif;
  document.getElementById('peminjamanOverdue').textContent = peminjamanOverdue;
  document.getElementById('totalPegawai').textContent = totalPegawai;
  document.getElementById('totalDenda').textContent = formatRupiah(totalDenda);
}

// ============ AUDIT TRAIL ============
function displayAuditTrail() {
  const tbody = document.getElementById('auditTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const recentAudit = database.auditTrail.slice(-5).reverse();

  recentAudit.forEach(log => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.timestamp}</td>
      <td>${log.userId}</td>
      <td><span class="status-badge">${log.action}</span></td>
      <td>${log.module}</td>
      <td>${log.description}</td>
    `;
    tbody.appendChild(row);
  });
}

// ============ MASTER BUKU ============
function loadBukuTable() {
  const tbody = document.getElementById('bukuTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  database.buku.forEach(buku => {
    const statusClass = buku.stock > 0 ? 'available' : 'unavailable';
    const statusText = buku.stock > 0 ? 'Tersedia' : 'Habis';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${buku.id}</td>
      <td><strong>${buku.title}</strong></td>
      <td>${buku.author}</td>
      <td>${buku.publisher}</td>
      <td><strong>${buku.stock}</strong></td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      <td class="action-buttons">
        <button class="btn btn-info btn-small" onclick="editBuku('${buku.id}')">Edit</button>
        <button class="btn btn-danger btn-small" onclick="deleteBuku('${buku.id}')">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function showAddBukuModal() {
  document.getElementById('modalBukuTitle').textContent = 'Tambah Buku Baru';
  document.getElementById('formBuku').reset();
  document.getElementById('formBuku').dataset.mode = 'add';
  document.getElementById('modalBuku').classList.add('show');
}

function editBuku(bukuId) {
  const buku = cariData(database.buku, 'id', bukuId);
  if (!buku) return;

  document.getElementById('modalBukuTitle').textContent = 'Edit Buku';
  document.getElementById('bukuTitle').value = buku.title;
  document.getElementById('bukuAuthor').value = buku.author;
  document.getElementById('bukuPublisher').value = buku.publisher;
  document.getElementById('bukuYear').value = buku.year;
  document.getElementById('bukuISBN').value = buku.isbn || '';
  document.getElementById('bukuStock').value = buku.stock;
  document.getElementById('bukuCategory').value = buku.category || '';

  document.getElementById('formBuku').dataset.mode = 'edit';
  document.getElementById('formBuku').dataset.bukuId = bukuId;
  document.getElementById('modalBuku').classList.add('show');
}

function deleteBuku(bukuId) {
  if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;

  const index = database.buku.findIndex(b => b.id === bukuId);
  if (index > -1) {
    database.buku.splice(index, 1);
    saveDatabase();
    addAuditLog('DELETE', 'Buku', `Menghapus buku ${bukuId}`, '');
    tampilAlert('success', 'Buku berhasil dihapus');
    loadBukuTable();
  }
}

function handleBukuSubmit() {
  const form = document.getElementById('formBuku');
  const mode = form.dataset.mode;

  const bukuData = {
    title: document.getElementById('bukuTitle').value,
    author: document.getElementById('bukuAuthor').value,
    publisher: document.getElementById('bukuPublisher').value,
    year: parseInt(document.getElementById('bukuYear').value),
    isbn: document.getElementById('bukuISBN').value,
    stock: parseInt(document.getElementById('bukuStock').value),
    category: document.getElementById('bukuCategory').value || 'Umum'
  };

  if (mode === 'add') {
    bukuData.id = 'BK' + (database.buku.length + 1).toString().padStart(3, '0');
    database.buku.push(bukuData);
    addAuditLog('CREATE', 'Buku', `Menambah buku ${bukuData.id}`, `${bukuData.title}`);
    tampilAlert('success', 'Buku berhasil ditambahkan');
  } else {
    const bukuId = form.dataset.bukuId;
    const bukuIndex = database.buku.findIndex(b => b.id === bukuId);
    if (bukuIndex > -1) {
      Object.assign(database.buku[bukuIndex], bukuData);
      addAuditLog('UPDATE', 'Buku', `Mengupdate buku ${bukuId}`, `${bukuData.title}`);
      tampilAlert('success', 'Buku berhasil diupdate');
    }
  }

  saveDatabase();
  closeModal('modalBuku');
  loadBukuTable();
  displayDashboardStats();
}

// ============ MASTER PEGAWAI ============
function loadPegawaiTable() {
  const tbody = document.getElementById('pegawaiTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  database.pegawai.forEach(pegawai => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pegawai.id}</td>
      <td><strong>${pegawai.name}</strong></td>
      <td>${pegawai.position}</td>
      <td>${pegawai.department}</td>
      <td>${pegawai.phone}</td>
      <td class="action-buttons">
        <button class="btn btn-info btn-small" onclick="editPegawai('${pegawai.id}')">Edit</button>
        <button class="btn btn-danger btn-small" onclick="deletePegawai('${pegawai.id}')">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function showAddPegawaiModal() {
  document.getElementById('modalPegawaiTitle').textContent = 'Tambah Pegawai Baru';
  document.getElementById('formPegawai').reset();
  document.getElementById('formPegawai').dataset.mode = 'add';
  document.getElementById('modalPegawai').classList.add('show');
}

function editPegawai(pegawaiId) {
  const pegawai = cariData(database.pegawai, 'id', pegawaiId);
  if (!pegawai) return;

  document.getElementById('modalPegawaiTitle').textContent = 'Edit Pegawai';
  document.getElementById('pegawaiName').value = pegawai.name;
  document.getElementById('pegawaiPosition').value = pegawai.position;
  document.getElementById('pegawaiDept').value = pegawai.department;
  document.getElementById('pegawaiPhone').value = pegawai.phone;
  document.getElementById('pegawaiEmail').value = pegawai.email || '';

  document.getElementById('formPegawai').dataset.mode = 'edit';
  document.getElementById('formPegawai').dataset.pegawaiId = pegawaiId;
  document.getElementById('modalPegawai').classList.add('show');
}

function deletePegawai(pegawaiId) {
  if (!confirm('Apakah Anda yakin ingin menghapus pegawai ini?')) return;

  const index = database.pegawai.findIndex(p => p.id === pegawaiId);
  if (index > -1) {
    database.pegawai.splice(index, 1);
    saveDatabase();
    addAuditLog('DELETE', 'Pegawai', `Menghapus pegawai ${pegawaiId}`, '');
    tampilAlert('success', 'Pegawai berhasil dihapus');
    loadPegawaiTable();
  }
}

function handlePegawaiSubmit() {
  const form = document.getElementById('formPegawai');
  const mode = form.dataset.mode;

  const pegawaiData = {
    name: document.getElementById('pegawaiName').value,
    position: document.getElementById('pegawaiPosition').value,
    department: document.getElementById('pegawaiDept').value,
    phone: document.getElementById('pegawaiPhone').value,
    email: document.getElementById('pegawaiEmail').value
  };

  if (mode === 'add') {
    pegawaiData.id = 'EMP' + (database.pegawai.length + 1).toString().padStart(3, '0');
    database.pegawai.push(pegawaiData);
    addAuditLog('CREATE', 'Pegawai', `Menambah pegawai ${pegawaiData.id}`, `${pegawaiData.name}`);
    tampilAlert('success', 'Pegawai berhasil ditambahkan');
  } else {
    const pegawaiId = form.dataset.pegawaiId;
    const pegawaiIndex = database.pegawai.findIndex(p => p.id === pegawaiId);
    if (pegawaiIndex > -1) {
      Object.assign(database.pegawai[pegawaiIndex], pegawaiData);
      addAuditLog('UPDATE', 'Pegawai', `Mengupdate pegawai ${pegawaiId}`, `${pegawaiData.name}`);
      tampilAlert('success', 'Pegawai berhasil diupdate');
    }
  }

  saveDatabase();
  closeModal('modalPegawai');
  loadPegawaiTable();
  populateSelects();
}

// ============ TRANSAKSI PEMINJAMAN ============
function loadPeminjamanAktifTable() {
  const tbody = document.getElementById('peminjamanAktifTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const peminjamanAktif = database.peminjaman.filter(p => p.status === 'active' || p.status === 'overdue');

  peminjamanAktif.forEach(pinjam => {
    const pegawai = cariData(database.pegawai, 'id', pinjam.pegawaiId);
    const buku = cariData(database.buku, 'id', pinjam.bukuId);
    const statusClass = pinjam.status === 'overdue' ? 'overdue' : 'active';
    const statusText = pinjam.status === 'overdue' ? 'OVERDUE' : 'Aktif';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pinjam.id}</td>
      <td>${pegawai ? pegawai.name : '-'}</td>
      <td>${buku ? buku.title : '-'}</td>
      <td>${formatTanggal(pinjam.tanggalPinjam)}</td>
      <td>${formatTanggal(pinjam.tanggalJatuhTempo)}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      <td class="action-buttons">
        <button class="btn btn-info btn-small" onclick="lihatStrukPeminjaman('${pinjam.id}')">Struk</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function handlePeminjamanSubmit() {
  const pegawaiId = document.getElementById('pegawaiPinjam').value;
  const bukuId = document.getElementById('bukuPinjam').value;
  const tanggalPinjam = document.getElementById('tanggalPinjam').value;
  const tanggalJatuhTempo = document.getElementById('tanggalJatuhTempo').value;
  const catatan = document.getElementById('catatanPinjam').value;

  if (!pegawaiId || !bukuId || !tanggalPinjam) {
    tampilAlert('warning', 'Silakan isi semua field yang wajib');
    return;
  }

  // Validasi stok
  const buku = cariData(database.buku, 'id', bukuId);
  if (!buku || buku.stock <= 0) {
    tampilAlert('danger', 'Buku tidak tersedia atau stok habis');
    return;
  }

  // Buat record peminjaman
  const peminjaman = {
    id: 'PJM' + (database.peminjaman.length + 1).toString().padStart(3, '0'),
    pegawaiId: pegawaiId,
    bukuId: bukuId,
    tanggalPinjam: tanggalPinjam,
    tanggalJatuhTempo: tanggalJatuhTempo,
    status: 'active',
    denda: 0,
    catatan: catatan
  };

  // Update stok
  buku.stock--;

  // Simpan data
  database.peminjaman.push(peminjaman);
  saveDatabase();

  // Log audit
  const pegawai = cariData(database.pegawai, 'id', pegawaiId);
  addAuditLog('CREATE', 'Peminjaman', `Input peminjaman ${peminjaman.id}`, 
    `${pegawai.name} meminjam ${buku.title}`);

  tampilAlert('success', 'Peminjaman berhasil dicatat!');
  lihatStrukPeminjaman(peminjaman.id);

  // Reset form
  resetForm('formPeminjaman');
  loadPeminjamanAktifTable();
  displayDashboardStats();
  loadLaporanStok();
}

function lihatStrukPeminjaman(peminjamanId) {
  const peminjaman = cariData(database.peminjaman, 'id', peminjamanId);
  if (!peminjaman) return;

  const pegawai = cariData(database.pegawai, 'id', peminjaman.pegawaiId);
  const buku = cariData(database.buku, 'id', peminjaman.bukuId);

  const strukContent = `
    <div style="text-align: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px dashed #ddd;">
      <h3>✅ STRUK PEMINJAMAN BUKU</h3>
      <p>PT. XYZ - Divisi Manajemen Aset</p>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; margin: 10px 0;">
        <span><strong>ID Peminjaman:</strong></span>
        <span>${peminjaman.id}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 10px 0;">
        <span><strong>Tanggal Transaksi:</strong></span>
        <span>${formatTanggal(peminjaman.tanggalPinjam)}</span>
      </div>
    </div>

    <div style="margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
      <h4 style="margin-bottom: 10px;">📋 Data Peminjam</h4>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>ID Pegawai:</span>
        <span><strong>${pegawai.id}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Nama:</span>
        <span><strong>${pegawai.name}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Jabatan:</span>
        <span>${pegawai.position}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Departemen:</span>
        <span>${pegawai.department}</span>
      </div>
    </div>

    <div style="margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
      <h4 style="margin-bottom: 10px;">📖 Data Buku</h4>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>ID Buku:</span>
        <span><strong>${buku.id}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Judul:</span>
        <span><strong>${buku.title}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Penulis:</span>
        <span>${buku.author}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Penerbit:</span>
        <span>${buku.publisher}</span>
      </div>
    </div>

    <div style="margin-bottom: 20px; padding: 15px; background: #fff3cd; border-radius: 5px;">
      <h4 style="margin-bottom: 10px;">⏳ Tanggal Penting</h4>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Tanggal Pinjam:</span>
        <span><strong>${formatTanggal(peminjaman.tanggalPinjam)}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Jatuh Tempo:</span>
        <span><strong style="color: #ff6b6b;">${formatTanggal(peminjaman.tanggalJatuhTempo)}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 5px 0;">
        <span>Durasi Pinjam:</span>
        <span>14 hari</span>
      </div>
    </div>

    <div style="margin-bottom: 20px; padding: 15px; background: #d4edda; border-radius: 5px;">
      <p style="text-align: center; margin: 0; font-size: 14px;">
        <strong>Catatan:</strong> Jika terlambat, akan dikenakan denda Rp 5.000 per hari.
      </p>
    </div>

    <div style="text-align: center; padding-top: 20px; border-top: 2px dashed #ddd;">
      <p style="margin: 5px 0;">Terima kasih atas kepercayaan Anda</p>
      <p style="margin: 5px 0; font-size: 12px; color: #7f8c8d;">${new Date().toLocaleString('id-ID')}</p>
    </div>
  `;

  document.getElementById('strukContent').innerHTML = strukContent;
  document.getElementById('modalStruk').classList.add('show');
}

// ============ TRANSAKSI PENGEMBALIAN ============
function loadPengembalianTable() {
  const tbody = document.getElementById('pengembalianTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  database.pengembalian.forEach(kembali => {
    const pegawai = cariData(database.pegawai, 'id', kembali.pegawaiId);
    const buku = cariData(database.buku, 'id', kembali.bukuId);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${kembali.id}</td>
      <td>${pegawai ? pegawai.name : '-'}</td>
      <td>${buku ? buku.title : '-'}</td>
      <td>${formatTanggal(kembali.tanggalKembali)}</td>
      <td>${formatRupiah(kembali.denda)}</td>
      <td><span class="status-badge returned">Dikembalikan</span></td>
    `;
    tbody.appendChild(row);
  });
}

function populatePeminjamanSelect() {
  const select = document.getElementById('peminjamanKembali');
  if (!select) return;

  select.innerHTML = '<option value="">-- Pilih Peminjaman Aktif --</option>';

  const peminjamanAktif = database.peminjaman.filter(p => p.status === 'active' || p.status === 'overdue');
  
  peminjamanAktif.forEach(pinjam => {
    const pegawai = cariData(database.pegawai, 'id', pinjam.pegawaiId);
    const buku = cariData(database.buku, 'id', pinjam.bukuId);
    const option = document.createElement('option');
    option.value = pinjam.id;
    option.textContent = `${pinjam.id} - ${pegawai.name} (${buku.title})`;
    select.appendChild(option);
  });
}

function loadDetilPeminjaman(peminjamanId) {
  const peminjaman = cariData(database.peminjaman, 'id', peminjamanId);
  if (!peminjaman) {
    document.getElementById('dendaKembali').value = '';
    document.getElementById('hariTerlambat').value = '';
    return;
  }

  document.getElementById('tanggalKembali').value = new Date().toISOString().split('T')[0];
  hitungDendaOtomatis();
}

function hitungDendaOtomatis() {
  const peminjamanId = document.getElementById('peminjamanKembali').value;
  const tanggalKembali = document.getElementById('tanggalKembali').value;

  if (!peminjamanId || !tanggalKembali) {
    document.getElementById('dendaKembali').value = '';
    document.getElementById('hariTerlambat').value = '';
    return;
  }

  const peminjaman = cariData(database.peminjaman, 'id', peminjamanId);
  const denda = hitungDenda(peminjaman.tanggalJatuhTempo, tanggalKembali);
  const hariTerlambat = Math.max(0, hitungSelisihHari(peminjaman.tanggalJatuhTempo, tanggalKembali));

  document.getElementById('dendaKembali').value = formatRupiah(denda);
  document.getElementById('hariTerlambat').value = hariTerlambat + ' hari';
}

function handlePengembalianSubmit() {
  const peminjamanId = document.getElementById('peminjamanKembali').value;
  const tanggalKembali = document.getElementById('tanggalKembali').value;

  if (!peminjamanId || !tanggalKembali) {
    tampilAlert('warning', 'Silakan isi semua field yang wajib');
    return;
  }

  const peminjaman = cariData(database.peminjaman, 'id', peminjamanId);
  const buku = cariData(database.buku, 'id', peminjaman.bukuId);
  const denda = hitungDenda(peminjaman.tanggalJatuhTempo, tanggalKembali);

  // Buat record pengembalian
  const pengembalian = {
    id: 'KMB' + (database.pengembalian.length + 1).toString().padStart(3, '0'),
    peminjamanId: peminjamanId,
    pegawaiId: peminjaman.pegawaiId,
    bukuId: peminjaman.bukuId,
    tanggalPinjam: peminjaman.tanggalPinjam,
    tanggalKembali: tanggalKembali,
    tanggalJatuhTempo: peminjaman.tanggalJatuhTempo,
    denda: denda,
    status: 'returned'
  };

  // Update peminjaman status
  peminjaman.status = 'returned';

  // Update stok
  buku.stock++;

  // Simpan data
  database.pengembalian.push(pengembalian);
  saveDatabase();

  // Log audit
  const pegawai = cariData(database.pegawai, 'id', peminjaman.pegawaiId);
  addAuditLog('CREATE', 'Pengembalian', `Input pengembalian ${pengembalian.id}`,
    `${pegawai.name} mengembalikan ${buku.title} (Denda: ${formatRupiah(denda)})`);

  tampilAlert('success', `Pengembalian berhasil dicatat! Denda: ${formatRupiah(denda)}`);

  // Reset form
  resetForm('formPengembalian');
  loadPeminjamanAktifTable();
  loadPengembalianTable();
  populatePeminjamanSelect();
  displayDashboardStats();
  loadLaporanStok();
}

// ============ LAPORAN ============
function loadLaporanStok() {
  const tbody = document.getElementById('laporanBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const head = document.getElementById('laporanHead');
  head.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Judul</th>
      <th>Penulis</th>
      <th>Stok Awal</th>
      <th>Stok Tersedia</th>
      <th>Stok Dipinjam</th>
    </tr>
  `;

  database.buku.forEach(buku => {
    const peminjamanAktif = database.peminjaman.filter(p => p.bukuId === buku.id && p.status !== 'returned').length;
    const stokDipinjam = peminjamanAktif;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${buku.id}</td>
      <td><strong>${buku.title}</strong></td>
      <td>${buku.author}</td>
      <td>${database.buku.find(b => b.id === buku.id) ? database.buku.find(b => b.id === buku.id).stock + stokDipinjam : 0}</td>
      <td><strong>${buku.stock}</strong></td>
      <td>${stokDipinjam}</td>
    `;
    tbody.appendChild(row);
  });
}

function generateLaporanStok() {
  document.getElementById('laporanTitle').textContent = 'Laporan Stok Buku';
  loadLaporanStok();
  tampilAlert('success', 'Laporan Stok dibuat: ' + formatTanggal(new Date()));
  setTimeout(() => {
    document.getElementById('laporan').style.display = 'block';
    showSection('laporan');
  }, 300);
}

function generateLaporanOverdue() {
  const overdue = database.peminjaman.filter(p => p.status === 'overdue');
  
  const tbody = document.getElementById('laporanBody');
  const head = document.getElementById('laporanHead');
  const title = document.getElementById('laporanTitle');
  
  if (!tbody || !head) return;

  title.textContent = '⚠️ Laporan Peminjaman Overdue';
  tbody.innerHTML = '';
  
  head.innerHTML = `
    <tr>
      <th>No</th>
      <th>User / Pegawai</th>
      <th>Nama Buku</th>
      <th>Kode Buku</th>
      <th>Tanggal Pinjam</th>
      <th>Durasi (hari)</th>
      <th>Denda (Rp)</th>
    </tr>
  `;

  if (overdue.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="7" style="text-align: center; color: #27ae60;"><strong>✅ Tidak ada peminjaman yang overdue</strong></td>';
    tbody.appendChild(row);
  } else {
    overdue.forEach((peminjaman, index) => {
      const buku = database.buku.find(b => b.id === peminjaman.bukuId);
      const pegawai = database.pegawai.find(p => p.id === peminjaman.pegawaiId);
      
      // Hitung durasi overdue
      const tanggalPinjam = new Date(peminjaman.tanggalPinjam);
      const tenggat = new Date(tanggalPinjam.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 hari
      const hariIni = new Date();
      const durasiOverdue = Math.floor((hariIni - tenggat) / (1000 * 60 * 60 * 24));
      const denda = Math.max(durasiOverdue, 0) * 5000; // Rp 5.000 per hari

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><strong>${pegawai ? pegawai.name : 'Unknown'}</strong><br><small>${peminjaman.pegawaiId}</small></td>
        <td>${buku ? buku.title : 'Buku Tidak Ditemukan'}</td>
        <td><strong>${buku ? buku.id : '-'}</strong></td>
        <td>${formatTanggal(tanggalPinjam)}</td>
        <td>${durasiOverdue} hari</td>
        <td style="font-weight: bold; color: #e74c3c;">Rp ${denda.toLocaleString('id-ID')}</td>
      `;
      tbody.appendChild(row);
    });
  }

  tampilAlert('warning', `Ditemukan ${overdue.length} peminjaman overdue`);
  setTimeout(() => {
    document.getElementById('laporan').style.display = 'block';
    showSection('laporan');
  }, 300);
}

function generateLaporanRiwayat() {
  const tbody = document.getElementById('laporanBody');
  const head = document.getElementById('laporanHead');
  const title = document.getElementById('laporanTitle');
  
  if (!tbody || !head) return;

  title.textContent = '📝 Laporan Riwayat Transaksi';
  tbody.innerHTML = '';
  
  head.innerHTML = `
    <tr>
      <th>No</th>
      <th>Tanggal</th>
      <th>Jenis</th>
      <th>User / Pegawai</th>
      <th>Nama Buku</th>
      <th>Kode Buku</th>
      <th>Status</th>
      <th>Denda (Rp)</th>
    </tr>
  `;

  // Gabungkan data peminjaman dan pengembalian
  const riwayatPeminjaman = database.peminjaman.map(p => ({
    ...p,
    jenis: 'Peminjaman',
    tanggal: p.tanggalPinjam,
    statusDisplay: p.status === 'active' ? 'Aktif' : p.status === 'overdue' ? 'Overdue' : 'Dikembalikan'
  }));

  const riwayatPengembalian = database.pengembalian.map(p => ({
    ...p,
    jenis: 'Pengembalian',
    tanggal: p.tanggalKembali,
    statusDisplay: 'Dikembalikan'
  }));

  const semuaRiwayat = [...riwayatPeminjaman, ...riwayatPengembalian];

  // Urutkan berdasarkan tanggal terbaru
  semuaRiwayat.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  if (semuaRiwayat.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="8" style="text-align: center; color: #27ae60;"><strong>📚 Belum ada riwayat transaksi</strong></td>';
    tbody.appendChild(row);
  } else {
    semuaRiwayat.forEach((transaksi, index) => {
      const buku = database.buku.find(b => b.id === transaksi.bukuId);
      const pegawai = database.pegawai.find(p => p.id === transaksi.pegawaiId);
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${formatTanggal(new Date(transaksi.tanggal))}</td>
        <td><span class="status-badge ${transaksi.jenis === 'Peminjaman' ? 'success' : 'info'}">${transaksi.jenis}</span></td>
        <td><strong>${pegawai ? pegawai.name : 'Unknown'}</strong><br><small>${transaksi.pegawaiId}</small></td>
        <td>${buku ? buku.title : 'Buku Tidak Ditemukan'}</td>
        <td><strong>${buku ? buku.id : '-'}</strong></td>
        <td><span class="status-badge ${transaksi.statusDisplay === 'Aktif' ? 'warning' : transaksi.statusDisplay === 'Overdue' ? 'danger' : 'success'}">${transaksi.statusDisplay}</span></td>
        <td style="font-weight: bold; color: ${transaksi.denda > 0 ? '#e74c3c' : '#27ae60'};">Rp ${transaksi.denda.toLocaleString('id-ID')}</td>
      `;
      tbody.appendChild(row);
    });
  }

  tampilAlert('info', `Total riwayat: ${semuaRiwayat.length} transaksi`);
  setTimeout(() => {
    document.getElementById('laporan').style.display = 'block';
    showSection('laporan');
  }, 300);
}

function printLaporan(elementId) {
  const title = document.getElementById('laporanTitle').textContent + ' - ' + formatTanggal(new Date());
  printHalaman(elementId, title);
}

function exportLaporanCSV(elementId, filename) {
  const table = document.getElementById(elementId);
  const rows = table.querySelectorAll('tr');
  const data = [];

  rows.forEach((row, index) => {
    if (index === 0) return; // Skip header
    const cells = row.querySelectorAll('td');
    const rowData = {};
    cells.forEach((cell, i) => {
      rowData['col' + i] = cell.textContent;
    });
    data.push(rowData);
  });

  const title = document.getElementById('laporanTitle').textContent;
  exportToCSV(data, filename + '-' + new Date().toISOString().split('T')[0]);
}

// ============ AUDIT LOG ============
function loadAuditLog() {
  const tbody = document.getElementById('auditLogBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  database.auditTrail.forEach(log => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.timestamp}</td>
      <td>${log.userId}</td>
      <td><span class="status-badge">${log.action}</span></td>
      <td>${log.module}</td>
      <td>${log.description}</td>
      <td>${log.details}</td>
    `;
    tbody.appendChild(row);
  });
}

function exportAuditLog() {
  exportToCSV(database.auditTrail, 'audit-log-' + new Date().toISOString().split('T')[0]);
}

// ============ UTILITY FUNCTIONS ============
function populateSelects() {
  // Populate Pegawai Select
  const pegawaiSelect = document.getElementById('pegawaiPinjam');
  if (pegawaiSelect) {
    pegawaiSelect.innerHTML = '<option value="">-- Pilih Pegawai --</option>';
    database.pegawai.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.id} - ${p.name}`;
      pegawaiSelect.appendChild(option);
    });
  }

  // Populate Buku Select
  const bukuSelect = document.getElementById('bukuPinjam');
  if (bukuSelect) {
    bukuSelect.innerHTML = '<option value="">-- Pilih Buku --</option>';
    database.buku.forEach(b => {
      if (b.stock > 0) {
        const option = document.createElement('option');
        option.value = b.id;
        option.textContent = `${b.id} - ${b.title} (Stok: ${b.stock})`;
        bukuSelect.appendChild(option);
      }
    });
  }

  // Populate Peminjaman Select untuk pengembalian
  populatePeminjamanSelect();
}

function setupDatePickers() {
  const today = new Date().toISOString().split('T')[0];
  const tanggalPinjam = document.getElementById('tanggalPinjam');
  const tanggalKembali = document.getElementById('tanggalKembali');

  if (tanggalPinjam) {
    tanggalPinjam.value = today;
    tanggalPinjam.min = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    tanggalPinjam.max = today;
  }

  if (tanggalKembali) {
    tanggalKembali.value = today;
    tanggalKembali.min = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    tanggalKembali.max = today;
  }
}

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
  event.target.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
  }
}

// Setup window click to close modal
window.addEventListener('click', function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target == modal) {
      modal.classList.remove('show');
    }
  });
});
