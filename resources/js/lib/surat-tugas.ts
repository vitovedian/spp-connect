export const suratTugasRequests = [
    {
        id: 'ST-2025-001',
        submittedAt: '2025-01-12T08:30:00+07:00',
        eventStart: '2025-01-18',
        eventEnd: '2025-01-20',
        activityName: 'Pendampingan Transparansi Data Pemerintah Kota',
        activityType: 'offline',
        pic: 'Unit Transformasi Digital',
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
        eventStart: '2025-01-22',
        eventEnd: '2025-01-22',
        activityName: 'Sosialisasi Layanan SPP Online',
        activityType: 'online',
        pic: 'Bidang Layanan Publik',
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
        eventStart: '2025-01-25',
        eventEnd: '2025-01-27',
        activityName: 'Workshop Transformasi Digital Regional',
        activityType: 'offline',
        pic: 'Tim Koordinasi Wilayah',
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

export const calculateTotalFee = (request: (typeof suratTugasRequests)[number]) => {
    const companion = request.companionFee ?? 0;
    const instructorsTotal = request.instructors.reduce((total, instructor) => total + instructor.fee, 0);

    return companion + instructorsTotal;
};

export const formatLetterNumber = (request: (typeof suratTugasRequests)[number]) => {
    const [initial, year, sequence] = request.id.split('-');
    const monthRoman = romanMonths[new Date(request.submittedAt).getMonth()] ?? '-';

    return `${sequence}/${'SPP'}-${initial}/${monthRoman}/${year}`;
};
