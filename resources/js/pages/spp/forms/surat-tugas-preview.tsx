import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    calculateTotalFee,
    formatCurrency,
    formatDate,
    formatLetterNumber,
    formatTime,
    suratTugasRequests,
    statusVariantMap,
} from '@/lib/surat-tugas';

interface SuratTugasPreviewProps {
    id: string;
}

export default function SuratTugasPreview({ id }: SuratTugasPreviewProps) {
    const record = suratTugasRequests.find((item) => item.id === id);

    return (
        <div className="min-h-screen bg-muted/20 py-10">
            <Head title={`Preview PDF ${record ? record.activityName : ''}`} />
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Pratinjau Surat Tugas</h1>
                    <p className="text-sm text-muted-foreground">
                        Halaman ini merupakan placeholder untuk pratinjau PDF sebelum dicetak.
                    </p>
                </div>

                {!record ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Data tidak ditemukan</CardTitle>
                            <CardDescription>
                                Pastikan Anda membuka pratinjau dari daftar Surat Tugas yang tersedia.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <>
                        <Card>
                            <CardHeader className="flex flex-col gap-2">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <CardTitle className="text-2xl">{formatLetterNumber(record)}</CardTitle>
                                        <CardDescription>
                                            Dibuat pada {formatDate(record.submittedAt)} pukul {formatTime(record.submittedAt)}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={statusVariantMap[record.status] ?? 'outline'}>{record.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                            Nama Kegiatan
                                        </h2>
                                        <p className="text-lg font-medium">{record.activityName}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                            Penanggung Jawab
                                        </h2>
                                        <p className="text-lg font-medium">{record.pic}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                            Periode Kegiatan
                                        </h2>
                                        <p>
                                            {formatDate(record.eventStart)} - {formatDate(record.eventEnd)}
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                            Pendamping
                                        </h2>
                                        <p>{record.companionName ?? 'Belum ditentukan'}</p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                        Instruktur
                                    </h2>
                                    <div className="mt-2 divide-y divide-border rounded-md border">
                                    {record.instructors.map((instructor) => (
                                        <div
                                            key={`${record.id}-${instructor.name}`}
                                            className="flex items-center justify-between px-4 py-3 text-sm"
                                        >
                                            <span className="font-medium">{instructor.name}</span>
                                            <span className="text-muted-foreground">
                                                {formatCurrency(instructor.fee)}
                                            </span>
                                        </div>
                                    ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                        Total Biaya
                                    </span>
                                    <span className="text-xl font-bold">
                                        {formatCurrency(calculateTotalFee(record))}
                                    </span>
                                </div>

                                <div className="rounded-md border border-dashed border-muted-foreground/40 bg-muted/30 p-4 text-sm text-muted-foreground">
                                    <p className="font-semibold text-foreground">Catatan Placeholder</p>
                                    <p>
                                        Template resmi PDF akan dimuat di halaman ini. Gunakan bagian ini untuk memeriksa
                                        data yang akan dicetak sebelum nomor surat diterbitkan.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
}
