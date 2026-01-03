# Saran Penambahan Data Kelas

Dokumen ini berisi rekomendasi data yang bisa ditambahkan pada halaman **Manajemen Kelas** untuk membuat aplikasi lebih lengkap dan informatif.

---

## Data yang Sudah Ada Saat Ini

| No | Nama Field | Keterangan |
|----|------------|------------|
| 1 | `name` | Nama kelas (contoh: Abu Bakar, Umar, dll) |
| 2 | `level` | Tingkatan kelas (Kelas 1 sampai Kelas 6) |
| 3 | `students` | Jumlah siswa di kelas tersebut |
| 4 | `teacher` | Nama wali kelas |
| 5 | `guruKelas` | Nama guru kelas |

---

## Saran Data yang Perlu Ditambahkan

### 1. Informasi Akademik

Data ini berguna untuk mengatur administrasi kelas dengan lebih baik.

| Field | Keterangan | Contoh |
|-------|------------|--------|
| `tahunAjaran` | Tahun ajaran yang sedang berjalan | "2025/2026" |
| `semester` | Semester saat ini | "Ganjil" atau "Genap" |
| `ruangan` | Lokasi atau nomor ruang kelas | "Ruang 101" |
| `kapasitas` | Jumlah maksimal siswa yang bisa ditampung | 30 siswa |

**Manfaat:** Admin bisa mengetahui apakah kelas sudah penuh atau masih bisa menerima siswa baru.

---

### 2. Jadwal Kelas

Data ini membantu mengatur waktu belajar mengajar.

| Field | Keterangan | Contoh |
|-------|------------|--------|
| `waktuMulai` | Jam masuk kelas | "07:00" |
| `waktuSelesai` | Jam pulang kelas | "12:00" |
| `hariAktif` | Hari-hari sekolah | ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"] |

**Manfaat:** Memudahkan koordinasi jadwal antar kelas.

---

### 3. Status Kelas

Data ini untuk menandai kondisi kelas saat ini.

| Field | Keterangan | Contoh |
|-------|------------|--------|
| `status` | Kondisi kelas saat ini | "Aktif", "Non-aktif", atau "Libur" |
| `isActive` | Apakah kelas masih aktif | true / false |
| `createdAt` | Tanggal kelas dibuat | "2025-01-01" |
| `updatedAt` | Tanggal terakhir data diubah | "2025-06-15" |

**Manfaat:** Admin bisa melihat kelas mana yang aktif dan mana yang sudah tidak aktif.

---

### 4. Statistik Ibadah Kelas

Data ini untuk memantau capaian ibadah seluruh kelas (sesuai tujuan aplikasi).

| Field | Keterangan | Contoh |
|-------|------------|--------|
| `rataRataPoin` | Rata-rata poin ibadah semua siswa di kelas | 85.5 |
| `persentaseKepatuhan` | Persentase siswa yang rutin input ibadah | "78%" |
| `peringkat` | Peringkat kelas dibanding kelas lain | 3 (dari 10 kelas) |
| `totalPoin` | Total poin ibadah seluruh siswa | 2500 |

**Manfaat:** Guru dan admin bisa melihat kelas mana yang paling rajin beribadah.

---

### 5. Kontak dan Komunikasi

Data ini untuk memudahkan komunikasi dengan wali murid.

| Field | Keterangan | Contoh |
|-------|------------|--------|
| `linkGrupWA` | Link grup WhatsApp kelas | "https://chat.whatsapp.com/xxx" |
| `catatan` | Catatan khusus tentang kelas | "Kelas unggulan tahfidz" |
| `deskripsi` | Deskripsi singkat kelas | "Kelas dengan fokus hafalan Al-Quran" |

**Manfaat:** Memudahkan akses komunikasi dan informasi tambahan tentang kelas.

---

### 6. Data Tambahan (Opsional)

Data tambahan yang mungkin berguna di masa depan.

| Field | Keterangan | Contoh |
|-------|------------|--------|
| `foto` | Foto kelas atau logo | URL gambar |
| `warna` | Warna tema kelas untuk tampilan | "#4F46E5" (indigo) |
| `moto` | Moto atau slogan kelas | "Rajin Ibadah, Rajin Belajar" |
| `targetBulanan` | Target poin ibadah per bulan | 100 poin |

---

## Prioritas Implementasi

Berikut urutan prioritas yang disarankan untuk ditambahkan:

### Prioritas Tinggi (Penting)
1. `tahunAjaran` - Wajib untuk administrasi
2. `status` - Untuk menandai kelas aktif/tidak
3. `rataRataPoin` - Sesuai tujuan utama aplikasi
4. `kapasitas` - Untuk manajemen jumlah siswa

### Prioritas Sedang
5. `semester` - Pelengkap tahun ajaran
6. `ruangan` - Informasi lokasi
7. `peringkat` - Motivasi antar kelas
8. `linkGrupWA` - Kemudahan komunikasi

### Prioritas Rendah (Nice to Have)
9. `waktuMulai` & `waktuSelesai` - Jadwal
10. `catatan` & `deskripsi` - Informasi tambahan
11. `foto` & `warna` - Tampilan visual

---

## Contoh Struktur Data Lengkap

```javascript
const kelasContoh = {
  // Data yang sudah ada
  id: 1,
  name: "Abu Bakar",
  level: "1",
  students: 25,
  teacher: "Ustadz Ahmad",
  teacherId: 101,
  guruKelas: "Ustadzah Fatimah",
  guruKelasId: 102,
  
  // Data baru yang disarankan
  tahunAjaran: "2025/2026",
  semester: "Ganjil",
  ruangan: "Ruang 101",
  kapasitas: 30,
  status: "Aktif",
  isActive: true,
  
  // Statistik ibadah
  rataRataPoin: 85.5,
  persentaseKepatuhan: 78,
  peringkat: 3,
  totalPoin: 2500,
  
  // Komunikasi
  linkGrupWA: "https://chat.whatsapp.com/xxx",
  catatan: "Kelas unggulan tahfidz",
  
  // Timestamp
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-06-15T10:30:00Z"
};
```

---

*Dokumen ini dibuat pada: Januari 2026*
