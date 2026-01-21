// Data Dummy SIPP - Simulasi Database
const database = {
  // Data Admin/User untuk login
  users: [
    {
      id: "ADM001",
      name: "Budi Santoso",
      email: "budi@company.com",
      password: "admin123", // dalam praktik harus di-hash
      role: "admin",
      department: "Library Staff"
    },
    {
      id: "EMP001",
      name: "Andi Wijaya",
      email: "andi@company.com",
      password: "user123",
      role: "user",
      department: "IT"
    },
    {
      id: "EMP002",
      name: "Siti Rahmawati",
      email: "siti@company.com",
      password: "user123",
      role: "user",
      department: "HR"
    },
    {
      id: "EMP003",
      name: "Muhammad Rizki",
      email: "rizki@company.com",
      password: "user123",
      role: "user",
      department: "Finance"
    }
  ],

  // Master Data Pegawai
  pegawai: [
    {
      id: "EMP001",
      name: "Andi Wijaya",
      position: "Senior Developer",
      department: "IT",
      phone: "0812-3456-7890",
      email: "andi@company.com"
    },
    {
      id: "EMP002",
      name: "Siti Rahmawati",
      position: "HR Manager",
      department: "HR",
      phone: "0812-3456-7891",
      email: "siti@company.com"
    },
    {
      id: "EMP003",
      name: "Muhammad Rizki",
      position: "Finance Officer",
      department: "Finance",
      phone: "0812-3456-7892",
      email: "rizki@company.com"
    },
    {
      id: "EMP004",
      name: "Lina Kusuma",
      position: "Junior Developer",
      department: "IT",
      phone: "0812-3456-7893",
      email: "lina@company.com"
    },
    {
      id: "EMP005",
      name: "Ahmad Suryanto",
      position: "Marketing Manager",
      department: "Marketing",
      phone: "0812-3456-7894",
      email: "ahmad@company.com"
    }
  ],

  // Master Data Buku
  buku: [
    {
      id: "BK001",
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      publisher: "Prentice Hall",
      year: 2008,
      stock: 3,
      isbn: "978-0132350884",
      category: "Programming"
    },
    {
      id: "BK002",
      title: "The Pragmatic Programmer",
      author: "David Thomas, Andrew Hunt",
      publisher: "Addison-Wesley",
      year: 2019,
      stock: 2,
      isbn: "978-0135957059",
      category: "Programming"
    },
    {
      id: "BK003",
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Gang of Four",
      publisher: "Addison-Wesley",
      year: 1994,
      stock: 1,
      isbn: "978-0201633610",
      category: "Programming"
    },
    {
      id: "BK004",
      title: "Refactoring: Improving the Design of Existing Code",
      author: "Martin Fowler",
      publisher: "Addison-Wesley",
      year: 2018,
      stock: 2,
      isbn: "978-0134757599",
      category: "Programming"
    },
    {
      id: "BK005",
      title: "The Lean Startup",
      author: "Eric Ries",
      publisher: "Crown Business",
      year: 2011,
      stock: 3,
      isbn: "978-0307887894",
      category: "Business"
    },
    {
      id: "BK006",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      publisher: "Farrar, Straus and Giroux",
      year: 2011,
      stock: 1,
      isbn: "978-0374275631",
      category: "Psychology"
    },
    {
      id: "BK007",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      publisher: "Harper",
      year: 2014,
      stock: 2,
      isbn: "978-0062316097",
      category: "History"
    },
    {
      id: "BK008",
      title: "21 Lessons for the 21st Century",
      author: "Yuval Noah Harari",
      publisher: "Spiegel & Grau",
      year: 2018,
      stock: 0,
      isbn: "978-0525512172",
      category: "History"
    }
  ],

  // Transaksi Peminjaman
  peminjaman: [
    {
      id: "PJM001",
      pegawaiId: "EMP001",
      bukuId: "BK001",
      tanggalPinjam: "2025-12-20",
      tanggalJatuhTempo: "2026-01-03",
      status: "active",
      denda: 0,
      catatan: "Peminjaman biasa"
    },
    {
      id: "PJM002",
      pegawaiId: "EMP002",
      bukuId: "BK002",
      tanggalPinjam: "2025-12-22",
      tanggalJatuhTempo: "2026-01-05",
      status: "active",
      denda: 0,
      catatan: "Peminjaman biasa"
    },
    {
      id: "PJM003",
      pegawaiId: "EMP001",
      bukuId: "BK005",
      tanggalPinjam: "2025-12-18",
      tanggalJatuhTempo: "2026-01-01",
      status: "overdue",
      denda: 50000,
      catatan: "OVERDUE - 10 hari terlambat"
    },
    {
      id: "PJM004",
      pegawaiId: "EMP003",
      bukuId: "BK004",
      tanggalPinjam: "2025-12-25",
      tanggalJatuhTempo: "2026-01-08",
      status: "active",
      denda: 0,
      catatan: "Peminjaman biasa"
    },
    {
      id: "PJM005",
      pegawaiId: "EMP004",
      bukuId: "BK007",
      tanggalPinjam: "2025-12-21",
      tanggalJatuhTempo: "2026-01-04",
      status: "active",
      denda: 0,
      catatan: "Peminjaman biasa"
    }
  ],

  // Riwayat Pengembalian
  pengembalian: [
    {
      id: "KMB001",
      peminjamanId: "PJM006",
      pegawaiId: "EMP002",
      bukuId: "BK003",
      tanggalPinjam: "2025-12-10",
      tanggalKembali: "2025-12-20",
      tanggalJatuhTempo: "2025-12-24",
      denda: 0,
      status: "returned"
    },
    {
      id: "KMB002",
      peminjamanId: "PJM007",
      pegawaiId: "EMP003",
      bukuId: "BK006",
      tanggalPinjam: "2025-12-15",
      tanggalKembali: "2025-12-28",
      tanggalJatuhTempo: "2025-12-29",
      denda: 5000,
      status: "returned"
    }
  ],

  // Audit Trail
  auditTrail: [
    {
      id: "AUD001",
      timestamp: "2025-12-20 10:30:45",
      userId: "ADM001",
      action: "CREATE",
      module: "Buku",
      description: "Menambah buku BK001",
      details: "Clean Code ditambahkan ke sistem"
    },
    {
      id: "AUD002",
      timestamp: "2025-12-21 14:15:30",
      userId: "ADM001",
      action: "CREATE",
      module: "Peminjaman",
      description: "Input peminjaman PJM001",
      details: "EMP001 meminjam BK001"
    },
    {
      id: "AUD003",
      timestamp: "2025-12-22 09:45:10",
      userId: "ADM001",
      action: "UPDATE",
      module: "Buku",
      description: "Update stok BK001",
      details: "Stok berkurang dari 4 menjadi 3"
    }
  ]
};

// Fungsi untuk menyimpan data ke localStorage (simulasi backup)
function saveDatabase() {
  localStorage.setItem('sipp_database', JSON.stringify(database));
  console.log('Database disimpan ke localStorage');
}

// Fungsi untuk memuat data dari localStorage
function loadDatabase() {
  const saved = localStorage.getItem('sipp_database');
  if (saved) {
    Object.assign(database, JSON.parse(saved));
    console.log('Database dimuat dari localStorage');
  } else {
    saveDatabase(); // Simpan data default pertama kali
  }
}

// Muat database saat halaman dimuat
loadDatabase();
