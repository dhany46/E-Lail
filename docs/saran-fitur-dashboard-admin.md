# Saran Fitur Dashboard Admin

Dokumen ini berisi rekomendasi fitur untuk **Dashboard Admin** dengan fokus pada **monitoring kegiatan siswa dan guru**.

---

## Fitur yang Sudah Ada Saat Ini

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Kartu Statistik | Total siswa, guru, kelas, dan verifikasi pending |
| 2 | Quick Actions | Tombol cepat: Add Siswa, Broadcast, Config |
| 3 | Real-time Log | Daftar aktivitas terbaru siswa |
| 4 | Link Navigasi | Akses ke halaman siswa, guru, kelas, aktivitas |

---

## Saran Fitur Monitoring Siswa

### 1. Ringkasan Ibadah Harian

Tampilkan statistik ibadah siswa hari ini dalam bentuk yang mudah dipahami.

| Komponen | Keterangan |
|----------|------------|
| **Total Input Hari Ini** | Jumlah siswa yang sudah input ibadah hari ini |
| **Belum Input** | Jumlah siswa yang belum input sama sekali |
| **Progress Bar** | Visual persentase siswa yang sudah input |
| **Waktu Terakhir Update** | Kapan data terakhir diperbarui |

**Contoh Tampilan:**
```
📊 Input Ibadah Hari Ini
━━━━━━━━━━━━━━━━━━━━━━━━
Sudah Input  : 380 siswa (84%)
Belum Inpu██████████████░░░░] 84%
```

---

### 2. Statistik Salat Wajib

Pantau kepatuhan salat wajib siswa per waktu salat.

| Waktu Salat | Data yang Ditampilkan |
|-------------|----------------------|
| Subuh | Jumlah & persentase siswa yang sudah input |
| Zuhur | Jumlah & persentase siswa yang sudah input |
| Asar | Jumlah & persentase siswa yang sudah input |
| Magrib | Jumlah & persentase siswa yang sudah input |
| Isya | Jumlah & persentase siswa yang sudah input |

**Manfaat:** Admin bisa melihat waktu salat mana yang paling sering dilewatkan siswa.

---

### 3. Peringkat Kelas (Leaderboard)

Tampilkan kelas dengan performa ibadah terbaik.

| Data | Keterangan |
|------|------------|
| **Peringkat 1-5** | 5 kelast  : 70 siswa (16%)
[██ dengan rata-rata poin tertinggi |
| **Rata-rata Poin** | Poin rata-rata per siswa di kelas tersebut |
| **Tingkat Kepatuhan** | Persentase siswa yang rutin input |
| **Trend** | Naik/turun dibanding minggu lalu |

**Contoh:**
```
🏆 Top 5 Kelas Minggu Ini
━━━━━━━━━━━━━━━━━━━━━━━━
1. Kelas 6A Abu Bakar   - 95 poin ⬆️
2. Kelas 5B Umar        - 92 poin ⬆️
3. Kelas 4A Utsman      - 88 poin ⬇️
4. Kelas 3B Ali         - 85 poin ➡️
5. Kelas 6B Khadijah    - 82 poin ⬆️
```

---

### 4. Siswa yang Perlu Perhatian

Daftar siswa yang butuh follow-up dari guru/admin.

| Kategori | Kriteria |
|----------|----------|
| **Tidak Input 3+ Hari** | Siswa yang tidak input ibadah lebih dari 3 hari |
| **Poin Rendah** | Siswa dengan poin di bawah rata-rata kelas |
| **Aktivitas Menurun** | Siswa yang aktivitasnya turun drastis |

**Manfaat:** Guru bisa segera menghubungi siswa yang membutuhkan bimbingan.

---

### 5. Grafik Aktivitas Mingguan

Chart visual untuk melihat tren aktivitas siswa.

| Jenis Grafik | Kegunaan |
|--------------|----------|
| **Line Chart** | Tren jumlah input per hari selama seminggu |
| **Bar Chart** | Perbandingan aktivitas per jenis ibadah |
| **Pie Chart** | Distribusi jenis ibadah yang paling sering dilakukan |

---

## Saran Fitur Monitoring Guru

### 1. Aktivitas Verifikasi Guru

Pantau kinerja guru dalam memverifikasi laporan siswa.

| Data | Keterangan |
|------|------------|
| **Total Verifikasi** | Jumlah laporan yang sudah diverifikasi |
| **Pending** | Laporan yang menunggu verifikasi |
| **Waktu Respon** | Rata-rata waktu untuk verifikasi |
| **Guru Teraktif** | Guru dengan verifikasi terbanyak |

**Contoh:**
```
✅ Status Verifikasi Hari Ini
━━━━━━━━━━━━━━━━━━━━━━━━
Terverifikasi : 245 laporan
Pending       : 12 laporan
Ditolak       : 3 laporan
```

---

### 2. Kehadiran Guru di Aplikasi

Lihat aktivitas login dan penggunaan aplikasi oleh guru.

| Data | Keterangan |
|------|------------|
| **Login Hari Ini** | Guru yang sudah login hari ini |
| **Belum Login** | Guru yang belum login |
| **Terakhir Aktif** | Waktu terakhir guru menggunakan aplikasi |
| **Frekuensi Akses** | Seberapa sering guru membuka aplikasi |

---

### 3. Kinerja Guru per Kelas

Evaluasi performa guru berdasarkan kelas yang diasuh.

| Metrik | Cara Hitung |
|--------|-------------|
| **Kepatuhan Kelas** | Persentase siswa yang rutin input di kelas tersebut |
| **Rata-rata Poin Kelas** | Total poin kelas / jumlah siswa |
| **Response Rate** | Seberapa cepat guru merespon laporan |

---

### 4. Daftar Guru & Status

Tampilkan semua guru dengan status real-time.

| Kolom | Keterangan |
|-------|------------|
| Nama Guru | Nama lengkap guru |
| Kelas Diampu | Kelas yang menjadi tanggung jawabnya |
| Status | Online / Offline / Away |
| Verifikasi Hari Ini | Jumlah laporan yang sudah diverifikasi |

---

## Saran Fitur Notifikasi & Alert

### 1. Alert Penting

Notifikasi yang perlu perhatian segera.

| Jenis Alert | Kapan Muncul |
|-------------|--------------|
| 🔴 **Urgent** | Ada siswa tidak input lebih dari 7 hari |
| 🟡 **Warning** | Verifikasi pending lebih dari 50 laporan |
| 🟢 **Info** | Pencapaian baru (kelas capai target, dll) |

---

### 2. Pengingat Otomatis

Sistem pengingat untuk admin.

| Pengingat | Waktu |
|-----------|-------|
| Cek laporan pending | Setiap pagi jam 08:00 |
| Review siswa tidak aktif | Setiap Senin |
| Rekap mingguan | Setiap Jumat sore |

---

## Saran Fitur Laporan & Rekap

### 1. Rekap Harian

Ringkasan aktivitas dalam satu hari.

| Data | Keterangan |
|------|------------|
| Total input hari ini | Jumlah semua aktivitas yang diinput |
| Aktivitas terpopuler | Ibadah yang paling banyak dilakukan |
| Kelas teraktif | Kelas dengan input terbanyak |
| Pencapaian | Siswa yang mencapai target harian |

---

### 2. Rekap Mingguan

Perbandingan dengan minggu sebelumnya.

| Data | Keterangan |
|------|------------|
| Perubahan poin | Naik/turun berapa persen |
| Trend kepatuhan | Grafik 7 hari terakhir |
| Top performer | Siswa dan kelas terbaik |
| Catatan penting | Hal yang perlu diperhatikan |

---

### 3. Rekap Bulanan

Laporan lengkap untuk evaluasi.

| Data | Keterangan |
|------|------------|
| Statistik lengkap | Semua metrik selama sebulan |
| Perbandingan | Dibanding bulan lalu |
| Achievement | Pencapaian-pencapaian penting |
| Rekomendasi | Saran untuk bulan depan |

---

## Saran Fitur Quick Actions Tambahan

### Tombol Aksi Cepat yang Disarankan

| Tombol | Fungsi |
|--------|--------|
| 📤 **Export Laporan** | Download rekap dalam format PDF/Excel |
| 📢 **Kirim Pengingat** | Kirim notifikasi ke siswa yang belum input |
| 📊 **Lihat Statistik** | Akses cepat ke halaman statistik lengkap |
| 🔔 **Atur Notifikasi** | Pengaturan alert dan reminder |
| 👥 **Lihat Tidak Aktif** | Daftar siswa yang tidak aktif |

---

## Prioritas Implementasi

### Prioritas Tinggi (Implementasi Pertama)
1. ✅ Ringkasan ibadah harian siswa
2. ✅ Statistik salat wajib
3. ✅ Siswa yang perlu perhatian
4. ✅ Aktivitas verifikasi guru

### Prioritas Sedang
5. Peringkat kelas (leaderboard)
6. Kehadiran guru di aplikasi
7. Alert dan notifikasi
8. Rekap harian

### Prioritas Rendah (Nice to Have)
9. Grafik aktivitas mingguan
10. Kinerja guru per kelas
11. Rekap mingguan & bulanan
12. Export laporan

---

## Contoh Layout Dashboard yang Disarankan

```
┌─────────────────────────────────────────────┐
│  🏠 Dashboard Admin                          │
│  Selamat datang, Ustadz Fulan!              │
├─────────────────────────────────────────────┤
│                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────┐│
│  │ Siswa   │ │ Guru    │ │ Kelas   │ │Verif││
│  │  450    │ │   24    │ │   12    │ │  5  ││
│  └─────────┘ └─────────┘ └─────────┘ └─────┘│
│                                              │
│  📊 Input Ibadah Hari Ini                   │
│  ────────────────────────────────────────── │
│  [████████████████░░░░] 380/450 (84%)       │
│                                              │
│  🕌 Status Salat Wajib                       │
│  ────────────────────────────────────────── │
│  Subuh ████████░░ 82%    Zuhur ██████░░ 65% │
│  Asar  ███░░░░░░░ 30%    (belum waktu)      │
│                                              │
│  ⚠️ Perlu Perhatian (5 siswa)               │
│  ────────────────────────────────────────── │
│  • Ahmad - Tidak input 5 hari               │
│  • Siti  - Poin di bawah rata-rata          │
│                                              │
│  🏆 Top 3 Kelas                              │
│  ────────────────────────────────────────── │
│  1. 6A Abu Bakar (95 poin)                  │
│  2. 5B Umar (92 poin)                       │
│  3. 4A Utsman (88 poin)                     │
│                                              │
│  📝 Aktivitas Terbaru                        │
│  ────────────────────────────────────────── │
│  • Ahmad - Salat Subuh (04:45)              │
│  • Siti  - Tilawah Quran (05:15)            │
│  • Umar  - Salat Dhuha (07:30)              │
│                                              │
└─────────────────────────────────────────────┘
```

---

## Ringkasan

Dengan menambahkan fitur-fitur di atas, Dashboard Admin akan menjadi:

1. **Informatif** - Admin bisa melihat kondisi terkini dengan cepat
2. **Actionable** - Ada data yang jelas untuk ditindaklanjuti
3. **Monitoring Real-time** - Pantau aktivitas siswa dan guru secara langsung
4. **Evaluatif** - Bisa mengevaluasi performa kelas dan guru

---

*Dokumen ini dibuat pada: Januari 2026*
