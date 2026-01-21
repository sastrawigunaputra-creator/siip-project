# 🚀 SIPP - Quick Start Guide

## 📂 File yang sudah dibuat

Aplikasi SIPP (Sistem Informasi Peminjaman Buku Perusahaan) sudah siap dengan struktur lengkap:

```
SIPP/
├── index.html                      # LOGIN PAGE
├── README.md                       # Dokumentasi lengkap
├── css/
│   └── style.css                  # CSS (1000+ lines, responsive)
├── js/
│   ├── database.js                # Data dummy & save/load
│   ├── utils.js                   # Helper functions (20+ utils)
│   ├── auth.js                    # Autentikasi & session
│   ├── admin.js                   # Admin functions (2000+ lines)
│   └── user.js                    # User functions
├── data/
│   └── database.js                # Database structure
├── admin/
│   └── dashboard.html             # Admin page (1500+ lines)
└── user/
    └── dashboard.html             # User page (200+ lines)
```

## 🎯 Fitur Implementasi

✅ **Login & Autentikasi**
- Role-based access (Admin vs User)
- Demo credentials included
- Session management

✅ **Admin Dashboard** (7 sections)
1. Dashboard - Stats & aktivitas terbaru
2. Master Buku - CRUD lengkap
3. Master Pegawai - CRUD lengkap
4. Input Peminjaman - Validasi stok + jatuh tempo
5. Input Pengembalian - Denda otomatis
6. Laporan - Export & print
7. Audit Trail - Log semua aktivitas

✅ **User Dashboard** (3 sections)
1. Dashboard - Personal stats
2. Daftar Buku - Dengan search
3. Riwayat Peminjaman - Export CSV

✅ **Fitur Transaksional**
- Validasi stok real-time
- Perhitungan jatuh tempo otomatis (14 hari)
- Perhitungan denda otomatis (Rp 5.000/hari)
- Update stok automatic
- Generate struk peminjaman
- Audit trail lengkap

✅ **Data Persistence**
- localStorage untuk simulasi database
- Auto-save setiap transaksi
- Load data saat app start

## 🔐 Login Credentials

```
ADMIN:
Email: budi@company.com
Password: admin123

USER:
Email: andi@company.com (atau siti@company.com / rizki@company.com)
Password: user123
```

## 📖 Fitur-fitur Admin Lebih Detail

### 1. Master Buku
- Lihat semua buku dalam tabel
- Tambah buku baru → Form modal
- Edit buku → Buka modal dengan data terpilih
- Hapus buku → Confirm dialog
- Auto update stok di setiap transaksi

### 2. Master Pegawai
- Lihat semua pegawai
- CRUD pegawai seperti buku
- Digunakan untuk filter di form peminjaman

### 3. Input Peminjaman
- Pilih Pegawai (dropdown auto-populate)
- Pilih Buku (hanya stok > 0)
- Tanggal Pinjam (datepicker)
- Tanggal Jatuh Tempo (auto-calculate 14 hari)
- Catatan (optional)
- Submit → Auto struk print
- Stok berkurang (-1)

### 4. Input Pengembalian
- Pilih Peminjaman Aktif (dari daftar yang belum kembali)
- Tanggal Kembali Realisasi (datepicker)
- Denda otomatis jika overdue (Rp 5.000/hari)
- Submit → Update stok & record pengembalian

### 5. Laporan
- Laporan Stok Buku (detail per judul)
- Laporan Overdue (pegawai + denda)
- Laporan Riwayat (semua transaksi)
- Export ke CSV (bisa buka di Excel)
- Print ke printer

### 6. Audit Trail
- Catat semua aksi: CREATE, READ, UPDATE, DELETE
- Timestamp, User ID, Action, Module, Description
- Export ke CSV
- View 5 aktivitas terbaru di dashboard

## 📊 Fitur User Lebih Detail

### Dashboard
- Statistik: Buku dipinjam, Overdue, Total denda, Total riwayat
- Tabel peminjaman aktif + status overdue indicator

### Daftar Buku
- Lihat semua buku (8 dummy data)
- Status: Tersedia (dengan qty) / Habis
- Search buku berdasarkan judul/penulis
- Read-only (user tidak bisa CRUD)

### Riwayat Peminjaman
- Lihat semua transaksi user
- Status: Aktif, Overdue, Dikembalikan
- Denda tercatat
- Export ke CSV

## 🎨 UI/UX Features

✅ Responsive Design (Mobile, Tablet, Desktop)
✅ Alert notifications (Success, Warning, Error, Info)
✅ Status badges (color-coded)
✅ Modal dialogs untuk form
✅ Dropdown menus
✅ Search & filter
✅ Datepickers
✅ Print-friendly styling
✅ Loading indicators
✅ Form validation

## ⚙️ Technical Details

### Database Structure
- **users** - Akun login (email, password, role, department)
- **pegawai** - Master pegawai (5 records)
- **buku** - Master buku (8 records)
- **peminjaman** - Transaksi pinjam (5 active records)
- **pengembalian** - Transaksi kembali (2 records)
- **auditTrail** - Log aktivitas

### Key Functions (utils.js)
```javascript
formatTanggal()          // Format date ke Indonesia
hitungSelisihHari()      // Calculate day difference
isOverdue()              // Check if overdue
hitungDenda()            // Calculate late fee
hitungJatuhTempo()       // Calculate due date (14 days)
formatRupiah()           // Format currency
tampilAlert()            // Show notification
exportToCSV()            // Export data to CSV
printHalaman()           // Print page
```

### Data Persistence
```javascript
saveDatabase()           // Save to localStorage
loadDatabase()           // Load from localStorage
addAuditLog()            // Add audit entry
```

## 🧪 Testing Scenarios

### Scenario 1: Admin Input Peminjaman
1. Login as admin
2. Go to "Input Peminjaman"
3. Select pegawai & buku
4. Stok should decrease
5. Struk should generate

### Scenario 2: Admin Input Pengembalian
1. Go to "Input Pengembalian"
2. Select active loan
3. Set return date later than due date
4. Denda should auto-calculate
5. Stok should increase

### Scenario 3: User View Data
1. Login as user
2. Dashboard shows personal stats
3. Daftar Buku searchable
4. Riwayat shows all transactions
5. Export works

### Scenario 4: Audit Trail
1. Admin: Go to "Audit Trail"
2. See all logged actions
3. Export audit log to CSV
4. Timestamp & user ID recorded

## 🔧 How to Modify

### Add New Buku
```javascript
// In admin.js, handleBukuSubmit() function
database.buku.push({
  id: 'BK' + id,
  title: '...',
  author: '...',
  // ... etc
});
saveDatabase();
```

### Change Late Fee
```javascript
// In utils.js, hitungDenda() function
return hariTerlambat * 5000;  // Change 5000 to your amount
```

### Change Due Date Duration
```javascript
// In utils.js, hitungJatuhTempo() function
date.setDate(date.getDate() + 14);  // Change 14 to your days
```

### Add New User
```javascript
// In database.js
database.users.push({
  id: 'USR001',
  email: 'newuser@company.com',
  password: 'pass123',
  role: 'user',
  // ...
});
```

## 📱 Mobile Support

Aplikasi fully responsive dengan:
- Mobile-first design
- Touch-friendly buttons
- Stack layout on small screens
- Readable font sizes
- No horizontal scroll

## 🐛 Known Limitations

1. **No real database** - Uses localStorage only (browser-dependent)
2. **No authentication backend** - Password not actually hashed
3. **No email notifications** - Only browser alerts
4. **Single user session** - Only one login at a time per browser
5. **No image upload** - Text-only data entry
6. **No real PDF** - Print to PDF via browser print dialog
7. **Demo data only** - Hardcoded 8 books, 5 employees

## 🚀 To Deploy to Production

1. **Add Backend API:**
   - Node.js/Express or Django/Flask
   - Connect to real database (MySQL, PostgreSQL, MongoDB)

2. **Add Authentication:**
   - JWT tokens
   - Password hashing (bcrypt)
   - Refresh tokens

3. **Add Email/SMS:**
   - Overdue notifications
   - Confirmation receipts

4. **Add PDF/Excel:**
   - jsPDF or ReportLab
   - Dynamic report generation

5. **Add Hosting:**
   - Heroku, AWS, Google Cloud, etc.
   - Domain & SSL certificate

6. **Add Monitoring:**
   - Error tracking (Sentry)
   - Analytics (Google Analytics)
   - Performance monitoring

## 📞 Support

Jika ada yang tidak jelas atau ada bug, periksa:
1. Console errors (F12 → Console tab)
2. localStorage data (F12 → Application → localStorage)
3. Database structure di database.js
4. Functions di utils.js & auth.js

## 🎓 Learning Points

Dari aplikasi ini Anda belajar:
- ✅ HTML5 semantic markup
- ✅ CSS3 (Grid, Flexbox, Responsive)
- ✅ Vanilla JavaScript (ES6+)
- ✅ DOM manipulation
- ✅ Event handling
- ✅ localStorage API
- ✅ Form validation
- ✅ Data structures
- ✅ Functions & closures
- ✅ Array methods (map, filter, find, reduce)
- ✅ Date handling
- ✅ CSV export
- ✅ Print styling
- ✅ UI/UX best practices

---

**Selamat belajar & semoga aplikasi ini bermanfaat! 🎉**

**Version:** 1.0  
**Created:** January 2026  
**Language:** Indonesian (ID)
