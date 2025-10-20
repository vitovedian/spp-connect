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
import { ArrowUpDown, FilePlus2, Plus, Trash2 } from 'lucide-react';
import {
    calculateTotalFee,
    formatCurrency,
    formatDate,
    formatLetterNumber,
    formatTime,
    statusVariantMap,
    suratTugasRequests,
} from '@/lib/surat-tugas';

const progressStages = ['Draft', 'Pengajuan', 'Persetujuan', 'Selesai'];

const statusFilterMap: Record<Exclude<'semua' | 'menunggu' | 'disetujui' | 'revisi', 'semua'>, string> = {
    menunggu: 'Menunggu Persetujuan',
    disetujui: 'Disetujui',
    revisi: 'Revisi',
};

interface InstrukturItem {
    id: string;
    name: string;
    fee: string;
}

const createBlankInstruktur = (): InstrukturItem => ({
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    name: '',
    fee: '',
});

export default function SuratTugas() {
    const [isNomorSuratOpen, setNomorSuratOpen] = useState(false);
    const [isDetailOpen, setDetailOpen] = useState(false);
    const [detailRequest, setDetailRequest] = useState<(typeof suratTugasRequests)[number] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<'submittedAt' | 'activityName' | 'totalFee'>('submittedAt');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [statusFilter, setStatusFilter] = useState<'semua' | 'menunggu' | 'disetujui' | 'revisi'>('semua');

    // State for nomor surat form
    const [nomorSuratData, setNomorSuratData] = useState({
        tanggalPengajuan: '',
        pilihanBendera: '',
        tujuanSurat: '',
        namaKlien: '',
        catatan: ''
    });

    // State for surat tugas form
    const [suratTugasData, setSuratTugasData] = useState({
        submittedAt: '',
        eventStart: '',
        eventEnd: '',
        activityName: '',
        activityType: '',
        status: '',
        pic: '',
        companion: '',
        fee: '',
    });

    // State for instruktur list
    const [instrukturList, setInstrukturList] = useState<InstrukturItem[]>([createBlankInstruktur()]);

    const benderaOptions = ['SPP', 'MBS', 'EPU', 'KIM', 'PrimaOne'];

    const handleNomorSuratChange = (field: keyof typeof nomorSuratData, value: string) => {
        setNomorSuratData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSuratTugasChange = (field: keyof typeof suratTugasData, value: string) => {
        setSuratTugasData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleInstrukturChange = (
        index: number,
        field: keyof InstrukturItem,
        value: string,
    ) => {
        setInstrukturList((previous) =>
            previous.map((instruktur, instrukturIndex) =>
                instrukturIndex === index
                    ? {
                          ...instruktur,
                          [field]: value,
                      }
                    : instruktur,
            ),
        );
    };

    const handleAddInstruktur = () => {
        setInstrukturList((previous) => [...previous, createBlankInstruktur()]);
    };

    const handleRemoveInstruktur = (id: string) => {
        setInstrukturList((previous) => (previous.length === 1 ? previous : previous.filter((instruktur) => instruktur.id !== id)));
    };

    const instrukturTotal = useMemo(() => {
        return instrukturList.reduce((total, instruktur) => {
            const fee = Number(instruktur.fee) || 0;
            return total + fee;
        }, 0);
    }, [instrukturList]);

    const handleNomorSuratSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Nomor Surat form submitted:', nomorSuratData);
        alert('Nomor Surat form submitted successfully! (This is a demo)');
        // Reset form after submission
        setNomorSuratData({
            tanggalPengajuan: '',
            pilihanBendera: '',
            tujuanSurat: '',
            namaKlien: '',
            catatan: ''
        });
        // Close dialog
        setNomorSuratOpen(false);
    };

    const handleSuratTugasSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Surat Tugas form submitted:', suratTugasData, instrukturList);
        alert('Surat Tugas form submitted successfully! (This is a demo)');
        // Reset form after submission
        setSuratTugasData({
            submittedAt: '',
            eventStart: '',
            eventEnd: '',
            activityName: '',
            activityType: '',
            status: '',
            pic: '',
            companion: '',
            fee: ''
        });
        setInstrukturList([createBlankInstruktur()]);
    };

    const visibleRequests = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        const filtered = suratTugasRequests.filter((request) => {
            const matchesStatus =
                statusFilter === 'semua' ||
                request.status === statusFilterMap[statusFilter as keyof typeof statusFilterMap];

            if (!matchesStatus) {
                return false;
            }

            if (!term) {
                return true;
            }

            const haystacks = [
                (request.letterNumber ?? formatLetterNumber(request)).toLowerCase(),
                request.activityName.toLowerCase(),
                request.status.toLowerCase(),
                request.createdBy.toLowerCase(),
                request.pics
                    .map((pic) => [pic.name, pic.role].filter(Boolean).join(' ').toLowerCase())
                    .join(' '),
            ];

            return haystacks.some((value) => value.includes(term));
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
                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
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
                                            <form onSubmit={handleNomorSuratSubmit}>
                                                <div className="space-y-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="tanggalPengajuan">
                                                            Tanggal Pengajuan <span className="text-destructive">*</span>
                                                        </Label>
                                                        <Input 
                                                            id="tanggalPengajuan" 
                                                            type="date" 
                                                            value={nomorSuratData.tanggalPengajuan}
                                                            onChange={(e) => handleNomorSuratChange('tanggalPengajuan', e.target.value)}
                                                            required 
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="pilihanBendera">
                                                            Pilihan Bendera <span className="text-destructive">*</span>
                                                        </Label>
                                                        <Select 
                                                            value={nomorSuratData.pilihanBendera} 
                                                            onValueChange={(value) => handleNomorSuratChange('pilihanBendera', value)}
                                                        >
                                                            <SelectTrigger id="pilihanBendera">
                                                                <SelectValue placeholder="Pilih bendera" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {benderaOptions.map((bendera) => (
                                                                    <SelectItem key={bendera} value={bendera}>
                                                                        {bendera}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="tujuanSurat">
                                                            Tujuan Surat <span className="text-destructive">*</span>
                                                        </Label>
                                                        <Input
                                                            id="tujuanSurat"
                                                            placeholder="Contoh: Workshop Transformasi Digital"
                                                            value={nomorSuratData.tujuanSurat}
                                                            onChange={(e) => handleNomorSuratChange('tujuanSurat', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="namaKlien">
                                                            Nama Klien <span className="text-destructive">*</span>
                                                        </Label>
                                                        <Input
                                                            id="namaKlien"
                                                            placeholder="Contoh: PT ABC Indonesia"
                                                            value={nomorSuratData.namaKlien}
                                                            onChange={(e) => handleNomorSuratChange('namaKlien', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="catatan">Catatan</Label>
                                                        <textarea
                                                            id="catatan"
                                                            value={nomorSuratData.catatan}
                                                            onChange={(e) => handleNomorSuratChange('catatan', e.target.value)}
                                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                            placeholder="Catatan tambahan tentang surat ini..."
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter className="sm:justify-between">
                                                    <p className="text-xs text-muted-foreground mt-4">
                                                        Nomor surat belum dapat disimpan pada versi demo.
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-4">
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Tutup</Button>
                                                        </DialogClose>
                                                        <Button type="submit">Simpan</Button>
                                                    </div>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <form onSubmit={handleSuratTugasSubmit}>
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="submittedAt">Tanggal Pengajuan</Label>
                                            <Input 
                                                id="submittedAt" 
                                                type="date" 
                                                value={suratTugasData.submittedAt}
                                                onChange={(e) => handleSuratTugasChange('submittedAt', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                        <Label htmlFor="eventStart">Tanggal Kegiatan Dimulai</Label>
                                        <Input 
                                            id="eventStart" 
                                            type="date" 
                                            value={suratTugasData.eventStart}
                                            onChange={(e) => handleSuratTugasChange('eventStart', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="eventEnd">Tanggal Kegiatan Berakhir</Label>
                                        <Input 
                                            id="eventEnd" 
                                            type="date" 
                                            value={suratTugasData.eventEnd}
                                            onChange={(e) => handleSuratTugasChange('eventEnd', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="activityName">Nama Kegiatan</Label>
                                        <Input
                                            id="activityName"
                                            placeholder="Contoh: Workshop Transformasi Digital"
                                            value={suratTugasData.activityName}
                                            onChange={(e) => handleSuratTugasChange('activityName', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="activityType">Jenis Kegiatan</Label>
                                        <Select 
                                            value={suratTugasData.activityType} 
                                            onValueChange={(value) => handleSuratTugasChange('activityType', value)}
                                        >
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
                                        <Select 
                                            value={suratTugasData.status} 
                                            onValueChange={(value) => handleSuratTugasChange('status', value)}
                                        >
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
                                        <Select 
                                            value={suratTugasData.pic} 
                                            onValueChange={(value) => handleSuratTugasChange('pic', value)}
                                        >
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
                                            value={suratTugasData.companion}
                                            onChange={(e) => handleSuratTugasChange('companion', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="fee">Fee Pendamping (Opsional)</Label>
                                        <Input
                                            id="fee"
                                            placeholder="Contoh: 750000"
                                            type="number"
                                            value={suratTugasData.fee}
                                            onChange={(e) => handleSuratTugasChange('fee', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Instruktor</Label>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium">Daftar Instruktur</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Tambahkan instruktur yang terlibat dalam kegiatan ini.
                                                    </p>
                                                </div>
                                                <Button type="button" variant="outline" size="sm" className="gap-2" onClick={handleAddInstruktur}>
                                                    <Plus className="h-4 w-4" /> Tambah Instruktur
                                                </Button>
                                            </div>
                                            {instrukturList.map((instruktur, index) => (
                                                <div
                                                    key={instruktur.id}
                                                    className="rounded-md border border-dashed border-muted-foreground/40 bg-muted/20 p-4"
                                                >
                                                    <div className="grid gap-3 sm:grid-cols-[1.6fr_0.6fr_auto] sm:items-end">
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`instruktur-name-${instruktur.id}`}>Nama Instruktur</Label>
                                                            <Input
                                                                id={`instruktur-name-${instruktur.id}`}
                                                                value={instruktur.name}
                                                                onChange={(event) =>
                                                                    handleInstrukturChange(index, 'name', event.target.value)
                                                                }
                                                                placeholder="Contoh: Agus Wibowo"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`instruktur-fee-${instruktur.id}`}>Fee (Rp)</Label>
                                                            <Input
                                                                id={`instruktur-fee-${instruktur.id}`}
                                                                type="number"
                                                                min={0}
                                                                value={instruktur.fee}
                                                                onChange={(event) =>
                                                                    handleInstrukturChange(index, 'fee', event.target.value)
                                                                }
                                                                placeholder="Contoh: 1500000"
                                                            />
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-muted-foreground hover:text-destructive"
                                                                onClick={() => handleRemoveInstruktur(instruktur.id)}
                                                                disabled={instrukturList.length === 1}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-xs text-muted-foreground">
                                                        Fee Instruktur: <span className="font-medium text-foreground">{formatCurrency(Number(instruktur.fee) || 0)}</span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="totalFee">Total Biaya (Otomatis)</Label>
                                        <Input
                                            id="totalFee"
                                            value={formatCurrency(instrukturTotal)}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <DialogFooter className="sm:justify-between">
                                    <p className="text-xs text-muted-foreground mt-4">
                                        Mode demo: pengajuan belum aktif.
                                    </p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <DialogClose asChild>
                                            <Button variant="outline" type="button">Tutup</Button>
                                        </DialogClose>
                                        <Button type="submit">Kirim</Button>
                                    </div>
                                </DialogFooter>
                            </form>
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
                                        <th className="px-4 py-2">PIC</th>
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
                                            <td className="px-4 py-3 font-medium">{request.letterNumber ?? formatLetterNumber(request)}</td>
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
                                            <td className="px-4 py-3 text-sm">
                                                <div className="space-y-1">
                                            {request.pics.map((pic) => (
                                                <div key={`${request.id}-${pic.id}`} className="space-y-1 border-b border-border/40 pb-2 last:border-b-0 last:pb-0">
                                                    <span className="font-medium text-foreground">{pic.name}</span>
                                                    <p className="text-xs text-muted-foreground">
                                                        {pic.role ?? 'Peran belum diisi'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
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
                    <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-hidden p-6 flex flex-col">
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
                                        <p className="text-xs text-muted-foreground">Dibuat Oleh</p>
                                        <p className="font-semibold">{detailRequest.createdBy}</p>
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
                                    {detailRequest.clientName ? (
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Klien</p>
                                            <p className="font-semibold">{detailRequest.clientName}</p>
                                        </div>
                                    ) : null}
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Jenis Kegiatan</p>
                                        <Badge variant={detailRequest.activityType === 'online' ? 'secondary' : 'default'}>
                                            {detailRequest.activityType === 'online' ? 'Daring' : 'Luring'}
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">PIC</p>
                                        <div className="space-y-1">
                                            {detailRequest.pics.map((pic) => (
                                                <div key={`${detailRequest.id}-${pic.id}`} className="rounded-md border border-border/60 p-2">
                                                    <span className="font-semibold">{pic.name}</span>
                                                    <p className="text-xs text-muted-foreground">
                                                        {pic.role ?? 'Peran belum diisi'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
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
                                        <Badge variant={statusVariantMap[detailRequest.status] ?? 'outline'}>
                                            {detailRequest.status}
                                        </Badge>
                                        {detailRequest.statusNote && (
                                            <p className="text-xs text-muted-foreground">
                                                Catatan: {detailRequest.statusNote}
                                            </p>
                                        )}
                                        <div className="mt-2 text-xs text-muted-foreground">
                                            <p>
                                                Perubahan terakhir oleh <span className="font-medium text-foreground">{detailRequest.statusUpdatedBy}</span>
                                            </p>
                                            <p>
                                                pada {formatDate(detailRequest.statusUpdatedAt)}
                                                <span className="ml-1">{formatTime(detailRequest.statusUpdatedAt)}</span>
                                            </p>
                                        </div>
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

                        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            {detailRequest?.status === 'Disetujui' ? (
                                <Button variant="secondary" asChild>
                                    <a
                                        href={`/forms/surat-tugas/${detailRequest.id}/preview`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Preview PDF
                                    </a>
                                </Button>
                            ) : (
                                <p className="text-xs text-muted-foreground sm:mr-auto">
                                    Preview PDF tersedia setelah surat tugas disetujui.
                                </p>
                            )}
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
