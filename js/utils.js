// Fungsi Utilitas SIPP

// Helper: Format tanggal ke Indonesia
function formatTanggal(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', options);
}

// Helper: Hitung selisih hari
function hitungSelisihHari(tanggal1, tanggal2) {
  const date1 = new Date(tanggal1);
  const date2 = new Date(tanggal2);
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper: Cek apakah sudah overdue
function isOverdue(tanggalJatuhTempo) {
  return new Date(tanggalJatuhTempo) < new Date();
}

// Helper: Hitung denda otomatis (Rp 5000 per hari)
function hitungDenda(tanggalJatuhTempo, tanggalKembali) {
  if (!isOverdue(tanggalJatuhTempo)) return 0;
  const hariTerlambat = hitungSelisihHari(tanggalJatuhTempo, tanggalKembali);
  return hariTerlambat * 5000;
}

// Helper: Format mata uang Rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Helper: Generate ID unik
function generateId(prefix) {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return prefix + timestamp + random;
}

// Helper: Cari data dari array
function cariData(array, key, value) {
  return array.find(item => item[key] === value);
}

// Helper: Filter data dengan multiple condition
function filterData(array, conditions) {
  return array.filter(item => {
    return Object.keys(conditions).every(key => item[key] === conditions[key]);
  });
}

// Helper: Jatuh tempo otomatis (14 hari dari tanggal pinjam)
function hitungJatuhTempo(tanggalPinjam) {
  const date = new Date(tanggalPinjam);
  date.setDate(date.getDate() + 14);
  return date.toISOString().split('T')[0];
}

// Helper: Tampilkan alert
function tampilAlert(type, message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <div class="alert-content">
      <span>${message}</span>
      <button class="btn-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 4000);
}

// Helper: Validasi form
function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}

// Helper: Reset form
function resetForm(formId) {
  const form = document.getElementById(formId);
  if (form) form.reset();
}

// Helper: Export ke CSV (simulasi)
function exportToCSV(data, filename) {
  if (data.length === 0) {
    tampilAlert('warning', 'Tidak ada data untuk diexport');
    return;
  }

  const keys = Object.keys(data[0]);
  let csv = keys.join(',') + '\n';
  
  data.forEach(row => {
    csv += keys.map(key => {
      const value = row[key];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename + '.csv';
  a.click();
  window.URL.revokeObjectURL(url);
  
  tampilAlert('success', 'Data berhasil diexport');
}

// Helper: Print halaman
function printHalaman(elementId, title) {
  const printWindow = window.open('', '', 'width=800,height=600');
  const element = document.getElementById(elementId);
  
  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          .header { text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <p>Tanggal: ${formatTanggal(new Date())}</p>
        </div>
        ${element.innerHTML}
        <script>
          window.print();
          window.close();
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

// Helper: Ambil session user
function getCurrentUser() {
  const user = sessionStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// Helper: Simpan session user
function setCurrentUser(user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
}

// Helper: Logout
function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = '../index.html';
}
