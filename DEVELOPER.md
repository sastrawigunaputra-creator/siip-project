# 🔧 SIPP - Developer Guide & Advanced Features

## 📋 Daftar API/Functions yang Tersedia

### database.js
Functions yang bisa dipanggil di console atau custom code:

```javascript
// Akses database
database.users              // Array users
database.pegawai            // Array pegawai
database.buku               // Array buku
database.peminjaman         // Array peminjaman
database.pengembalian       // Array pengembalian
database.auditTrail         // Array audit logs

// Save & Load
saveDatabase()              // Simpan ke localStorage
loadDatabase()              // Load dari localStorage
```

### utils.js - Helper Functions

```javascript
// Tanggal
formatTanggal(date)         // "15 Januari 2026"
hitungSelisihHari(d1, d2)   // Calculate days between
hitungJatuhTempo(tanggal)   // Add 14 days
isOverdue(dueDate)          // Check if passed

// Denda
hitungDenda(dueDate, returnDate)  // Calculate Rp 5000/hari

// Format
formatRupiah(amount)        // "Rp 50.000"

// Data
cariData(array, key, value) // Find in array
filterData(array, conditions) // Filter with conditions
generateId(prefix)          // Generate unique ID

// UI
tampilAlert(type, msg)      // Show alert (success/danger/warning/info)
validateForm(formId)        // Validate required fields
resetForm(formId)           // Clear form

// Export/Print
exportToCSV(data, filename) // Export to CSV
printHalaman(elementId, title) // Print element
```

### auth.js - Authentication

```javascript
// Login/Logout
handleLogin(email, password)        // Login user
handleLogout()                      // Logout
checkAuthentication()               // Verify logged in
checkAdminAccess()                  // Verify is admin
checkUserAccess()                   // Verify is user

// Session
getCurrentUser()                    // Get current user object
setCurrentUser(userObj)             // Set session
updateUserHeader()                  // Update header display
toggleUserMenu()                    // Toggle dropdown

// Audit
addAuditLog(action, module, desc, details)  // Log action
```

### admin.js - Admin Functions

```javascript
// Initialization
initAdminDashboard()                // Load all data
setupAdminEventListeners()          // Setup events
displayDashboardStats()             // Show stats
populateSelects()                   // Populate dropdowns

// Master Buku
loadBukuTable()                     // Display books
showAddBukuModal()                  // Open add form
editBuku(bukuId)                    // Open edit form
deleteBuku(bukuId)                  // Delete book
handleBukuSubmit()                  // Process form

// Master Pegawai
loadPegawaiTable()                  // Display employees
showAddPegawaiModal()               // Open add form
editPegawai(pegawaiId)              // Open edit form
deletePegawai(pegawaiId)            // Delete employee
handlePegawaiSubmit()               // Process form

// Transaksi Peminjaman
loadPeminjamanAktifTable()          // List active loans
handlePeminjamanSubmit()            // Process loan
lihatStrukPeminjaman(peminjamanId)  // Show receipt

// Transaksi Pengembalian
loadPengembalianTable()             // List returns
loadDetilPeminjaman(peminjamanId)   // Load loan details
hitungDendaOtomatis()               // Auto-calculate fine
handlePengembalianSubmit()          // Process return

// Laporan
loadLaporanStok()                   // Load stock report
generateLaporanStok()               // Generate report
generateLaporanOverdue()            // Generate overdue report
generateLaporanRiwayat()            // Generate history report
printLaporan(elementId)             // Print report
exportLaporanCSV(elementId, filename) // Export report

// Audit
loadAuditLog()                      // Load audit trail
exportAuditLog()                    // Export audit to CSV

// UI Navigation
showSection(sectionId)              // Switch section
closeModal(modalId)                 // Close modal
```

### user.js - User Functions

```javascript
// Initialization
initUserDashboard()                 // Load user data
setupUserEventListeners()           // Setup events
displayDashboardStats(userId)       // Show personal stats

// Peminjaman
loadPeminjamanUser(userId)          // List user's loans

// Buku
loadBukuTable()                     // Display all books
filterBukuTable(searchTerm)         // Search books

// Riwayat
loadRiwayatUser(userId)             // Load user's history
exportRiwayat()                     // Export personal history

// Navigation
showSection(sectionId)              // Switch section
```

---

## 🎮 Interactive Console Examples

Buka Developer Console (F12 → Console) dan coba:

### 1. Lihat semua buku
```javascript
database.buku.forEach(b => console.log(b.title, b.stock));
```

### 2. Lihat pegawai dengan overdue
```javascript
database.peminjaman
  .filter(p => p.status === 'overdue')
  .forEach(p => {
    let pegawai = database.pegawai.find(x => x.id === p.pegawaiId);
    console.log(pegawai.name, p.denda);
  });
```

### 3. Total denda semua pegawai
```javascript
let totalDenda = database.peminjaman.reduce((sum, p) => sum + p.denda, 0);
console.log('Total Denda:', formatRupiah(totalDenda));
```

### 4. Hitung durasi peminjaman
```javascript
database.peminjaman.forEach(p => {
  let hari = hitungSelisihHari(p.tanggalPinjam, p.tanggalJatuhTempo);
  console.log(p.id, hari, 'hari');
});
```

### 5. Lihat log audit terakhir
```javascript
database.auditTrail.slice(-5).reverse().forEach(log => {
  console.log(log.timestamp, log.action, log.description);
});
```

### 6. Export data manual
```javascript
exportToCSV(database.buku, 'all-books');
```

### 7. Reset semua data ke default
```javascript
localStorage.removeItem('sipp_database');
location.reload();
```

### 8. Cari buku tertentu
```javascript
let buku = database.buku.find(b => b.title.includes('Clean'));
console.table(buku);
```

### 9. Lihat statistik
```javascript
console.log('Total Pegawai:', database.pegawai.length);
console.log('Total Buku:', database.buku.length);
console.log('Peminjaman Aktif:', database.peminjaman.filter(p => p.status === 'active').length);
console.log('Peminjaman Overdue:', database.peminjaman.filter(p => p.status === 'overdue').length);
console.log('Total Denda:', formatRupiah(database.peminjaman.reduce((s,p) => s + p.denda, 0)));
```

### 10. Custom filter - Cari semua peminjaman tertentu pegawai
```javascript
let userId = 'EMP001';
database.peminjaman.filter(p => p.pegawaiId === userId).forEach(p => {
  let buku = database.buku.find(b => b.id === p.bukuId);
  console.log(p.id, buku.title, p.status, formatRupiah(p.denda));
});
```

---

## 🛠️ Customization Guide

### 1. Ubah Late Fee
File: `js/utils.js`
```javascript
// Cari function hitungDenda
function hitungDenda(tanggalJatuhTempo, tanggalKembali) {
  if (!isOverdue(tanggalJatuhTempo)) return 0;
  const hariTerlambat = hitungSelisihHari(tanggalJatuhTempo, tanggalKembali);
  return hariTerlambat * 5000;  // ← GANTI 5000 dengan amount baru
}
```

### 2. Ubah Durasi Peminjaman Default
File: `js/utils.js`
```javascript
function hitungJatuhTempo(tanggalPinjam) {
  const date = new Date(tanggalPinjam);
  date.setDate(date.getDate() + 14);  // ← GANTI 14 dengan hari baru
  return date.toISOString().split('T')[0];
}
```

### 3. Ubah Warna Theme
File: `css/style.css`
```css
:root {
  --primary-color: #2c3e50;      /* Dark blue-grey */
  --secondary-color: #3498db;    /* Light blue */
  --success-color: #27ae60;      /* Green */
  --danger-color: #e74c3c;       /* Red */
  --warning-color: #f39c12;      /* Orange */
  /* Ubah nilai color sesuai keinginan */
}
```

### 4. Tambah Kategori Buku Baru
File: `admin/dashboard.html`
```html
<!-- Di form buku, ganti input category dengan select -->
<div class="form-group">
  <label for="bukuCategory">Kategori</label>
  <select id="bukuCategory">
    <option value="Programming">Programming</option>
    <option value="Business">Business</option>
    <option value="Psychology">Psychology</option>
    <option value="History">History</option>
    <!-- Tambah kategori baru di sini -->
  </select>
</div>
```

### 5. Ubah Pesan Alert
File: `js/auth.js` & `js/admin.js`
```javascript
tampilAlert('success', 'Buku berhasil ditambahkan');
// Ganti text sesuai preferensi
```

### 6. Tambah Field Master Buku
File: `data/database.js`
```javascript
// Di array buku, tambah field baru
{
  id: "BK001",
  title: "...",
  author: "...",
  publisher: "...",
  year: 2008,
  stock: 3,
  isbn: "...",
  category: "Programming",
  newField: "value"  // ← Tambah di sini
}
```

Kemudian update form & table untuk tampilkan field baru.

### 7. Ubah Bahasa (ID → EN)
File: Setiap HTML & JS
```javascript
// Ubah semua label, placeholder, pesan
// Contoh:
document.getElementById('loginForm')
// Dari: <label>Email</label>
// Ke: <label>Email Address</label>
```

### 8. Ubah Durasi Session
File: `js/auth.js`
```javascript
// Tambah session timeout
setTimeout(() => {
  logout();
  tampilAlert('warning', 'Session expired');
}, 30 * 60 * 1000);  // 30 minutes
```

### 9. Tambah Validasi Email
File: `admin/dashboard.html` (form buku/pegawai)
```html
<input type="email" id="bukuEmail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
```

### 10. Tambah Field Tanggal Lahir
File: `data/database.js` → pegawai array
```javascript
{
  id: "EMP001",
  name: "...",
  dateOfBirth: "1990-05-15",  // ← Tambah
  // ... field lain
}
```

---

## 🔗 API Integration Cheatsheet

Jika mau koneksi ke backend:

### Replace localStorage dengan API Call

**Before (localStorage):**
```javascript
function saveDatabase() {
  localStorage.setItem('sipp_database', JSON.stringify(database));
}
```

**After (API):**
```javascript
function saveDatabase() {
  fetch('/api/database/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(database)
  })
  .then(r => r.json())
  .then(data => console.log('Saved:', data))
  .catch(e => console.error('Error:', e));
}
```

### Get Buku dari Backend
```javascript
async function loadBukuTable() {
  const response = await fetch('/api/buku');
  database.buku = await response.json();
  // ... render table
}
```

### POST Peminjaman
```javascript
async function handlePeminjamanSubmit() {
  const data = {
    pegawaiId: document.getElementById('pegawaiPinjam').value,
    bukuId: document.getElementById('bukuPinjam').value,
    tanggalPinjam: document.getElementById('tanggalPinjam').value
  };
  
  const response = await fetch('/api/peminjaman', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (response.ok) {
    tampilAlert('success', 'Peminjaman berhasil');
    loadPeminjamanAktifTable();
  }
}
```

---

## 📊 Database Schema

```
USERS
├─ id (string)
├─ name (string)
├─ email (string)
├─ password (string)
├─ role ('admin' | 'user')
└─ department (string)

PEGAWAI
├─ id (string)
├─ name (string)
├─ position (string)
├─ department (string)
├─ phone (string)
└─ email (string)

BUKU
├─ id (string)
├─ title (string)
├─ author (string)
├─ publisher (string)
├─ year (number)
├─ stock (number)
├─ isbn (string)
└─ category (string)

PEMINJAMAN
├─ id (string)
├─ pegawaiId (string) → FK PEGAWAI
├─ bukuId (string) → FK BUKU
├─ tanggalPinjam (date)
├─ tanggalJatuhTempo (date)
├─ status ('active' | 'overdue' | 'returned')
├─ denda (number)
└─ catatan (string)

PENGEMBALIAN
├─ id (string)
├─ peminjamanId (string) → FK PEMINJAMAN
├─ pegawaiId (string) → FK PEGAWAI
├─ bukuId (string) → FK BUKU
├─ tanggalPinjam (date)
├─ tanggalKembali (date)
├─ tanggalJatuhTempo (date)
├─ denda (number)
└─ status ('returned')

AUDITTRAIL
├─ id (string)
├─ timestamp (string)
├─ userId (string)
├─ action (string)
├─ module (string)
├─ description (string)
└─ details (string)
```

---

## 🧪 Unit Testing Examples

Menggunakan console untuk test:

```javascript
// Test formatRupiah
console.assert(
  formatRupiah(5000) === 'Rp 5.000',
  'formatRupiah failed'
);

// Test hitungSelisihHari
console.assert(
  hitungSelisihHari('2026-01-11', '2026-01-12') === 1,
  'hitungSelisihHari failed'
);

// Test formatTanggal
console.assert(
  formatTanggal('2026-01-11').includes('Januari'),
  'formatTanggal failed'
);

// Test isOverdue
console.assert(
  isOverdue('2026-01-01') === true,  // past date
  'isOverdue failed'
);

// Test hitungDenda
let denda = hitungDenda('2026-01-01', '2026-01-11');
console.log('Denda untuk 10 hari:', formatRupiah(denda));
console.assert(denda === 50000, 'hitungDenda failed');
```

---

## 🚀 Performance Optimization Tips

1. **Lazy Load Tables:** Paginate data untuk > 1000 records
2. **Debounce Search:** Tunggu 300ms sebelum filter
3. **Cache User Data:** Cache getCurrentUser() result
4. **Minimize DOM Updates:** Batch DOM changes
5. **Use Event Delegation:** Delegate untuk table buttons
6. **Compress Images:** If ada file upload
7. **Minimize CSS:** Minify CSS untuk production
8. **Minify JS:** Minify all JS files
9. **Gzip Compression:** Enable server-side gzip
10. **Service Worker:** Cache static assets

---

**Happy Customizing! 🎉**
