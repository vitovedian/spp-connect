import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, FileSpreadsheet, FileStack, FileText, NotebookPen } from 'lucide-react';

const placeholderForms = [
    {
        title: 'Surat Tugas',
        description: 'Kelola dan ajukan surat tugas untuk kebutuhan dinas.',
        icon: FileText,
        href: '/forms/surat-tugas',
    },
    {
        title: 'Permohonan Dana',
        description: 'Ajukan pencairan dana operasional dengan proses yang terstruktur.',
        icon: FileSpreadsheet,
    },
    {
        title: 'Laporan Kegiatan',
        description: 'Siapkan laporan kegiatan lengkap dengan dokumentasi pendukung.',
        icon: FileStack,
    },
    {
        title: 'Persetujuan Program',
        description: 'Kumpulkan persetujuan lintas unit sebelum program dijalankan.',
        icon: FileCheck,
    },
    {
        title: 'Catatan Koordinasi',
        description: 'Dokumentasikan hasil koordinasi dan tindak lanjut tim.',
        icon: NotebookPen,
    },
];

export default function Forms() {
    return (
        <div className="min-h-screen bg-background pl-4 lg:pl-4">
            <Head title="Formulir" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Formulir SPP</h1>
                    <p className="text-muted-foreground">
                        Telusuri kumpulan formulir digital yang akan membantu proses administrasi Anda. Semua kartu masih berupa placeholder.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {placeholderForms.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.title} className="flex flex-col justify-between">
                                <CardHeader className="space-y-4">
                                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                        <CardDescription className="mt-1 text-sm text-muted-foreground">
                                            {item.description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {item.href ? (
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={item.href}>Buka Formulir</Link>
                                        </Button>
                                    ) : (
                                        <Button variant="outline" className="w-full" disabled>
                                            Segera Hadir
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
