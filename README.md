# 📚 SIPP (Sistem Informasi Peminjaman Buku Perusahaan)

Prototype web-based untuk manajemen peminjaman buku di perusahaan dengan fitur role-based access, transaksi otomatis, dan laporan komprehensif.

## 🎯 Fitur Utama

### 1. **Autentikasi & Role-Based Access**
- Login dengan role: Admin (Petugas Perpustakaan) dan User (Pegawai)
- Session management via `sessionStorage`
- Password validation (demo)
- Redirect otomatis sesuai role

### 2. **Dashboard Admin** ✅
- Statistik real-time (Total Buku, Stok, Peminjaman Aktif, Overdue, Denda)
- Aktivitas sistem terbaru
- CRUD Master Data Buku dan Pegawai
- Input Transaksi Peminjaman dengan validasi stok
- Input Transaksi Pengembalian dengan perhitungan denda otomatis
- Laporan (Stok, Overdue, Riwayat)
- Audit Trail lengkap
- Export ke CSV
- Print laporan

### 3. **Dashboard User** ✅
- Statistik peminjaman pribadi
- Lihat daftar buku dengan status ketersediaan
- Riwayat peminjaman dengan status overdue
- Search buku
- Export riwayat

### 4. **Fitur Transaksional**
- **Peminjaman:**
  - Pilih pegawai & buku
  - Validasi stok real-time (< 2 detik)
  - Hitung jatuh tempo otomatis (14 hari)
  - Kurangi stok (-1)
  - Generate struk peminjaman
  
- **Pengembalian:**
  - Pilih peminjaman aktif
  - Input tanggal kembali realisasi
  - Hitung denda otomatis (Rp 5.000/hari jika overdue)
  - Tambah stok (+1)
  - Perbarui status peminjaman

### 5. **Manajemen Data**
- **Master Buku:** CRUD judul, penulis, penerbit, stok, ISBN
- **Master Pegawai:** CRUD nama, jabatan, departemen, telepon
- Real-time stok tracking
- Status ketersediaan (Tersedia/Habis)

### 6. **Laporan & Analytics**
- Laporan Stok Buku (judul, penulis, stok awal, stok tersedia, dipinjam)
- Laporan Pegawai Overdue (nama, denda akumulasi)
- Laporan Riwayat Peminjaman (lengkap dengan tanggal, status, denda)
- Export ke CSV
- Print ke kertas
- Audit Trail (siapa, kapan, apa, detail)

### 7. **Keamanan & Audit**
- Role-based access control (Admin vs User)
- Audit Trail lengkap setiap aksi (CREATE, READ, UPDATE, DELETE, LOGIN, LOGOUT)
- Timestamp setiap transaksi
- User logging per aksi

### 8. **Data Persistence**
- Local storage untuk simulasi database
- Backup otomatis ke `localStorage`
- Load data saat aplikasi start

## 📁 Struktur Folder

```
SIPP/
├── index.html                 # Halaman login
├── css/
│   └── style.css             # Styling utama (responsive)
├── js/
│   ├── database.js           # Data dummy & functions
│   ├── utils.js              # Helper functions
│   ├── auth.js               # Autentikasi & session
│   ├── admin.js              # Logic admin dashboard
│   └── user.js               # Logic user dashboard
├── data/
│   └── database.js           # File database (sudah di js/)
├── admin/
│   └── dashboard.html        # Admin dashboard page
└── user/
    └── dashboard.html        # User dashboard page
```

## 🔐 Akun Demo

Gunakan akun berikut untuk login:

### Admin (Petugas Perpustakaan)
- **Email:** `budi@company.com`
- **Password:** `admin123`
- **Role:** Admin

### User (Pegawai)
- **Email:** `andi@company.com`, `siti@company.com`, atau `rizki@company.com`
- **Password:** `user123`
- **Role:** User

## 📊 Data Dummy

### Pegawai (5 pengguna)
- Andi Wijaya (IT)
- Siti Rahmawati (HR)
- Muhammad Rizki (Finance)
- Lina Kusuma (IT)
- Ahmad Suryanto (Marketing)

### Buku (8 judul)
- Clean Code - Robert C. Martin
- The Pragmatic Programmer - David Thomas, Andrew Hunt
- Design Patterns - Gang of Four
- Refactoring - Martin Fowler
- The Lean Startup - Eric Ries
- Thinking, Fast and Slow - Daniel Kahneman
- Sapiens - Yuval Noah Harari
- 21 Lessons for the 21st Century - Yuval Noah Harari

### Peminjaman Aktif (5 records)
- Beberapa aktif, beberapa overdue
- Contoh denda terukur

## 🚀 Cara Menjalankan

1. **Open file `index.html`** di browser (gunakan live server untuk fitur optimal)
2. **Login** dengan akun demo
3. **Explore** fitur sesuai role:
   - Admin: kelola master data, input transaksi, lihat laporan
   - User: lihat daftar buku, riwayat peminjaman, denda

## 🔧 Teknologi

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage:** Browser `localStorage` (simulasi database)
- **Styling:** Custom CSS dengan grid/flexbox, responsive design
- **No Framework:** Pure JavaScript (mudah dipahami & dimodifikasi)

## ⚡ Performance

- **Validasi stok:** < 1 detik
- **Input transaksi:** < 2 detik
- **Render tabel:** < 500ms
- **Load page:** < 1 detik

## 📋 Modul & Fitur Detail

### Admin - Master Data
| Fitur | Status | Keterangan |
|-------|--------|-----------|
| CRUD Buku | ✅ | Create, Read, Update, Delete |
| CRUD Pegawai | ✅ | Create, Read, Update, Delete |
| View Stok | ✅ | Real-time status ketersediaan |
| Edit Stok Manual | ✅ | Adjust stok jika diperlukan |

### Admin - Transaksi
| Fitur | Status | Keterangan |
|-------|--------|-----------|
| Input Peminjaman | ✅ | Form + validasi stok + auto jatuh tempo |
| Generate Struk | ✅ | PDF-like layout (print-able) |
| Input Pengembalian | ✅ | Form + auto denda calculation |
| Update Stok | ✅ | Otomatis +1 saat pengembalian |
| Track Overdue | ✅ | Auto-flag jika lampau jatuh tempo |

### Admin - Laporan
| Fitur | Status | Keterangan |
|-------|--------|-----------|
| Laporan Stok | ✅ | Detail per buku |
| Laporan Overdue | ✅ | Pegawai + denda |
| Laporan Riwayat | ✅ | Semua transaksi |
| Export CSV | ✅ | Download data |
| Print | ✅ | Format A4 ready |

### Admin - Audit
| Fitur | Status | Keterangan |
|-------|--------|-----------|
| Log aktivitas | ✅ | Timestamp + user + action + detail |
| Export audit | ✅ | CSV download |
| View last activities | ✅ | Dashboard widget |

### User - Dashboard
| Fitur | Status | Keterangan |
|-------|--------|-----------|
| View stats | ✅ | Buku dipinjam, overdue, denda, total |
| Lihat peminjaman aktif | ✅ | Dengan status overdue indicator |
| View all books | ✅ | Dengan status stok & search |
| Riwayat peminjaman | ✅ | Lengkap dengan denda |
| Export riwayat | ✅ | CSV personal |

## 🎨 UI/UX Features

- **Responsive Design:** Desktop, tablet, mobile
- **Dark Mode Ready:** Theme color-coded
- **Intuitive Navigation:** Sidebar menu + header nav
- **Visual Feedback:** Alert messages, status badges, loading states
- **Forms Validation:** Required fields, date pickers
- **Search & Filter:** Cari buku, filter data
- **Print-Friendly:** CSS khusus print

## 💾 Data Persistence

Data disimpan di `localStorage` dengan key `sipp_database`:
```javascript
localStorage.setItem('sipp_database', JSON.stringify(database));
localStorage.getItem('sipp_database');
```

Untuk reset data, buka Console dan jalankan:
```javascript
localStorage.removeItem('sipp_database');
location.reload();
```

## 🔄 Workflow Contoh

### Workflow Peminjaman (Admin)
1. Login Admin
2. Go to "Input Peminjaman"
3. Pilih Pegawai & Buku
4. System auto-calculate jatuh tempo (14 hari)
5. Click "Simpan Peminjaman"
6. View struk
7. Print atau close
8. Stok otomatis berkurang (-1)

### Workflow Pengembalian (Admin)
1. Go to "Input Pengembalian"
2. Pilih peminjaman aktif
3. Input tanggal kembali realisasi
4. System auto-calculate denda jika overdue
5. Click "Proses Pengembalian"
6. Stok otomatis bertambah (+1)
7. Lihat di laporan

### Workflow User
1. Login User
2. Dashboard: lihat stats & peminjaman aktif
3. "Daftar Buku": browse & search buku
4. "Riwayat Peminjaman": lihat history & denda
5. Export riwayat jika diperlukan

## 🐛 Testing Checklist

- [x] Login/Logout flow
- [x] Role-based access control
- [x] Master buku CRUD
- [x] Master pegawai CRUD
- [x] Peminjaman (stok validation, jatuh tempo, struk)
- [x] Pengembalian (denda calculation, stok update)
- [x] Laporan generate & export
- [x] Audit trail
- [x] Search & filter
- [x] Print functionality
- [x] Responsive design
- [x] Data persistence

## 🚧 Enhancement Ideas

1. **Database Backend:** Ganti localStorage dengan API REST
2. **Authentication:** Implement JWT token
3. **PDF Export:** Gunakan library seperti jsPDF
4. **Charts:** Visualisasi laporan dengan Chart.js
5. **Email Notification:** Alert overdue via email
6. **SMS Reminder:** Reminder peminjaman via SMS
7. **Multi-language:** Support EN & ID
8. **Dark Mode:** Implementasi theme switcher
9. **Mobile App:** React Native / Flutter
10. **Analytics:** Dashboard with KPI metrics

## 📝 Notes

- Data dummy sudah ada di `database.js`
- Tidak ada koneksi database real
- Semua transaksi simulasi on browser
- Denda: Rp 5.000 per hari terlambat
- Jatuh tempo default: 14 hari dari tanggal pinjam
- Audit trail automatically tracked
- Export CSV bisa dibuka di Excel

## 👤 Author

Created as a prototype for PT. XYZ - Library Management System (SIPP)

---

**Happy Coding! 📚**
