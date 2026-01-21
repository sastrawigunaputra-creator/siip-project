# 🚀 SIPP - Panduan Memulai (Bahasa Indonesia Sederhana)

## 👋 Selamat Datang!

Anda telah menerima **Sistem Informasi Peminjaman Buku Perusahaan (SIPP)** yang sudah jadi!

---

## ⚡ Mulai dalam 3 Langkah

### 1️⃣ Buka Aplikasi
- Cari file **`index.html`** di folder SIPP
- **Double-click** atau buka dengan browser (Chrome, Firefox, dll)
- Tunggu 2-3 detik sampai loading selesai

### 2️⃣ Login
Gunakan akun ini:

**Admin (Petugas Perpustakaan):**
```
Email: budi@company.com
Password: admin123
```

**User (Pegawai):**
```
Email: andi@company.com
Password: user123
```

Klik **"Masuk"** → Tunggu redirect ke dashboard

### 3️⃣ Explore
**Jika Anda Admin:**
- Klik **Master Buku** → Lihat daftar buku, bisa tambah/edit/hapus
- Klik **Input Peminjaman** → Isi form, pilih pegawai & buku, stok otomatis berkurang
- Klik **Input Pengembalian** → Denda otomatis hitung
- Klik **Laporan** → Export ke CSV atau print

**Jika Anda User:**
- Lihat **Daftar Buku** → Cari buku dengan search
- Lihat **Riwayat Peminjaman** → Lihat history peminjaman Anda
- Export riwayat jika perlu

---

## 🎯 Fitur Utama (Ringkas)

### ✅ Admin Bisa
- ✅ Tambah/Edit/Hapus Buku
- ✅ Tambah/Edit/Hapus Pegawai
- ✅ Catat Peminjaman (stok otomatis berkurang)
- ✅ Catat Pengembalian (denda otomatis hitung, stok bertambah)
- ✅ Lihat Laporan & Export ke Excel (CSV)
- ✅ Print dokumen

### ✅ User Bisa
- ✅ Lihat Daftar Buku
- ✅ Cari Buku
- ✅ Lihat Riwayat Peminjaman
- ✅ Lihat Denda (jika ada)

### ❌ User TIDAK Bisa
- ❌ Tambah/Edit/Hapus Buku
- ❌ Tambah/Edit/Hapus Pegawai
- ❌ Input Peminjaman/Pengembalian
- ❌ Lihat Data Orang Lain

---

## 📋 File-file yang Sudah Ada

```
Folder SIPP
├── index.html                    ← Halaman Login (buka ini!)
├── README.md                     ← Dokumentasi lengkap
├── QUICKSTART.md                 ← Panduan cepat
├── FAQ.md                        ← Tanya-Jawab
├── DEVELOPER.md                  ← Untuk programmer
├── DOCS_INDEX.md                 ← Daftar dokumentasi
├── DELIVERY_SUMMARY.md           ← Rangkuman project
│
├── admin/
│   └── dashboard.html            ← Halaman Admin
│
├── user/
│   └── dashboard.html            ← Halaman User
│
├── js/
│   ├── database.js               ← Data buku & pegawai
│   ├── utils.js                  ← Fungsi helper
│   ├── auth.js                   ← Login/logout
│   ├── admin.js                  ← Fitur admin
│   └── user.js                   ← Fitur user
│
├── css/
│   └── style.css                 ← Styling (warna, layout)
│
└── data/
    └── database.js               ← Struktur database
```

**Keterangan:** Semua file sudah lengkap, jangan perlu edit atau tambah file baru!

---

## 🔐 Akun Demo yang Tersedia

### Akun 1 - Admin
| Field | Value |
|-------|-------|
| Email | budi@company.com |
| Password | admin123 |
| Role | Admin |
| Status | Full Access ✅ |

### Akun 2 - User (Pegawai)
| Field | Value |
|-------|-------|
| Email | andi@company.com |
| Password | user123 |
| Role | User |
| Status | Limited Access ✅ |

### Akun 3 & 4 - User Lainnya
| Email | Password |
|-------|----------|
| siti@company.com | user123 |
| rizki@company.com | user123 |

Semua user pakai password yang sama: **user123**

---

## 📚 Data Demo yang Sudah Ada

### 📖 Buku (8 buah)
1. Clean Code - Robert C. Martin
2. The Pragmatic Programmer - David Thomas
3. Design Patterns - Gang of Four
4. Refactoring - Martin Fowler
5. The Lean Startup - Eric Ries
6. Thinking, Fast and Slow - Daniel Kahneman
7. Sapiens - Yuval Noah Harari
8. 21 Lessons for the 21st Century - Yuval Noah Harari

### 👥 Pegawai (5 orang)
1. Andi Wijaya - IT
2. Siti Rahmawati - HR
3. Muhammad Rizki - Finance
4. Lina Kusuma - IT
5. Ahmad Suryanto - Marketing

### 📋 Peminjaman (5 transaksi)
Sudah ada peminjaman aktif dan overdue untuk testing

### 💰 Denda
- Rp 5.000 per hari jika terlambat
- Otomatis hitung saat pengembalian

---

## 🎮 Testing Cepat (5 Menit)

### Test 1: Login Admin
1. Buka `index.html`
2. Masukkan: `budi@company.com` / `admin123`
3. Klik "Masuk"
4. **Expected:** Dashboard Admin muncul ✅

### Test 2: Lihat Buku
1. Di dashboard, klik **Master Buku**
2. **Expected:** Tabel 8 buku muncul ✅

### Test 3: Tambah Buku
1. Klik **+ Tambah Buku**
2. Isi form (judul, penulis, penerbit, tahun, stok)
3. Klik **Simpan**
4. **Expected:** Alert "Berhasil ditambahkan", tabel update ✅

### Test 4: Input Peminjaman
1. Klik **Input Peminjaman**
2. Pilih pegawai & buku
3. Klik **Simpan Peminjaman**
4. **Expected:** Stok berkurang 1 ✅

### Test 5: Input Pengembalian
1. Klik **Input Pengembalian**
2. Pilih peminjaman aktif
3. Input tanggal kembali (lambat dari jatuh tempo)
4. **Expected:** Denda otomatis muncul ✅

### Test 6: Login User
1. Logout dari admin
2. Login: `andi@company.com` / `user123`
3. **Expected:** Dashboard User muncul, menu terbatas ✅

---

## ❓ Pertanyaan yang Sering Diajukan

### Q: Berapa biaya denda?
**A:** Rp 5.000 per hari jika terlambat.

### Q: Berapa lama durasi peminjaman?
**A:** 14 hari dari tanggal pinjam.

### Q: Apakah bisa edit tanggal transaksi?
**A:** Tidak, hanya admin yang bisa input. Date picker sudah fixed.

### Q: Kemana data disimpan?
**A:** Di browser (localStorage). Tidak disimpan di server mana pun.

### Q: Apakah data hilang jika close browser?
**A:** Tidak. Data tersimpan sampai Anda clear cache browser.

### Q: Apakah bisa buka di 2 browser berbeda?
**A:** Data terpisah. Setiap browser punya data sendiri.

### Q: Bagaimana cara export ke Excel?
**A:** Klik **Export CSV**, file download. Buka dengan Excel.

### Q: Apakah bisa print?
**A:** Ya, klik **Print** button, gunakan browser print (Ctrl+P).

### Q: User lain bisa lihat data saya?
**A:** Tidak, setiap user hanya lihat data mereka sendiri.

### Q: Bagaimana reset data?
**A:** Buka Console (F12), jalankan: `localStorage.removeItem('sipp_database'); location.reload();`

---

## 🐛 Jika Ada Masalah

### Problem: Halaman blanc/kosong
**Solusi:**
1. Refresh browser (Ctrl+F5)
2. Pastikan file dalam folder SIPP
3. Try browser lain

### Problem: Login tidak berhasil
**Solusi:**
1. Pastikan email & password benar
2. Tidak ada spasi di awal/akhir
3. Password case-sensitive

### Problem: Dropdown kosong (tidak ada buku/pegawai)
**Solusi:**
1. Pastikan sudah ada data di Master Buku/Pegawai
2. Refresh halaman

### Problem: Tabel tidak ada/kosong
**Solusi:**
1. Refresh halaman
2. Pastikan data ada di database.js
3. Klik menu yang sesuai

### Problem: Export tidak bekerja
**Solusi:**
1. Cek folder Downloads
2. File mungkin sudah download, cek di situ
3. Try browser lain

### Problem: Data tidak tersimpan
**Solusi:**
1. Cek Console (F12 → Console)
2. Lihat error message
3. Pastikan localStorage tidak penuh

---

## 🎨 Cara Mengubah (Basic)

Jika ingin customize:

### Ubah Warna
File: `css/style.css`
```css
:root {
  --primary-color: #2c3e50;      /* Ganti warna sini */
  --secondary-color: #3498db;
}
```

### Ubah Denda
File: `js/utils.js`
```javascript
function hitungDenda(tanggalJatuhTempo, tanggalKembali) {
  return hariTerlambat * 5000;  // Ganti 5000 dengan jumlah baru
}
```

### Ubah Durasi Pinjam
File: `js/utils.js`
```javascript
function hitungJatuhTempo(tanggalPinjam) {
  date.setDate(date.getDate() + 14);  // Ganti 14 dengan hari baru
}
```

**⚠️ Hati-hati saat edit, bisa error jika tidak benar!**

---

## 📖 Dokumentasi Lengkap

Jika ingin tahu lebih detail, baca file dokumentasi:

1. **README.md** - Overview lengkap
2. **QUICKSTART.md** - Panduan cepat
3. **FAQ.md** - Tanya-Jawab
4. **DEVELOPER.md** - Untuk programmer
5. **DOCS_INDEX.md** - Daftar dokumentasi

---

## 💡 Tips & Trik

### Tip 1: Gunakan Search
Di halaman "Daftar Buku", gunakan search box untuk cari buku cepat.

### Tip 2: Lihat Overdue
Admin bisa lihat status OVERDUE di dashboard & daftar peminjaman.

### Tip 3: Export Laporan
Klik Export CSV untuk download data, bisa buka di Excel.

### Tip 4: Print Struk
Setelah input peminjaman, klik "Print" untuk print struk.

### Tip 5: Check Audit
Admin bisa lihat semua aktivitas di "Audit Trail" section.

---

## 🚀 Production Checklist

Jika mau deploy ke production:

- [ ] Tambah backend server (Node.js, Python, dll)
- [ ] Ganti localStorage dengan database real (MySQL, PostgreSQL)
- [ ] Implementasikan proper authentication (JWT, OAuth)
- [ ] Secure password dengan hash (bcrypt)
- [ ] Setup HTTPS/SSL
- [ ] Add email notifications
- [ ] Add PDF export
- [ ] Setup monitoring & logging
- [ ] Deploy ke cloud (AWS, Heroku, Google Cloud)

---

## 📞 Bantuan Lebih Lanjut

Jika masih ada pertanyaan:

1. **Baca FAQ.md** - 15+ pertanyaan sudah dijawab
2. **Baca QUICKSTART.md** - Ada testing scenarios
3. **Buka Console** (F12) - Lihat error message
4. **Check Dokumentasi** - Ada 20+ pages lengkap

---

## 🎉 Selamat!

Anda sekarang siap menggunakan SIPP!

### Langkah Selanjutnya:
1. ✅ Buka `index.html`
2. ✅ Login dengan akun demo
3. ✅ Explore semua fitur
4. ✅ Test scenarios dari QUICKSTART.md
5. ✅ Customize sesuai kebutuhan

---

## 📞 Support

Jika ada masalah technical:
- Check QUICKSTART.md (Troubleshooting section)
- Check FAQ.md (Debug tips)
- Open browser console (F12)
- Review source code comments

---

**Selamat menggunakan SIPP! 🎉**

Jangan lupa: **Semua data tersimpan di browser, pastikan backup jika diperlukan!**

---

*Dibuat: Januari 2026*  
*Bahasa: Bahasa Indonesia*  
*Versi: 1.0*  
*Status: ✅ Selesai*
