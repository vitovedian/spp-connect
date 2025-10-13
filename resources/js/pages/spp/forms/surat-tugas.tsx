import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, FilePlus2, Plus } from 'lucide-react';

const suratTugasRequests = [
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
    },
];

const progressStages = ['Draft', 'Pengajuan', 'Persetujuan', 'Selesai'];

const formatDate = (isoDate: string) => {
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(isoDate));
};

const formatTime = (isoDate: string) => {
    return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(isoDate));
};

const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) {
        return '-';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

const calculateTotalFee = (request: (typeof suratTugasRequests)[number]) => {
    const companion = request.companionFee ?? 0;
    const instructorsTotal = request.instructors.reduce((total, instructor) => total + instructor.fee, 0);

    return companion + instructorsTotal;
};

const statusVariantMap: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    Draft: 'outline',
    'Menunggu Persetujuan': 'secondary',
    Disetujui: 'default',
    Revisi: 'destructive',
    Ditolak: 'destructive',
};

const statusFilterMap: Record<Exclude<'semua' | 'menunggu' | 'disetujui' | 'revisi', 'semua'>, string> = {
    menunggu: 'Menunggu Persetujuan',
    disetujui: 'Disetujui',
    revisi: 'Revisi',
};

const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const formatLetterNumber = (request: (typeof suratTugasRequests)[number]) => {
    const [initial, year, sequence] = request.id.split('-');
    const monthRoman = romanMonths[new Date(request.submittedAt).getMonth()] ?? '-';

    return `${sequence}/${'SPP'}-${initial}/${monthRoman}/${year}`;
};

export default function SuratTugas() {
    const [isNomorSuratOpen, setNomorSuratOpen] = useState(false);
    const [isDetailOpen, setDetailOpen] = useState(false);
    const [detailRequest, setDetailRequest] = useState<(typeof suratTugasRequests)[number] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<'submittedAt' | 'activityName' | 'totalFee'>('submittedAt');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [statusFilter, setStatusFilter] = useState<'semua' | 'menunggu' | 'disetujui' | 'revisi'>('semua');

    const visibleRequests = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        const filtered = suratTugasRequests.filter((request) => {
            if (!term) {
                return (
                    statusFilter === 'semua' ||
                    request.status === statusFilterMap[statusFilter as keyof typeof statusFilterMap]
                );
            }

            const haystacks = [
                formatLetterNumber(request).toLowerCase(),
                request.activityName.toLowerCase(),
                request.status.toLowerCase(),
                request.pic.toLowerCase(),
            ];

            const matchesSearch = haystacks.some((value) => value.includes(term));
            const matchesStatus =
                statusFilter === 'semua' ||
                request.status === statusFilterMap[statusFilter as keyof typeof statusFilterMap];

            return matchesSearch && matchesStatus;
        });

        const sorted = [...filtered].sort((a, b) => {
            let result = 0;

            if (sortField === 'submittedAt') {
                result = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
            } else if (sortField === 'activityName') {
                result = a.activityName.localeCompare(b.activityName, 'id-ID', { sensitivity: 'base' });
            } else if (sortField === 'totalFee') {
                result = calculateTotalFee(a) - calculateTotalFee(b);
            }

            return sortDirection === 'asc' ? result : -result;
        });

        return sorted;
    }, [searchTerm, sortField, sortDirection, statusFilter]);

    return (
        <div className="min-h-screen bg-background pl-4 lg:pl-4">
            <Head title="Surat Tugas" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Surat Tugas</h1>
                            <p className="text-muted-foreground">
                                Pantau daftar permohonan surat tugas dan lacak status terbaru secara cepat.
                            </p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Surat Tugas
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Formulir Surat Tugas</DialogTitle>
                                    <DialogDescription>
                                        Form ini masih berupa placeholder. Data tidak akan disimpan.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end">
                                    <Dialog open={isNomorSuratOpen} onOpenChange={setNomorSuratOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="gap-2">
                                                <FilePlus2 className="h-4 w-4" /> Buat Nomor Surat
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Nomor Surat</DialogTitle>
                                                <DialogDescription>
                                                    Form ini hanya contoh untuk menerbitkan nomor surat secara manual.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="nomorSurat">Nomor Surat</Label>
                                                    <Input
                                                        id="nomorSurat"
                                                        placeholder="Contoh: 001/SPP-ST/I/2025"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="tanggalTerbit">Tanggal Terbit</Label>
                                                    <Input id="tanggalTerbit" type="date" disabled />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="catatanNomor">Catatan (Opsional)</Label>
                                                    <textarea
                                                        id="catatanNomor"
                                                        placeholder="Catat referensi atau kebutuhan khusus penerbitan."
                                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter className="sm:justify-between">
                                                <p className="text-xs text-muted-foreground">
                                                    Nomor surat belum dapat disimpan pada versi demo.
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Tutup</Button>
                                                    </DialogClose>
                                                    <Button disabled>Simpan</Button>
                                                </div>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="submittedAt">Tanggal Pengajuan</Label>
                                            <Input id="submittedAt" type="date" disabled />
                                        </div>
                                        <div className="grid gap-2">
                                        <Label htmlFor="eventStart">Tanggal Kegiatan Dimulai</Label>
                                        <Input id="eventStart" type="date" disabled />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="eventEnd">Tanggal Kegiatan Berakhir</Label>
                                        <Input id="eventEnd" type="date" disabled />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="activityName">Nama Kegiatan</Label>
                                        <Input
                                            id="activityName"
                                            placeholder="Contoh: Workshop Transformasi Digital"
                                            disabled
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="activityType">Jenis Kegiatan</Label>
                                        <Select disabled>
                                            <SelectTrigger id="activityType">
                                                <SelectValue placeholder="Pilih jenis kegiatan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="offline">Luring</SelectItem>
                                                <SelectItem value="online">Daring</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status Permohonan</Label>
                                        <Select disabled>
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Pilih status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="menunggu">Menunggu Persetujuan</SelectItem>
                                                <SelectItem value="disetujui">Disetujui</SelectItem>
                                                <SelectItem value="revisi">Revisi</SelectItem>
                                                <SelectItem value="ditolak">Ditolak</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="pic">PIC</Label>
                                        <Select disabled>
                                            <SelectTrigger id="pic">
                                                <SelectValue placeholder="Pilih unit PIC" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="transformasi">Unit Transformasi Digital</SelectItem>
                                                <SelectItem value="layanan">Bidang Layanan Publik</SelectItem>
                                                <SelectItem value="wilayah">Tim Koordinasi Wilayah</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="companion">Nama Pendamping (Opsional)</Label>
                                        <Input
                                            id="companion"
                                            placeholder="Nama pendamping jika diperlukan"
                                            disabled
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="fee">Fee Pendamping (Opsional)</Label>
                                        <Input
                                            id="fee"
                                            placeholder="Contoh: 750000"
                                            type="number"
                                            disabled
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Instruktor</Label>
                                        <div className="rounded-md border border-dashed border-muted-foreground/40 bg-muted/20 p-3 text-sm">
                                            <p className="text-xs text-muted-foreground">
                                                Daftar instruktur akan muncul di sini setelah ditambahkan.
                                            </p>
                                            <div className="mt-2 space-y-2">
                                                <div className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-xs text-muted-foreground">
                                                    <span>Nama Instruktor</span>
                                                    <span>Fee (Rp)</span>
                                                </div>
                                                <div className="rounded-md bg-background px-3 py-6 text-center text-xs text-muted-foreground">
                                                    Placeholder daftar instruktur (mode demo)
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="justify-start gap-2" disabled>
                                            <Plus className="h-4 w-4" /> Tambah Instruktor
                                        </Button>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="totalFee">Total Biaya (Otomatis)</Label>
                                        <Input
                                            id="totalFee"
                                            placeholder="Akan menghitung seluruh fee"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <DialogFooter className="sm:justify-between">
                                    <p className="text-xs text-muted-foreground">
                                        Mode demo: pengajuan belum aktif.
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <DialogClose asChild>
                                            <Button variant="outline">Tutup</Button>
                                        </DialogClose>
                                        <Button disabled>Kirim</Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-1">
                        <CardTitle>Daftar Permohonan</CardTitle>
                        <CardDescription>
                            Data masih bersifat statis sebagai contoh tampilan daftar pengajuan surat tugas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <Input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Cari berdasarkan nomor surat, kegiatan, atau status"
                                className="md:w-72"
                            />

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                <Select
                                    value={statusFilter}
                                    onValueChange={(value) =>
                                        setStatusFilter(value as typeof statusFilter)
                                    }
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Filter status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">Semua Status</SelectItem>
                                        <SelectItem value="menunggu">Menunggu Persetujuan</SelectItem>
                                        <SelectItem value="disetujui">Disetujui</SelectItem>
                                        <SelectItem value="revisi">Revisi</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={sortField}
                                    onValueChange={(value) =>
                                        setSortField(value as 'submittedAt' | 'activityName' | 'totalFee')
                                    }
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Urutkan berdasarkan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="submittedAt">Tanggal Pengajuan</SelectItem>
                                        <SelectItem value="activityName">Nama Kegiatan</SelectItem>
                                        <SelectItem value="totalFee">Total Fee</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                    onClick={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
                                >
                                    <ArrowUpDown className="h-4 w-4" />
                                    {sortDirection === 'asc' ? 'Urut Naik' : 'Urut Turun'}
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-separate border-spacing-y-3 text-left">
                                <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-2">Nomor Surat</th>
                                        <th className="px-4 py-2">Tanggal Pengajuan</th>
                                        <th className="px-4 py-2">Periode Kegiatan</th>
                                        <th className="px-4 py-2">Nama Kegiatan</th>
                                        <th className="px-4 py-2">Status Permohonan</th>
                                        <th className="px-4 py-2">Total Fee</th>
                                        <th className="px-4 py-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {visibleRequests.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-6 text-center text-sm text-muted-foreground">
                                                Tidak ada permohonan yang cocok dengan pencarian Anda.
                                            </td>
                                        </tr>
                                    ) : (
                                        visibleRequests.map((request) => (
                                            <tr
                                                key={request.id}
                                                className="rounded-lg bg-muted/30 text-foreground shadow-sm transition hover:bg-muted/50"
                                            >
                                            <td className="px-4 py-3 font-medium">{formatLetterNumber(request)}</td>
                                            <td className="px-4 py-3" title={formatTime(request.submittedAt)}>
                                                <div className="flex flex-col">
                                                    <span>{formatDate(request.submittedAt)}</span>
                                                    <span className="text-xs text-muted-foreground">{formatTime(request.submittedAt)}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span>{formatDate(request.eventStart)}</span>
                                                    <span className="text-xs text-muted-foreground">sampai {formatDate(request.eventEnd)}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium">{request.activityName}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col gap-1">
                                                    <Badge variant={statusVariantMap[request.status] ?? 'outline'}>
                                                        {request.status}
                                                    </Badge>
                                                    {request.statusNote && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {request.statusNote}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold">
                                                {formatCurrency(calculateTotalFee(request))}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setDetailRequest(request);
                                                        setDetailOpen(true);
                                                    }}
                                                >
                                                    Lihat Detail
                                                </Button>
                                            </td>
                                        </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Panduan Alur Persetujuan</CardTitle>
                        <CardDescription>
                            Setiap permohonan mengikuti tahapan standar berikut sebelum surat tugas diterbitkan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ol className="flex flex-col gap-4 md:flex-row md:items-start">
                            {progressStages.map((stage, index) => (
                                <li key={stage} className="flex flex-1 items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-primary/40 text-sm font-semibold text-primary">
                                        {index + 1}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold">{stage}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {index === 0 && 'Tim menyiapkan draft dan kebutuhan perjalanan dinas.'}
                                            {index === 1 && 'Draft diajukan ke pimpinan beserta lampiran pendukung.'}
                                            {index === 2 && 'Pimpinan melakukan verifikasi dan memberi persetujuan atau revisi.'}
                                            {index === 3 && 'Surat tugas diterbitkan dan dibagikan kepada tim terkait.'}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </CardContent>
                </Card>

                <Dialog
                    open={isDetailOpen}
                    onOpenChange={(open) => {
                        setDetailOpen(open);
                        if (!open) {
                            setDetailRequest(null);
                        }
                    }}
                >
                    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden p-6 flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Detail Surat Tugas</DialogTitle>
                            <DialogDescription>
                                Informasi lengkap mengenai permohonan surat tugas yang dipilih.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto pr-1">
                            {detailRequest ? (
                                <div className="space-y-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Nomor Surat</p>
                                        <p className="font-semibold">{formatLetterNumber(detailRequest)}</p>
                                        </div>
                                        <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">ID Permohonan</p>
                                        <p className="font-semibold">{detailRequest.id}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Tanggal Pengajuan</p>
                                        <p className="font-semibold">
                                            {formatDate(detailRequest.submittedAt)}
                                            <span className="ml-2 text-sm text-muted-foreground">
                                                {formatTime(detailRequest.submittedAt)}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Periode Kegiatan</p>
                                        <p className="font-semibold">
                                            {formatDate(detailRequest.eventStart)}
                                            <span className="mx-1">-</span>
                                            {formatDate(detailRequest.eventEnd)}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Nama Kegiatan</p>
                                        <p className="font-semibold">{detailRequest.activityName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Jenis Kegiatan</p>
                                        <Badge variant={detailRequest.activityType === 'online' ? 'secondary' : 'default'}>
                                            {detailRequest.activityType === 'online' ? 'Daring' : 'Luring'}
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">PIC</p>
                                        <p className="font-semibold">{detailRequest.pic}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Pendamping</p>
                                        <p className="font-semibold">
                                            {detailRequest.companionName ?? 'Belum ditentukan'}
                                        </p>
                                        {typeof detailRequest.companionFee === 'number' && (
                                            <p className="text-xs text-muted-foreground">
                                                Fee Pendamping: {formatCurrency(detailRequest.companionFee)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Status Permohonan</p>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge variant={statusVariantMap[detailRequest.status] ?? 'outline'}>
                                                {detailRequest.status}
                                            </Badge>
                                            <Badge variant={detailRequest.activityType === 'online' ? 'secondary' : 'default'}>
                                                {detailRequest.activityType === 'online' ? 'Daring' : 'Luring'}
                                            </Badge>
                                        </div>
                                        {detailRequest.statusNote && (
                                            <p className="text-xs text-muted-foreground">
                                                Catatan: {detailRequest.statusNote}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground mb-2">Instruktor</p>
                                        <div className="rounded-md border border-muted bg-muted/30">
                                            <table className="min-w-full text-sm">
                                                <thead className="text-xs uppercase text-muted-foreground">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left">Nama</th>
                                                        <th className="px-3 py-2 text-right">Fee</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {detailRequest.instructors.map((instructor) => (
                                                        <tr key={`${detailRequest.id}-${instructor.name}`} className="border-t border-muted">
                                                            <td className="px-3 py-2 font-medium">{instructor.name}</td>
                                                            <td className="px-3 py-2 text-right text-muted-foreground">
                                                                {formatCurrency(instructor.fee)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs text-muted-foreground">Total Biaya</p>
                                        <p className="text-lg font-semibold">
                                            {formatCurrency(calculateTotalFee(detailRequest))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                Tidak ada data untuk ditampilkan.
                            </div>
                        )}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Tutup</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
