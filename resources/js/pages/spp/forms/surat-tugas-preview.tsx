import { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface RecordMeta {
    id: string;
    letterNumber: string;
    activityName: string;
    status: string;
    statusNote?: string | null;
    submittedAt: string;
    createdBy: string;
    clientName?: string | null;
    pics: {
        id: string;
        name: string;
        role?: string | null;
        missing: string[];
    }[];
}

interface SuratTugasPreviewProps {
    pdfUrl: string;
    backUrl: string;
    record: RecordMeta;
}

export default function SuratTugasPreview({ pdfUrl, backUrl, record }: SuratTugasPreviewProps) {
    const [selectedPicId, setSelectedPicId] = useState(record.pics[0]?.id ?? '');

    const currentPic = useMemo(
        () => record.pics.find((pic) => pic.id === selectedPicId) ?? record.pics[0],
        [record.pics, selectedPicId],
    );

    const previewUrl = useMemo(() => {
        if (!currentPic) {
            return pdfUrl;
        }

        const [base, queryString] = pdfUrl.split('?');
        const params = new URLSearchParams(queryString ?? '');
        params.set('pic', currentPic.id);

        return `${base}?${params.toString()}`;
    }, [pdfUrl, currentPic]);

    const downloadUrl = useMemo(() => {
        const [base, queryString] = previewUrl.split('?');
        const params = new URLSearchParams(queryString ?? '');
        params.set('download', '1');

        return `${base}?${params.toString()}`;
    }, [previewUrl]);
    return (
        <div className="min-h-screen bg-background">
            <Head title={`Pratinjau ${record.letterNumber}`} />

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={backUrl}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-semibold leading-tight">Pratinjau Surat Tugas</h1>
                            <p className="text-sm text-muted-foreground">
                                Nomor: <span className="font-medium text-foreground">{record.letterNumber}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge>{record.status}</Badge>
                        <Button variant="outline" size="sm" asChild>
                            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" /> Unduh PDF
                            </a>
                        </Button>
                    </div>
                </div>

                {record.pics.length > 0 ? (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <p className="text-sm text-muted-foreground">Pilih PIC untuk pratinjau:</p>
                        <Select value={selectedPicId} onValueChange={setSelectedPicId}>
                            <SelectTrigger className="w-[240px]">
                                <SelectValue placeholder="Pilih PIC" />
                            </SelectTrigger>
                            <SelectContent>
                                {record.pics.map((pic) => (
                                    <SelectItem key={pic.id} value={pic.id}>
                                        {pic.name}
                                        {pic.role ? ` — ${pic.role}` : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ) : null}

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Rangkuman</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 text-sm md:grid-cols-2">
                        <div>
                            <p className="text-muted-foreground">Nama Kegiatan</p>
                            <p className="font-medium">{record.activityName}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Dibuat Oleh</p>
                            <p className="font-medium">{record.createdBy}</p>
                        </div>
                        {record.clientName ? (
                            <div>
                                <p className="text-muted-foreground">Klien</p>
                                <p className="font-medium">{record.clientName}</p>
                            </div>
                        ) : null}
                        <div>
                            <p className="text-muted-foreground">Tanggal Pengajuan</p>
                            <p className="font-medium">{record.submittedAt}</p>
                        </div>
                        {currentPic ? (
                            <div>
                                <p className="text-muted-foreground">PIC Dipilih</p>
                                <p className="font-medium">{currentPic.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {currentPic.role ?? 'Peran belum diisi'}
                                </p>
                                {currentPic.missing.length > 0 ? (
                                    <div className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700">
                                        <p className="font-medium">Data belum lengkap:</p>
                                        <ul className="list-disc pl-4">
                                            {currentPic.missing.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                        {record.statusNote ? (
                            <div className="md:col-span-2">
                                <p className="text-muted-foreground">Catatan</p>
                                <p className="font-medium">{record.statusNote}</p>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>

                <div className="flex-1 overflow-hidden rounded-lg border bg-muted">
                    <iframe
                        title={`Pratinjau ${record.letterNumber}`}
                        src={previewUrl}
                        className="h-[75vh] w-full"
                        allow="fullscreen"
                    />
                </div>

                <p className="text-xs text-muted-foreground">
                    Jika PDF tidak muncul, pastikan browser mengizinkan tampilan PDF tersemat dan coba unduh berkas
                    melalui tombol "Unduh PDF" di atas.
                </p>
            </div>
        </div>
    );
}
