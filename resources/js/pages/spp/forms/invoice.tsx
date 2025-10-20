import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { ArrowUpDown, Download, FileText, PlusCircle, Search, Send, Trash2 } from 'lucide-react';

type VatOption = 'include' | 'exclude' | 'tanpa';

interface InvoiceOpeItem {
    description: string;
    quantity: number;
    unitPrice: number;
}

interface InvoiceTimelineEvent {
    label: string;
    date: string;
    note?: string;
}

interface InvoiceRecord {
    id: string;
    submissionDate: string;
    invoiceDate: string;
    activityName: string;
    baseAmount: number;
    vatOption: VatOption;
    amountPaid: number;
    status: 'Pending' | 'Partial' | 'Paid' | 'Overdue';
    statusNote?: string | null;
    opeItems: InvoiceOpeItem[];
    timeline: InvoiceTimelineEvent[];
    notes?: string | null;
    paymentLink?: string | null;
}

const invoiceRecords: InvoiceRecord[] = [
    {
        id: 'inv-2025-001',
        submissionDate: '2025-01-10T09:10:00+07:00',
        invoiceDate: '2025-01-12T08:15:00+07:00',
        activityName: 'Transformasi Digital 2025',
        baseAmount: 30000000,
        vatOption: 'include',
        amountPaid: 30000000,
        status: 'Partial',
        statusNote: 'Menunggu pembayaran termin kedua sebelum 11 Februari 2025.',
        opeItems: [
            { description: 'Koordinasi Lapangan', quantity: 1, unitPrice: 2500000 },
            { description: 'Perjalanan Tim Teknis', quantity: 1, unitPrice: 7500000 },
        ],
        timeline: [
            { label: 'Pengajuan disetujui', date: '2025-01-10T10:30:00+07:00' },
            { label: 'Invoice diterbitkan', date: '2025-01-12T08:15:00+07:00' },
            { label: 'Pembayaran termin 1 (Rp15.000.000)', date: '2025-01-20T09:05:00+07:00' },
            { label: 'Pembayaran termin 2 (Rp15.000.000)', date: '2025-01-28T13:42:00+07:00' },
        ],
        notes: 'Termin akhir dapat dibayar via virtual account BNI atau Mandiri.',
        paymentLink: 'https://pay.spp-connect.id/invoices/INV-2025-001',
    },
    {
        id: 'inv-2025-002',
        submissionDate: '2025-01-22T11:40:00+07:00',
        invoiceDate: '2025-01-25T08:25:00+07:00',
        activityName: 'Monitoring Evaluasi Wilayah',
        baseAmount: 21000000,
        vatOption: 'include',
        amountPaid: 0,
        status: 'Pending',
        statusNote: 'Invoice baru dikirim, belum ada konfirmasi pembayaran.',
        opeItems: [
            { description: 'Dokumentasi Lapangan', quantity: 1, unitPrice: 4500000 },
            { description: 'Transportasi Tim Evaluator', quantity: 1, unitPrice: 3200000 },
        ],
        timeline: [
            { label: 'Pengajuan dicatat', date: '2025-01-22T12:05:00+07:00' },
            { label: 'Invoice diterbitkan', date: '2025-01-25T08:25:00+07:00' },
            { label: 'Pengingat pertama terkirim', date: '2025-02-05T10:00:00+07:00', note: 'Email otomatis ke bendahara.' },
        ],
        notes: 'Pembayaran dilakukan per termin setelah laporan kegiatan disetujui.',
        paymentLink: 'https://pay.spp-connect.id/invoices/INV-2025-002',
    },
    {
        id: 'inv-2024-219',
        submissionDate: '2024-11-14T15:00:00+07:00',
        invoiceDate: '2024-11-16T08:10:00+07:00',
        activityName: 'Program Penguatan Literasi',
        baseAmount: 28000000,
        vatOption: 'exclude',
        amountPaid: 39000000,
        status: 'Paid',
        opeItems: [
            { description: 'Konsumsi Peserta', quantity: 2, unitPrice: 4500000 },
            { description: 'Logistik Modul Cetak', quantity: 1, unitPrice: 2000000 },
        ],
        timeline: [
            { label: 'Invoice diterbitkan', date: '2024-11-16T08:10:00+07:00' },
            { label: 'Pembayaran penuh diterima', date: '2024-12-02T14:25:00+07:00' },
        ],
        notes: 'Proyek ditutup. Siap untuk case study internal.',
    },
    {
        id: 'inv-2024-207',
        submissionDate: '2024-10-02T14:45:00+07:00',
        invoiceDate: '2024-10-05T08:20:00+07:00',
        activityName: 'Program Pemberdayaan Digital',
        baseAmount: 14000000,
        vatOption: 'tanpa',
        amountPaid: 9000000,
        status: 'Overdue',
        statusNote: 'Termin kedua terlambat sejak 4 November 2024.',
        opeItems: [
            { description: 'Perjalanan Pendamping', quantity: 1, unitPrice: 2500000 },
            { description: 'Sewa Fasilitas', quantity: 1, unitPrice: 1500000 },
        ],
        timeline: [
            { label: 'Pengajuan dicatat', date: '2024-10-02T14:45:00+07:00' },
            { label: 'Invoice diterbitkan', date: '2024-10-05T08:20:00+07:00' },
            { label: 'Pembayaran termin 1 (Rp9.000.000)', date: '2024-10-18T16:45:00+07:00' },
            { label: 'Pengingat kedua', date: '2024-11-12T09:30:00+07:00', note: 'Telepon ke koordinator program.' },
        ],
        notes: 'Perlu eskalasi ke pimpinan bila belum dibayar akhir pekan ini.',
    },
];

const invoiceStatusVariant: Record<InvoiceRecord['status'], 'default' | 'secondary' | 'outline' | 'destructive'> = {
    Pending: 'outline',
    Partial: 'secondary',
    Paid: 'default',
    Overdue: 'destructive',
};

const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'] as const;

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

const getOpeTotalAmount = (invoice: InvoiceRecord): number =>
    invoice.opeItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);

const getVatAmountFromRecord = (invoice: InvoiceRecord): number =>
    invoice.vatOption === 'include' ? invoice.baseAmount * 0.11 : 0;

const getTotalInvoiceAmount = (invoice: InvoiceRecord): number =>
    invoice.baseAmount + getVatAmountFromRecord(invoice) + getOpeTotalAmount(invoice);

const getOutstandingAmount = (invoice: InvoiceRecord): number =>
    Math.max(getTotalInvoiceAmount(invoice) - invoice.amountPaid, 0);

const formatInvoiceNumber = (invoice: InvoiceRecord): string => {
    const segments = invoice.id.split('-');

    if (segments.length !== 3) {
        return invoice.id.toUpperCase();
    }

    const [prefix, year, sequence] = segments;
    const monthRoman = romanMonths[new Date(invoice.invoiceDate).getMonth()] ?? '-';
    const prefixUpper = prefix.toUpperCase();

    return `${sequence}/${'SPP'}-${prefixUpper}/${monthRoman}/${year}`;
};

type DraftInvoiceStatus = InvoiceRecord['status'];

interface DraftInvoiceItem {
    id: string;
    description: string;
    quantity: string;
    unitPrice: string;
}

const createBlankItem = (): DraftInvoiceItem => ({
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    description: '',
    quantity: '1',
    unitPrice: '',
});

export default function InvoiceList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | InvoiceRecord['status']>('all');
    const [sortField, setSortField] = useState<'submissionDate' | 'invoiceDate' | 'activityName' | 'total'>('invoiceDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
    const [isDetailOpen, setDetailOpen] = useState(false);
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [draftStatus, setDraftStatus] = useState<DraftInvoiceStatus>('Pending');
    const [draftForm, setDraftForm] = useState({
        submissionDate: '',
        invoiceDate: '',
        activityName: '',
        baseAmount: '',
        vatOption: 'include' as VatOption,
        notes: '',
    });
    const [draftItems, setDraftItems] = useState<DraftInvoiceItem[]>([createBlankItem()]);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [confirmationLetterFile, setConfirmationLetterFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState<number>(Date.now());

    const summary = useMemo(() => {
        return invoiceRecords.reduce(
            (acc, invoice) => {
                const totalAmount = getTotalInvoiceAmount(invoice);
                const outstanding = getOutstandingAmount(invoice);

                acc.totalInvoiced += totalAmount;
                acc.totalPaid += invoice.amountPaid;
                acc.totalOutstanding += outstanding;
                acc.overdueCount += invoice.status === 'Overdue' ? 1 : 0;

                return acc;
            },
            {
                totalInvoiced: 0,
                totalPaid: 0,
                totalOutstanding: 0,
                overdueCount: 0,
            },
        );
    }, []);

    const filteredInvoices = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        const filtered = invoiceRecords.filter((invoice) => {
            const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

            if (!matchesStatus) {
                return false;
            }

            if (!term) {
                return true;
            }

            const formattedNumber = formatInvoiceNumber(invoice);

            const haystack = [
                invoice.id,
                formattedNumber,
                invoice.activityName,
                invoice.status,
                invoice.vatOption,
            ]
                .join(' ')
                .toLowerCase();

            return haystack.includes(term);
        });

        const sorted = [...filtered].sort((a, b) => {
            let result = 0;

            if (sortField === 'submissionDate' || sortField === 'invoiceDate') {
                result = new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime();
            } else if (sortField === 'activityName') {
                result = a.activityName.localeCompare(b.activityName, 'id-ID', { sensitivity: 'base' });
            } else if (sortField === 'total') {
                result = getTotalInvoiceAmount(a) - getTotalInvoiceAmount(b);
            }

            return sortDirection === 'asc' ? result : -result;
        });

        return sorted;
    }, [searchTerm, statusFilter, sortField, sortDirection]);

    const openInvoiceDetail = (invoice: InvoiceRecord) => {
        setSelectedInvoice(invoice);
        setDetailOpen(true);
    };

    const handleDraftFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setDraftForm((previous) => ({ ...previous, [name]: value }));
        setFormErrors((previous) => {
            if (!(name in previous)) {
                return previous;
            }

            const { [name]: _removed, ...rest } = previous;
            return rest;
        });
    };

    const handleVatChange = (value: VatOption) => {
        setDraftForm((previous) => ({ ...previous, vatOption: value }));
        setFormErrors((previous) => {
            const { vatOption, ...rest } = previous;
            return rest;
        });
    };

    const handleConfirmationLetterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        if (file && file.type !== 'application/pdf') {
            event.target.value = '';
            setFormErrors((previous) => ({ ...previous, confirmationLetter: 'Berkas harus berformat PDF.' }));
            setConfirmationLetterFile(null);
            return;
        }

        setConfirmationLetterFile(file);
        if (!file) {
            event.target.value = '';
        }
        setFormErrors((previous) => {
            const { confirmationLetter, ...rest } = previous;
            return rest;
        });
    };

    const handleItemChange = (
        index: number,
        field: 'description' | 'quantity' | 'unitPrice',
        value: string,
    ) => {
        setDraftItems((previous) =>
            previous.map((item, itemIndex) =>
                itemIndex === index
                    ? {
                          ...item,
                          [field]: value,
                      }
                    : item,
            ),
        );
    };

    const handleAddItem = () => {
        setDraftItems((previous) => [...previous, createBlankItem()]);
    };

    const handleRemoveItem = (id: string) => {
        setDraftItems((previous) => (previous.length === 1 ? previous : previous.filter((item) => item.id !== id)));
    };

    const draftOpeTotal = useMemo(() => {
        return draftItems.reduce((total, item) => {
            const quantity = Number(item.quantity) || 0;
            const unitPrice = Number(item.unitPrice) || 0;

            return total + quantity * unitPrice;
        }, 0);
    }, [draftItems]);

    const baseAmountValue = useMemo(() => Number(draftForm.baseAmount) || 0, [draftForm.baseAmount]);

    const vatAmount = useMemo(() => {
        if (draftForm.vatOption !== 'include') {
            return 0;
        }

        return baseAmountValue * 0.11;
    }, [draftForm.vatOption, baseAmountValue]);

    const totalInvoiceAmount = useMemo(() => baseAmountValue + vatAmount + draftOpeTotal, [baseAmountValue, vatAmount, draftOpeTotal]);

    const validateDraft = () => {
        const errors: Record<string, string> = {};

        if (!draftForm.submissionDate) {
            errors.submissionDate = 'Tanggal pengajuan wajib diisi.';
        }
        if (!draftForm.invoiceDate) {
            errors.invoiceDate = 'Tanggal invoice wajib diisi.';
        }
        if (!draftForm.activityName.trim()) {
            errors.activityName = 'Nama kegiatan wajib diisi.';
        }
        if (!draftForm.baseAmount.trim()) {
            errors.baseAmount = 'Tagihan invoice wajib diisi.';
        } else if (Number(draftForm.baseAmount) <= 0) {
            errors.baseAmount = 'Tagihan invoice harus lebih dari 0.';
        }

        const hasValidItem = draftItems.every((item) => item.description.trim() && Number(item.quantity) > 0);
        if (!hasValidItem) {
            errors.items = 'Setiap rincian membutuhkan deskripsi dan jumlah minimal 1.';
        }

        if (!confirmationLetterFile) {
            errors.confirmationLetter = 'Unggah bukti confirmation letter dalam format PDF.';
        }

        return errors;
    };

    const resetDraftState = () => {
        setDraftForm({
            submissionDate: '',
            invoiceDate: '',
            activityName: '',
            baseAmount: '',
            vatOption: 'include',
            notes: '',
        });
        setDraftItems([createBlankItem()]);
        setDraftStatus('Pending');
        setFormErrors({});
        setConfirmationLetterFile(null);
        setFileInputKey(Date.now());
    };

    const handleDraftSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validation = validateDraft();

        if (Object.keys(validation).length > 0) {
            setFormErrors(validation);
            return;
        }

        setFormErrors({});
        setCreateOpen(false);
        window.alert(
            `Invoice tersimpan sebagai draft (demo). Total sebesar ${currencyFormatter.format(totalInvoiceAmount)}. Integrasi backend belum tersedia.`,
        );
        resetDraftState();
    };

    return (
        <div className="min-h-screen bg-background pl-4 lg:pl-4">
            <Head title="Invoice" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Invoice</h1>
                            <p className="text-muted-foreground">
                                Pantau tagihan proyek, cek status pembayaran, dan kirim pengingat ke klien secara cepat.
                            </p>
                        </div>
                        <Dialog
                            open={isCreateOpen}
                            onOpenChange={(open) => {
                                setCreateOpen(open);
                                if (open) {
                                    setFormErrors({});
                                } else {
                                    resetDraftState();
                                }
                            }}
                        >
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <FileText className="h-4 w-4" /> Buat Invoice
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle>Buat Invoice Baru</DialogTitle>
                                    <DialogDescription>
                                        Lengkapi informasi di bawah untuk menyusun draft invoice. Pengiriman ke klien belum
                                        terhubung secara otomatis pada versi demo.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-6" onSubmit={handleDraftSubmit}>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="submissionDate">Tanggal Pengajuan</Label>
                                            <Input
                                                id="submissionDate"
                                                name="submissionDate"
                                                type="date"
                                                value={draftForm.submissionDate}
                                                onChange={handleDraftFieldChange}
                                                autoFocus
                                            />
                                            {formErrors.submissionDate && (
                                                <p className="text-xs text-destructive">{formErrors.submissionDate}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="invoiceDate">Tanggal Invoice</Label>
                                            <Input
                                                id="invoiceDate"
                                                name="invoiceDate"
                                                type="date"
                                                value={draftForm.invoiceDate}
                                                onChange={handleDraftFieldChange}
                                            />
                                            {formErrors.invoiceDate && (
                                                <p className="text-xs text-destructive">{formErrors.invoiceDate}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="activityName">Kegiatan</Label>
                                            <Input
                                                id="activityName"
                                                name="activityName"
                                                value={draftForm.activityName}
                                                onChange={handleDraftFieldChange}
                                                placeholder="Contoh: Monitoring Evaluasi Wilayah"
                                            />
                                            {formErrors.activityName && (
                                                <p className="text-xs text-destructive">{formErrors.activityName}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="baseAmount">Tagihan Invoice (Rp)</Label>
                                            <Input
                                                id="baseAmount"
                                                name="baseAmount"
                                                type="number"
                                                min={0}
                                                value={draftForm.baseAmount}
                                                onChange={handleDraftFieldChange}
                                                placeholder="Contoh: 15000000"
                                            />
                                            {formErrors.baseAmount && (
                                                <p className="text-xs text-destructive">{formErrors.baseAmount}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vatOption">PPN</Label>
                                            <Select
                                                value={draftForm.vatOption}
                                                onValueChange={(value) => handleVatChange(value as VatOption)}
                                            >
                                                <SelectTrigger id="vatOption">
                                                    <SelectValue placeholder="Pilih skema PPN" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="include">Include PPN 11%</SelectItem>
                                                    <SelectItem value="exclude">Exclude PPN</SelectItem>
                                                    <SelectItem value="tanpa">Tanpa PPN</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {formErrors.vatOption && (
                                                <p className="text-xs text-destructive">{formErrors.vatOption}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Status Invoice</Label>
                                            <Select value={draftStatus} onValueChange={(value) => setDraftStatus(value as DraftInvoiceStatus)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="Partial">Partial</SelectItem>
                                                    <SelectItem value="Paid">Paid</SelectItem>
                                                    <SelectItem value="Overdue">Overdue</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="notes">Catatan Internal</Label>
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                value={draftForm.notes}
                                                onChange={handleDraftFieldChange}
                                                placeholder="Tambahkan catatan internal tim penagihan."
                                                className="flex min-h-[110px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            />
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="confirmationLetter">Upload Bukti Confirmation Letter (PDF)</Label>
                                            <Input
                                                key={fileInputKey}
                                                id="confirmationLetter"
                                                name="confirmationLetter"
                                                type="file"
                                                accept=".pdf,application/pdf"
                                                onChange={handleConfirmationLetterChange}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Unggah dokumen PDF yang telah disetujui klien.
                                            </p>
                                            {confirmationLetterFile && (
                                                <p className="text-xs text-foreground">
                                                    Berkas dipilih: {confirmationLetterFile.name}
                                                </p>
                                            )}
                                            {formErrors.confirmationLetter && (
                                                <p className="text-xs text-destructive">{formErrors.confirmationLetter}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">Rincian Invoice OPE</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Catat komponen operasional (OPE) yang perlu ditambahkan pada invoice.
                                                </p>
                                                {formErrors.items && (
                                                    <p className="mt-1 text-xs text-destructive">{formErrors.items}</p>
                                                )}
                                            </div>
                                            <Button type="button" variant="outline" size="sm" className="gap-2" onClick={handleAddItem}>
                                                <PlusCircle className="h-4 w-4" /> Tambah Rincian
                                            </Button>
                                        </div>
                                        <div className="space-y-3">
                                            {draftItems.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-md border border-dashed border-muted-foreground/40 bg-muted/20 p-4"
                                                >
                                                    <div className="grid gap-3 sm:grid-cols-[1.6fr_0.4fr_0.6fr_auto] sm:items-end">
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`description-${item.id}`}>Deskripsi</Label>
                                                            <Input
                                                                id={`description-${item.id}`}
                                                                value={item.description}
                                                                onChange={(event) =>
                                                                    handleItemChange(index, 'description', event.target.value)
                                                                }
                                                                placeholder="Contoh: Workshop Kick-off"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`quantity-${item.id}`}>Jumlah</Label>
                                                            <Input
                                                                id={`quantity-${item.id}`}
                                                                type="number"
                                                                min={1}
                                                                value={item.quantity}
                                                                onChange={(event) =>
                                                                    handleItemChange(index, 'quantity', event.target.value)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`unitPrice-${item.id}`}>Harga Satuan (Rp)</Label>
                                                            <Input
                                                                id={`unitPrice-${item.id}`}
                                                                type="number"
                                                                min={0}
                                                                value={item.unitPrice}
                                                                onChange={(event) =>
                                                                    handleItemChange(index, 'unitPrice', event.target.value)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-muted-foreground hover:text-destructive"
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                disabled={draftItems.length === 1}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-xs text-muted-foreground">
                                                        Subtotal OPE:{' '}
                                                        <span className="font-medium text-foreground">
                                                            {currencyFormatter.format(
                                                                (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Tagihan Invoice</p>
                                            <p className="text-sm font-medium">
                                                {currencyFormatter.format(baseAmountValue)}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">PPN 11%</p>
                                            <p className="text-sm font-medium">
                                                {draftForm.vatOption === 'include'
                                                    ? currencyFormatter.format(vatAmount)
                                                    : 'Tidak dihitung'}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Total Rincian OPE</p>
                                            <p className="text-sm font-medium">
                                                {currencyFormatter.format(draftOpeTotal)}
                                            </p>
                                        </div>
        
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Status Saat Disimpan</p>
                                            <p className="text-sm font-medium">{draftStatus}</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 px-4 py-3">
                                        <p className="text-sm font-semibold">Total Invoice</p>
                                        <p className="text-lg font-bold text-foreground">
                                            {currencyFormatter.format(totalInvoiceAmount)}
                                        </p>
                                    </div>

                                    <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-xs text-muted-foreground sm:mr-auto">
                                            Penyimpanan invoice masih bersifat lokal pada versi demo.
                                        </p>
                                        <div className="flex gap-2">
                                            <DialogClose asChild>
                                                <Button type="button" variant="outline" onClick={resetDraftState}>
                                                    Batal
                                                </Button>
                                            </DialogClose>
                                            <Button type="submit">Simpan Draft</Button>
                                        </div>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Total Tagihan</CardDescription>
                                <CardTitle>{currencyFormatter.format(summary.totalInvoiced)}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Sudah Dibayar</CardDescription>
                                <CardTitle>{currencyFormatter.format(summary.totalPaid)}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Sisa Outstanding</CardDescription>
                                <CardTitle>{currencyFormatter.format(summary.totalOutstanding)}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Invoice Terlambat</CardDescription>
                                <CardTitle>{summary.overdueCount}</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>

                <Card>
                    <CardHeader className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <CardTitle>Daftar Invoice</CardTitle>
                                <CardDescription>
                                    Gunakan filter di bawah untuk mempercepat penagihan dan follow-up klien.
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2" disabled>
                                <Download className="h-4 w-4" /> Ekspor CSV
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
                            <div className="relative flex items-center">
                                <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Cari nomor invoice atau kegiatan"
                                    className="pl-9"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Partial">Partial</SelectItem>
                                    <SelectItem value="Paid">Paid</SelectItem>
                                    <SelectItem value="Overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortField} onValueChange={(value) => setSortField(value as typeof sortField)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Urutkan berdasarkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="invoiceDate">Tanggal Invoice</SelectItem>
                                    <SelectItem value="submissionDate">Tanggal Pengajuan</SelectItem>
                                    <SelectItem value="activityName">Nama Kegiatan</SelectItem>
                                    <SelectItem value="total">Total Invoice</SelectItem>
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
                            <Button variant="ghost" size="sm" className="gap-2" disabled>
                                <Send className="h-4 w-4" /> Kirim Pengingat Massal
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="min-w-full table-auto border-separate border-spacing-y-3 text-left">
                            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-2">Nomor Invoice</th>
                                    <th className="px-4 py-2">Tanggal Pengajuan</th>
                                    <th className="px-4 py-2">Tanggal Invoice</th>
                                    <th className="px-4 py-2">Kegiatan</th>
                                    <th className="px-4 py-2 text-right">Tagihan Invoice</th>
                                    <th className="px-4 py-2 text-right">Total OPE</th>
                                    <th className="px-4 py-2 text-right">Total</th>
                                    <th className="px-4 py-2 text-right">Outstanding</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {filteredInvoices.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="px-4 py-6 text-center text-sm text-muted-foreground">
                                            Tidak ada invoice yang cocok dengan filter Anda.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredInvoices.map((invoice) => {
                                        const outstanding = getOutstandingAmount(invoice);
                                        const formattedNumber = formatInvoiceNumber(invoice);
                                        const opeTotal = getOpeTotalAmount(invoice);
                                        const totalAmount = getTotalInvoiceAmount(invoice);

                                        return (
                                            <tr
                                                key={invoice.id}
                                                className="rounded-lg bg-muted/30 text-foreground shadow-sm transition hover:bg-muted/50"
                                            >
                                                <td className="px-4 py-3 font-medium">{formattedNumber}</td>
                                                <td className="px-4 py-3" title={dateTimeFormatter.format(new Date(invoice.submissionDate))}>
                                                    <div className="flex flex-col">
                                                        <span>{dateFormatter.format(new Date(invoice.submissionDate))}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(invoice.submissionDate).toLocaleTimeString('id-ID', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">{dateFormatter.format(new Date(invoice.invoiceDate))}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-medium">{invoice.activityName}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            PPN: {invoice.vatOption === 'include'
                                                                ? 'Include 11%'
                                                                : invoice.vatOption === 'exclude'
                                                                    ? 'Exclude'
                                                                    : 'Tanpa PPN'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    {currencyFormatter.format(invoice.baseAmount)}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    {opeTotal === 0 ? '-' : currencyFormatter.format(opeTotal)}
                                                </td>
                                                <td className="px-4 py-3 text-right font-semibold">
                                                    {currencyFormatter.format(totalAmount)}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    {outstanding === 0
                                                        ? '-'
                                                        : currencyFormatter.format(outstanding)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant={invoiceStatusVariant[invoice.status]}>{invoice.status}</Badge>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <Button variant="outline" size="sm" onClick={() => openInvoiceDetail(invoice)}>
                                                        Detail
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Panduan Penagihan</CardTitle>
                        <CardDescription>
                            Ikuti langkah berikut untuk memastikan invoice dibayar tepat waktu oleh klien.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ol className="flex flex-col gap-4 md:flex-row md:items-start">
                            {[
                                {
                                    title: 'Terbitkan & Konfirmasi',
                                    description:
                                        'Pastikan data proyek dan PIC klien akurat sebelum invoice dikirim ke email resmi.',
                                },
                                {
                                    title: 'Monitor Pembayaran',
                                    description:
                                        'Cek status pembayaran minimal dua kali sepekan. Tandai setiap pembayaran yang masuk.',
                                },
                                {
                                    title: 'Eskalasi Tepat Waktu',
                                    description:
                                        'Jika invoice terlambat lebih dari 14 hari, kirim pengingat resmi dan eskalasi ke pimpinan.',
                                },
                            ].map((step, index) => (
                                <li key={step.title} className="flex flex-1 items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-primary/40 text-sm font-semibold text-primary">
                                        {index + 1}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold">{step.title}</p>
                                        <p className="text-xs text-muted-foreground">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isDetailOpen} onOpenChange={setDetailOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Detail Invoice</DialogTitle>
                        <DialogDescription>
                            Ringkasan lengkap status pembayaran dan rincian layanan untuk invoice terpilih.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        {selectedInvoice ? (
                            (() => {
                                const vatAmount = getVatAmountFromRecord(selectedInvoice);
                                const opeTotal = getOpeTotalAmount(selectedInvoice);
                                const totalAmount = getTotalInvoiceAmount(selectedInvoice);
                                const outstanding = getOutstandingAmount(selectedInvoice);

                                const vatLabel =
                                    selectedInvoice.vatOption === 'include'
                                        ? 'Include PPN 11%'
                                        : selectedInvoice.vatOption === 'exclude'
                                        ? 'Exclude PPN'
                                        : 'Tanpa PPN';

                                return (
                                    <div className="space-y-6">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Nomor Invoice</p>
                                                <p className="font-semibold">{formatInvoiceNumber(selectedInvoice)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Status</p>
                                                <Badge variant={invoiceStatusVariant[selectedInvoice.status]}>
                                                    {selectedInvoice.status}
                                                </Badge>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Tanggal Pengajuan</p>
                                                <p className="font-semibold">
                                                    {dateTimeFormatter.format(new Date(selectedInvoice.submissionDate))}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Tanggal Invoice</p>
                                                <p className="font-semibold">
                                                    {dateTimeFormatter.format(new Date(selectedInvoice.invoiceDate))}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Kegiatan</p>
                                                <p className="font-semibold">{selectedInvoice.activityName}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Jenis PPN</p>
                                                <p className="text-sm font-medium">{vatLabel}</p>
                                                {selectedInvoice.vatOption === 'include' && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Nilai PPN: {currencyFormatter.format(vatAmount)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Tagihan Invoice</p>
                                                <p className="font-semibold">{currencyFormatter.format(selectedInvoice.baseAmount)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Total Rincian OPE</p>
                                                <p className="font-semibold">{currencyFormatter.format(opeTotal)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Sudah Dibayar</p>
                                                <p className="font-semibold">{currencyFormatter.format(selectedInvoice.amountPaid)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Outstanding</p>
                                                <p className="font-semibold">{currencyFormatter.format(outstanding)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 px-4 py-3">
                                            <p className="text-sm font-semibold">Total Invoice</p>
                                            <p className="text-lg font-bold text-foreground">
                                                {currencyFormatter.format(totalAmount)}
                                            </p>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Link Pembayaran</p>
                                                {selectedInvoice.paymentLink ? (
                                                    <Link
                                                        href={selectedInvoice.paymentLink}
                                                        className="text-sm font-medium text-primary hover:underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {selectedInvoice.paymentLink}
                                                    </Link>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">Belum tersedia</span>
                                                )}
                                            </div>
                                        </div>

                                        {selectedInvoice.statusNote && (
                                            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                                                {selectedInvoice.statusNote}
                                            </div>
                                        )}

                                        {selectedInvoice.notes && (
                                            <div>
                                                <p className="text-xs text-muted-foreground">Catatan Internal</p>
                                                <p className="text-sm text-foreground">{selectedInvoice.notes}</p>
                                            </div>
                                        )}

                                        <Separator />

                                        <div className="space-y-3">
                                            <p className="text-xs text-muted-foreground">Rincian Invoice OPE</p>
                                            <div className="rounded-md border border-muted bg-muted/30">
                                                <table className="min-w-full text-sm">
                                                    <thead className="text-xs uppercase text-muted-foreground">
                                                        <tr>
                                                            <th className="px-3 py-2 text-left">Deskripsi</th>
                                                            <th className="px-3 py-2 text-right">Jumlah</th>
                                                            <th className="px-3 py-2 text-right">Harga Satuan</th>
                                                            <th className="px-3 py-2 text-right">Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedInvoice.opeItems.length === 0 ? (
                                                            <tr>
                                                                <td colSpan={4} className="px-3 py-4 text-center text-xs text-muted-foreground">
                                                                    Tidak ada rincian OPE yang tercatat.
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            selectedInvoice.opeItems.map((item) => {
                                                                const subtotal = item.quantity * item.unitPrice;

                                                                return (
                                                                    <tr key={`${selectedInvoice.id}-${item.description}`} className="border-t border-muted">
                                                                        <td className="px-3 py-2 font-medium">{item.description}</td>
                                                                        <td className="px-3 py-2 text-right">{item.quantity}</td>
                                                                        <td className="px-3 py-2 text-right text-muted-foreground">
                                                                            {currencyFormatter.format(item.unitPrice)}
                                                                        </td>
                                                                        <td className="px-3 py-2 text-right font-semibold">
                                                                            {currencyFormatter.format(subtotal)}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        )}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td className="px-3 py-2 text-right text-xs uppercase text-muted-foreground" colSpan={3}>
                                                                Total OPE
                                                            </td>
                                                            <td className="px-3 py-2 text-right text-sm font-semibold">
                                                                {currencyFormatter.format(opeTotal)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-2 text-right text-xs uppercase text-muted-foreground" colSpan={3}>
                                                                Tagihan Invoice
                                                            </td>
                                                            <td className="px-3 py-2 text-right text-sm font-semibold">
                                                                {currencyFormatter.format(selectedInvoice.baseAmount)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-2 text-right text-xs uppercase text-muted-foreground" colSpan={3}>
                                                                PPN 11%
                                                            </td>
                                                            <td className="px-3 py-2 text-right text-sm font-semibold">
                                                                {selectedInvoice.vatOption === 'include'
                                                                    ? currencyFormatter.format(vatAmount)
                                                                    : '-'}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-2 text-right text-xs uppercase text-muted-foreground" colSpan={3}>
                                                                Total Invoice
                                                            </td>
                                                            <td className="px-3 py-2 text-right text-sm font-semibold">
                                                                {currencyFormatter.format(totalAmount)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-2 text-right text-xs uppercase text-muted-foreground" colSpan={3}>
                                                                Sudah Dibayar
                                                            </td>
                                                            <td className="px-3 py-2 text-right text-sm font-semibold">
                                                                {currencyFormatter.format(selectedInvoice.amountPaid)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-2 text-right text-xs uppercase text-muted-foreground" colSpan={3}>
                                                                Outstanding
                                                            </td>
                                                            <td className="px-3 py-2 text-right text-sm font-semibold">
                                                                {currencyFormatter.format(outstanding)}
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-3">
                                            <p className="text-xs text-muted-foreground">Timeline Pembayaran</p>
                                            <div className="space-y-3">
                                                {selectedInvoice.timeline.map((event) => (
                                                    <div key={`${selectedInvoice.id}-${event.label}`} className="rounded-md border border-border/60 p-3">
                                                        <p className="text-sm font-semibold">{event.label}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {dateTimeFormatter.format(new Date(event.date))}
                                                        </p>
                                                        {event.note && (
                                                            <p className="mt-1 text-xs text-muted-foreground">Catatan: {event.note}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()
                        ) : (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                Tidak ada data invoice yang dipilih.
                            </div>
                        )}
                    </div>

                    <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" className="gap-2" disabled={selectedInvoice?.status === 'Paid'}>
                                <Send className="h-4 w-4" />
                                Kirim Pengingat
                            </Button>
                            <Button variant="outline" className="gap-2" disabled>
                                <Download className="h-4 w-4" />
                                Unduh Invoice
                            </Button>
                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost">Tutup</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
