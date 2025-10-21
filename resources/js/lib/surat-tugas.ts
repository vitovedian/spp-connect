export const suratTugasRequests = [
    {
        id: 'ST-2025-001',
        submittedAt: '2025-01-12T08:30:00+07:00',
        letterNumber: '001/SPP-ST/I/2025',
        eventStart: '2025-01-18',
        eventEnd: '2025-01-20',
        activityName: 'Pendampingan Transparansi Data Pemerintah Kota',
        activityType: 'offline',
        clientName: 'Bank Mandiri',
        pics: [
            { id: 'rahmat-hidayat', name: 'Rahmat Hidayat', role: 'Lead PIC' },
            { id: 'mira-puspita', name: 'Mira Puspita', role: 'Koordinator Lapangan' },
        ],
        companionName: 'Dewi Lestari',
        companionFee: 1250000,
        instructors: [
            { name: 'Agus Wibowo', fee: 1500000 },
            { name: 'Siti Ramadhani', fee: 1350000 },
        ],
        status: 'Menunggu Persetujuan',
        statusNote: 'Menunggu tanda tangan Kepala Bagian.',
        createdBy: 'Rahmat Hidayat',
        statusUpdatedBy: 'Putri Saraswati',
        statusUpdatedAt: '2025-01-13T10:05:00+07:00',
    },
    {
        id: 'ST-2025-002',
        submittedAt: '2025-01-09T14:15:00+07:00',
        letterNumber: '002/SPP-ST/I/2025',
        eventStart: '2025-01-22',
        eventEnd: '2025-01-22',
        activityName: 'Sosialisasi Layanan SPP Online',
        activityType: 'online',
        clientName: 'Bank Syariah Indonesia',
        pics: [
            { id: 'sari-wulandari', name: 'Sari Wulandari', role: 'PIC Utama' },
            { id: 'ario-nugroho', name: 'Ario Nugroho', role: 'Moderator Webinar' },
        ],
        companionName: 'Ridwan Pratama',
        companionFee: 0,
        instructors: [
            { name: 'Mikael Santoso', fee: 900000 },
        ],
        status: 'Disetujui',
        statusNote: 'Surat telah disahkan oleh pimpinan.',
        createdBy: 'Sari Wulandari',
        statusUpdatedBy: 'Budi Hartono',
        statusUpdatedAt: '2025-01-10T09:20:00+07:00',
    },
    {
        id: 'ST-2025-003',
        submittedAt: '2025-01-05T09:45:00+07:00',
        letterNumber: '003/SPP-ST/I/2025',
        eventStart: '2025-01-25',
        eventEnd: '2025-01-27',
        activityName: 'Workshop Transformasi Digital Regional',
        activityType: 'offline',
        clientName: 'Bank Negara Indonesia',
        pics: [{ id: 'rangga-saputra', name: 'Rangga Saputra', role: null }],
        companionName: null,
        companionFee: null,
        instructors: [
            { name: 'Nurul Hidayah', fee: 1250000 },
            { name: 'Bima Prakoso', fee: 1250000 },
            { name: 'Yuni Astuti', fee: 1100000 },
        ],
        status: 'Revisi',
        statusNote: 'Lengkapi daftar peserta dan agenda final.',
        createdBy: 'Rangga Saputra',
        statusUpdatedBy: 'Nur Aisyah',
        statusUpdatedAt: '2025-01-08T16:40:00+07:00',
    },
] as const;

export const statusVariantMap: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    Draft: 'outline',
    'Menunggu Persetujuan': 'secondary',
    Disetujui: 'default',
    Revisi: 'destructive',
    Ditolak: 'destructive',
};

const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'] as const;

export const formatDate = (isoDate: string) => {
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(isoDate));
};

export const formatTime = (isoDate: string) => {
    return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(isoDate));
};

export const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) {
        return '-';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

type FeeSource = {
    companionFee?: number | null;
    companion_fee?: number | null;
    instructors?: Array<{ fee?: number | null }> | null;
};

export const calculateTotalFee = (request: FeeSource) => {
    const companion =
        typeof request.companionFee === 'number'
            ? request.companionFee
            : typeof request.companion_fee === 'number'
              ? request.companion_fee
              : 0;

    const instructors = request.instructors ?? [];
    const instructorsTotal = instructors.reduce((total, instructor) => {
        const fee = typeof instructor.fee === 'number' ? instructor.fee : 0;
        return total + fee;
    }, 0);

    return companion + instructorsTotal;
};

type LetterNumberLike = {
    id: string | number;
    submitted_at?: string;
    submittedAt?: string;
    letter_number?: string | null;
    letterNumber?: string | null;
};

export const formatLetterNumber = (request: LetterNumberLike) => {
    const existingLetterNumber = request.letter_number ?? request.letterNumber;
    if (existingLetterNumber) {
        return existingLetterNumber;
    }

    const idParts = String(request.id ?? '').split('-');
    if (idParts.length < 3) {
        return String(request.id ?? '–');
    }

    const [initial, year, sequence] = idParts;
    const submitted = request.submitted_at ?? request.submittedAt;
    const monthRoman =
        submitted ? romanMonths[new Date(submitted).getMonth()] ?? '-' : '-';

    return `${sequence}/${'SPP'}-${initial}/${monthRoman}/${year}`;
};
