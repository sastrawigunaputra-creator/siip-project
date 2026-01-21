# ❓ SIPP - FAQ & Troubleshooting

## ❓ Frequently Asked Questions

### Q1: Apa itu SIPP?
**A:** SIPP adalah prototype web-based Sistem Informasi Peminjaman Buku Perusahaan. Ini adalah aplikasi simulasi untuk mengelola peminjaman buku dengan fitur role-based access, transaksi otomatis, dan laporan.

### Q2: Apakah perlu backend/database?
**A:** Tidak. Aplikasi ini menggunakan localStorage browser sebagai simulasi database. Data disimpan di browser local, bukan server. Cocok untuk demo/prototype.

### Q3: Bagaimana login?
**A:** Gunakan akun demo:
- **Admin:** budi@company.com / admin123
- **User:** andi@company.com / user123

### Q4: Apakah password saya aman?
**A:** Tidak. Ini adalah demo. Password tidak di-hash. Untuk production, implementasikan bcrypt atau library hashing lain.

### Q5: Apakah data saya akan hilang?
**A:** Data disimpan di localStorage browser. Akan hilang jika:
- Clear browser cache/cookies
- Open di browser/device berbeda
- Uninstall browser

### Q6: Bagaimana reset data ke default?
**A:** Buka console (F12) dan jalankan:
```javascript
localStorage.removeItem('sipp_database');
location.reload();
```

### Q7: Apakah bisa export ke Excel?
**A:** Ya, tapi format CSV saja. Buka file CSV dengan Excel untuk spreadsheet. Untuk PDF, gunakan browser Print → Save as PDF.

### Q8: Bagaimana cara nambah buku/pegawai?
**A:** Login sebagai Admin → Master Buku/Master Pegawai → Klik "+ Tambah" → Isi form → Simpan.

### Q9: Apakah overdue tracking otomatis?
**A:** Ya. Sistem auto-check tanggal kembali vs jatuh tempo. Jika terlambat, status berubah OVERDUE dan denda auto-calculate.

### Q10: Apakah bisa pakai di mobile?
**A:** Ya. Aplikasi fully responsive. Buka di smartphone browser, akan auto-adjust layoutnya.

### Q11: Bagaimana cara share data ke orang lain?
**A:** Tidak bisa langsung. Setiap device punya localStorage terpisah. Solusi:
1. Export data via CSV
2. Import ke device lain (manual)
3. Atau gunakan cloud database jika production

### Q12: Apakah ada notifikasi email untuk overdue?
**A:** Tidak. Hanya browser notification via alert. Untuk email real, perlu backend + email service.

### Q13: Berapa maksimal buku/pegawai yang bisa disimpan?
**A:** Tidak ada limit. Browser localStorage biasanya support 5-10MB. Untuk 1000+ records tetap ok.

### Q14: Apakah bisa multiple login?
**A:** Tidak. Session disimpan di satu browser. Jika login di device lain, data terpisah.

### Q15: Bagaimana jika ada bug?
**A:** Cek console (F12 → Console) untuk error message. Atau lihat localStorage data untuk verify.

---

## 🐛 Troubleshooting

### Problem: Halaman blank saat dibuka
**Solution:**
1. Refresh halaman (Ctrl+F5)
2. Cek console untuk error (F12)
3. Pastikan semua file ada di folder
4. Clear browser cache

### Problem: Login tidak berhasil
**Solution:**
1. Pastikan email & password benar (case-sensitive)
2. Cek demo credentials di README
3. Clear localStorage: `localStorage.clear()`
4. Refresh dan coba lagi

### Problem: Data tidak tersimpan
**Solution:**
1. Cek apakah localStorage enabled
   ```javascript
   // Buka console
   localStorage.setItem('test', 'value');
   localStorage.getItem('test');  // should return 'value'
   ```
2. Jika private/incognito mode, localStorage tidak persist
3. Cek disk space (jika penuh, localStorage bisa fail)

### Problem: Dropdown kosong
**Solution:**
1. Pastikan sudah ada data master (buku & pegawai)
2. Cek database.js untuk dummy data
3. Refresh halaman
4. Buka console: `console.log(database.buku)` - pastikan ada data

### Problem: Export CSV tidak work
**Solution:**
1. Cek file download (mungkin terdownload tapi tidak terlihat)
2. Allowed file format: CSV (comma-separated values)
3. Cek antivirus/firewall tidak block download
4. Coba browser lain

### Problem: Print tidak keluar
**Solution:**
1. Pastikan printer terdeteksi
2. Buka print dialog (Ctrl+P)
3. Select printer & paper size
4. CSS print styles sudah included di style.css
5. Cek page preview di print dialog

### Problem: Modal tidak mau ditutup
**Solution:**
1. Klik tombol X di header modal
2. Klik luar modal area
3. Klik tombol "Batal"
4. Refresh halaman jika stuck

### Problem: Tabel tidak muncul
**Solution:**
1. Cek apakah ada data di database
   ```javascript
   console.table(database.buku);  // Check if empty
   ```
2. Pastikan function loadTable() dipanggil
3. Cek console untuk error
4. Clear localStorage & reload

### Problem: Stok tidak berkurang/bertambah
**Solution:**
1. Pastikan submit form berhasil (lihat alert)
2. Cek database.buku untuk stok terbaru
   ```javascript
   console.log(database.buku.find(b => b.id === 'BK001'));
   ```
3. Pastikan refresh halaman setelah transaksi
4. Cek audit trail untuk confirm aksi recorded

### Problem: Denda tidak terhitung
**Solution:**
1. Pastikan tanggal kembali > tanggal jatuh tempo
2. Formula: (hari terlambat) × Rp 5.000
3. Cek di console:
   ```javascript
   hitungDenda('2026-01-01', '2026-01-11');  // Should return 50000
   ```
4. Cek database.pengembalian untuk denda recorded

### Problem: Alert tidak muncul
**Solution:**
1. Pastikan function tampilAlert() dipanggil dengan benar
2. Cek console untuk error
3. Cek CSS ada `.alert` style
4. Alert auto-dismiss dalam 4 detik

### Problem: Search tidak jalan
**Solution:**
1. Pastikan event listener setup (addEventListener)
2. Cek console untuk error
3. Search case-insensitive, jadi "Clean" atau "clean" keduanya work
4. Partial match work (cari "code" untuk "Clean Code")

### Problem: Validasi form tidak bekerja
**Solution:**
1. Pastikan field punya attribute `required`
2. Cek console untuk validation error
3. Manual validate:
   ```javascript
   validateForm('formId');  // return true/false
   ```
4. Pastikan form ID match

### Problem: Session logout tidak work
**Solution:**
1. Cek apakah handleLogout() dipanggil
2. Manual logout di console:
   ```javascript
   sessionStorage.removeItem('currentUser');
   window.location.href = 'index.html';
   ```
3. Pastikan bukan browser issue (clear cache)

### Problem: Role-based access tidak work
**Solution:**
1. Cek user role di session:
   ```javascript
   console.log(getCurrentUser().role);  // 'admin' atau 'user'
   ```
2. Pastikan checkAdminAccess() dipanggil saat halaman load
3. Jika user bukan admin, harus redirect ke index.html
4. Clear session & login ulang

---

## 🔍 Debug Tips

### 1. Check Database State
```javascript
// Open Console (F12)
console.log('All Data:', database);
console.table(database.buku);
console.table(database.peminjaman);
```

### 2. Check Current User
```javascript
console.log('Current User:', getCurrentUser());
```

### 3. Check localStorage
```javascript
console.log('localStorage keys:', Object.keys(localStorage));
console.log('SIPP Database:', JSON.parse(localStorage.getItem('sipp_database')));
```

### 4. Test Functions
```javascript
// Test helper functions
console.log(formatTanggal('2026-01-11'));
console.log(formatRupiah(50000));
console.log(hitungSelisihHari('2026-01-01', '2026-01-11'));
console.log(hitungDenda('2026-01-01', '2026-01-11'));
```

### 5. Test DOM Elements
```javascript
// Check if elements exist
console.log(document.getElementById('bukuTableBody'));
console.log(document.querySelector('.modal'));
```

### 6. Monitor Events
```javascript
// Add listener untuk debug
document.addEventListener('click', function(e) {
  console.log('Clicked:', e.target.id || e.target.className);
});
```

### 7. Performance Check
```javascript
// Measure function speed
console.time('loadBukuTable');
loadBukuTable();
console.timeEnd('loadBukuTable');
```

---

## ⚙️ Configuration Options

### Change Late Fee Amount
File: `js/utils.js`
```javascript
function hitungDenda(tanggalJatuhTempo, tanggalKembali) {
  // ... code ...
  return hariTerlambat * 5000;  // ← CHANGE 5000
}
```

### Change Loan Duration
File: `js/utils.js`
```javascript
function hitungJatuhTempo(tanggalPinjam) {
  // ... code ...
  date.setDate(date.getDate() + 14);  // ← CHANGE 14
}
```

### Change Color Theme
File: `css/style.css`
```css
:root {
  --primary-color: #2c3e50;      /* ← CHANGE */
  --secondary-color: #3498db;    /* ← CHANGE */
}
```

### Add New Account
File: `data/database.js`
```javascript
database.users.push({
  id: 'USR001',
  name: 'New User',
  email: 'new@company.com',
  password: 'pass123',  // ← ADD YOUR PASSWORD
  role: 'user',
  department: 'IT'
});
```

---

## 📊 Performance Optimization

Jika aplikasi lag/slow:

### 1. Clear localStorage
```javascript
localStorage.clear();
location.reload();
```

### 2. Reduce dummy data
Edit `database.js`, kurangi buku/pegawai records

### 3. Disable animations
Edit `style.css`, set animation duration ke 0

### 4. Batch DOM updates
```javascript
// Instead of:
records.forEach(r => tbody.appendChild(createRow(r)));

// Do this:
let fragment = document.createDocumentFragment();
records.forEach(r => fragment.appendChild(createRow(r)));
tbody.appendChild(fragment);
```

### 5. Use pagination
Edit table untuk show 10 records per page, punya next/prev button

---

## 📱 Mobile Issues

### Touch not working
- Pastikan button punya `:active` state di CSS

### Layout broken
- Clear browser cache
- Open Developer Tools → Device Toolbar → Toggle device
- Test di berbagai screen size

### Keyboard not showing
- Input field harus punya `type` attribute (email, date, text)
- Touch datepicker baru show jika input type="date"

### Scroll not smooth
- Add `scroll-behavior: smooth;` di CSS
- Pastikan tidak punya `overflow: hidden` di parent

---

## 🌐 Browser Specific Issues

### Chrome
- localStorage biasanya ok
- Dev tools paling lengkap (F12)

### Firefox
- localStorage ok
- Inspect Element agak berbeda UI

### Safari
- localStorage mungkin need permission
- Private mode tidak persist localStorage
- Check Develop → Show Web Inspector

### Edge
- Same as Chrome (Chromium-based)

---

## 🔒 Security Notes

Ini adalah DEMO, bukan production-ready dari sisi security:
- ❌ Password tidak di-hash (plaintext di localStorage)
- ❌ Tidak ada SQL injection protection (tidak pake SQL)
- ❌ Tidak ada CSRF token
- ❌ Tidak ada rate limiting
- ❌ Session tidak expire otomatis

Untuk production, implementasikan:
- ✅ Backend authentication
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens dengan expiration
- ✅ HTTPS/SSL
- ✅ CORS security
- ✅ Input validation & sanitization
- ✅ Rate limiting

---

## 📞 Still Need Help?

1. **Read Documentation:**
   - README.md - Overview
   - QUICKSTART.md - Getting started
   - DEVELOPER.md - API reference
   - IMPLEMENTATION.md - Feature checklist

2. **Check Console:**
   - Open F12 → Console tab
   - Look for red error messages
   - Test functions manually

3. **Check Data:**
   - Open F12 → Application → localStorage
   - See actual data stored
   - Verify database structure

4. **Test Scenarios:**
   - Follow testing checklist di QUICKSTART.md
   - Try demo accounts
   - Trace through UI manually

5. **Modify Code:**
   - Start small with 1 change
   - Test thoroughly
   - Keep backup copy

---

**Happy Debugging! 🎉**

*Jika masih stuck, check file comments di code - ada hints di sana juga!*
