# Admin Master Plan & Specification (Rebuild v2)

Dokumen ini adalah cetak biru (blueprint) **Final** untuk membangun ulang modul **Admin** dari nol. Fokus utama adalah menciptakan pengalaman pengguna yang **Vibrant, Modern, dan Mobile-Optimized**, dengan detail data yang lengkap.

## 1. Filosofi Desain & Arsitektur
*   **Pendekatan**: *Mobile-First*. UI mobile adalah warga kelas satu (Priority), bukan sekadar responsif.
*   **Strategi Responsif**: Menggunakan **Switcher Pattern**.
    *   `Page.jsx`: Logic Container & Device Detector (`isMobile`).
    *   `PageMobile.jsx`: View khusus Mobile (Navigasi bawah/Touch-friendly).
    *   `PageDesktop.jsx`: View khusus Desktop (Sidebar/Table Dense).
*   **Tema Visual**:
    *   **Glassmorphism**: Transparansi halus pada header dan kartu.
    *   **Vibrant Gradients**: Pembeda visual antar entitas (Siswa=Hijau/Biru, Guru=Ungu, Kelas=Oranye).
    *   **Rounded UI**: Sudut `rounded-2xl` atau `rounded-3xl` untuk kesan modern app-like.

## 2. Spesifikasi Data & Fitur (Detail)

### A. Dashboard (Command Center)
*   **Data yang Ditampilkan**:
    *   `TodayStats`: Kehadiran (%) hari ini, Total Poin Sekolah.
    *   `WaitingVerification`: Jumlah laporan ibadah status "Pending".
    *   `RecentLogs`: 5 aktivitas terakhir (Avatar Siswa, Ibadah, Waktu).
*   **Fitur**:
    *   Greeting sesuai jam (Selamat Pagi/Siang).
    *   Quick Actions: "Tambah Siswa", "Broadcast".

### B. Manajemen Siswa (Student Data)
*   **Struktur Data Siswa**:
    *   `NIS` (Unique ID), `Nama Lengkap`.
    *   `Kelas` (Relasi ke Data Kelas).
    *   `Gender` (L/P - mempengaruhi UI Avatar).
    *   `Total Poin` (Gamifikasi).
    *   `Orang Tua / Wali` (No HP untuk notifikasi WA).
*   **Data Ibadah**:
    *   `Riwayat Ibadah`: Log harian (Sholat, Tilawah, dll).
    *   `Target`: Status pencapaian harian (misal: 8/8 ibadah).

### C. Manajemen Guru (Teacher Data)
*   **Struktur Data Guru**:
    *   `NIP/ID`, `Nama Lengkap`.
    *   `Status Wali Kelas`: (Apakah memegang kelas? Jika ya, Kelas berapa?).
*   **Fitur**:
    *   Assign Wali Kelas (Drag & Drop atau Dropdown).
    *   Monitor Kinerja: Berapa banyak catatan/verifikasi yang dilakukan guru.

### D. Manajemen Kelas (Academic)
*   **Data**:
    *   `Nama Kelas` (1 Abu Bakar, 2 Umar, dst).
    *   `Tahun Ajaran` (2025/2026 Ganjil).
    *   `Wali Kelas` (Relasi ke Guru).
    *   `Jumlah Siswa`.

### E. Pengaturan & Gamifikasi
*   **Aturan Poin**:
    *   Admin bisa set: "Sholat Wajib = 20 Poin", "Dhuha = 10 Poin".
*   **Target Harian**: Konsistensi target yang harus dicapai siswa.

## 3. Struktur Direktori (Technical)
Pemisahan logic dan view yang tegas.

```
src/pages/admin/
├── components/          # Shared: AdminHeader, StatCard, ListTicket
├── dashboard/           # Dashboard Module
│   ├── Dashboard.jsx        # Switcher
│   ├── DashboardMobile.jsx  # Mobile View
│   └── DashboardDesktop.jsx # Desktop View
├── students/            # Student CRUD Module
│   ├── ManageStudents.jsx   # Switcher
│   ├── StudentsMobile.jsx   # Mobile List & Form
│   └── StudentsDesktop.jsx  # Desktop Table
├── teachers/            # Teacher Module
├── classes/             # Class Module
└── activities/          # Activity Log / Monitoring
```

## 4. Roadmap Pengerjaan (Refined)
1.  **Fase 1: Dasbor Mobile (The "Wow" Factor)**
    *   Membuat `AdminHeader` dengan greeting.
    *   Membuat `DashboardMobile` dengan statistik dummy yang cantik.
2.  **Fase 2: Daftar Siswa (Core Data)**
    *   Membuat `StudentsMobile` dengan fitur Search & Filter.
    *   Card Siswa dengan indikator Poin & Kelas.
3.  **Fase 3: CRUD Siswa**
    *   Modal/Page "Tambah Siswa" & "Edit Siswa".
4.  **Fase 4: Manajemen Guru & Kelas**
    *   Fitur assign Wali Kelas.

## 5. Next Action
Saya akan mulai **Fase 1** untuk membangun `DashboardMobile.jsx` yang menarik secara visual sebagai pondasi.

saya ingin fokus dulu membuat frontend adminnya