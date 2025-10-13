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
import { Plus } from 'lucide-react';

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

export default function SuratTugas() {
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
                            <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Formulir Surat Tugas</DialogTitle>
                                    <DialogDescription>
                                        Form ini masih berupa placeholder. Data tidak akan disimpan.
                                    </DialogDescription>
                                </DialogHeader>
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
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-separate border-spacing-y-3 text-left">
                                <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-2">Nomor</th>
                                        <th className="px-4 py-2">Tanggal Pengajuan</th>
                                        <th className="px-4 py-2">Tanggal Mulai</th>
                                        <th className="px-4 py-2">Tanggal Selesai</th>
                                        <th className="px-4 py-2">Nama Kegiatan</th>
                                        <th className="px-4 py-2">Jenis Kegiatan</th>
                                        <th className="px-4 py-2">PIC</th>
                                        <th className="px-4 py-2">Pendamping</th>
                                        <th className="px-4 py-2">Fee Pendamping</th>
                                        <th className="px-4 py-2">Instruktor</th>
                                        <th className="px-4 py-2">Total Fee</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {suratTugasRequests.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="rounded-lg bg-muted/30 text-foreground shadow-sm transition hover:bg-muted/50"
                                        >
                                            <td className="px-4 py-3 font-medium">{request.id}</td>
                                            <td className="px-4 py-3" title={formatTime(request.submittedAt)}>
                                                <div className="flex flex-col">
                                                    <span>{formatDate(request.submittedAt)}</span>
                                                    <span className="text-xs text-muted-foreground">{formatTime(request.submittedAt)}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{formatDate(request.eventStart)}</td>
                                            <td className="px-4 py-3">{formatDate(request.eventEnd)}</td>
                                            <td className="px-4 py-3 font-medium">{request.activityName}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant={request.activityType === 'online' ? 'secondary' : 'default'}>
                                                    {request.activityType === 'online' ? 'Daring' : 'Luring'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">{request.pic}</td>
                                            <td className="px-4 py-3">{request.companionName ?? '-'}</td>
                                            <td className="px-4 py-3">{formatCurrency(request.companionFee)}</td>
                                            <td className="px-4 py-3">
                                                <ul className="space-y-1 text-xs">
                                                    {request.instructors.map((instructor) => (
                                                        <li
                                                            key={`${request.id}-${instructor.name}`}
                                                            className="flex items-center justify-between gap-3 rounded-md bg-background px-3 py-2 text-foreground"
                                                        >
                                                            <span className="font-medium">{instructor.name}</span>
                                                            <span className="text-muted-foreground">
                                                                {formatCurrency(instructor.fee)}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-4 py-3 font-semibold">
                                                {formatCurrency(calculateTotalFee(request))}
                                            </td>
                                        </tr>
                                    ))}
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
            </div>
        </div>
    );
}
