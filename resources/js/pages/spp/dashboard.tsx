import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, DollarSign, FileText, Activity } from 'lucide-react';

export default function Dashboard() {
    // Mock data for dashboard statistics
    const stats = [
        {
            title: 'Total Pemangku Kepentingan',
            value: '1.234',
            change: '+12,5%',
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Proyek',
            value: '56',
            change: '+8,2%',
            icon: FileText,
            color: 'bg-green-500',
        },
        {
            title: 'Total Anggaran',
            value: 'Rp2,4M',
            change: '+15,3%',
            icon: DollarSign,
            color: 'bg-purple-500',
        },
        {
            title: 'Kolaborasi Aktif',
            value: '23',
            change: '+5,7%',
            icon: Activity,
            color: 'bg-orange-500',
        },
    ];

    const recentActivity = [
        { id: 1, user: 'John Doe', action: 'membuat proyek baru', time: '2 menit lalu' },
        { id: 2, user: 'Jane Smith', action: 'memperbarui data pemangku kepentingan', time: '15 menit lalu' },
        { id: 3, user: 'Robert Johnson', action: 'mengirimkan laporan', time: '1 jam lalu' },
        { id: 4, user: 'Emily Davis', action: 'memberi komentar pada dokumen', time: '3 jam lalu' },
    ];

    const projects = [
        { id: 1, name: 'Peningkatan Infrastruktur', progress: 75, status: 'Sedang Berjalan' },
        { id: 2, name: 'Jangkauan Komunitas', progress: 45, status: 'Perencanaan' },
        { id: 3, name: 'Dampak Lingkungan', progress: 90, status: 'Tinjauan' },
        { id: 4, name: 'Audit Keuangan', progress: 30, status: 'Sedang Berjalan' },
    ];

    return (
        <div className="min-h-screen bg-background pl-4 lg:pl-4"> {/* pl-4 provides 4 units of left padding */}
            <Head title="Dasbor" />
            
            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Dasbor</h1>
                    <p className="text-muted-foreground">
                        Selamat datang kembali! Berikut ringkasan perkembangan terbaru proyek SPP Anda hari ini.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <div className={`${stat.color} p-2 rounded-full`}>
                                        <Icon className="h-4 w-4 text-white" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground flex items-center">
                                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                        {stat.change}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Projects and Activity Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Recent Activity */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Aktivitas Terbaru</CardTitle>
                            <CardDescription>Pembaruan terkini dari tim Anda</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-4">
                                        <div className="bg-gray-100 rounded-full p-2">
                                            <Users className="h-4 w-4 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                <span className="font-semibold">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ongoing Projects */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects Overview</CardTitle>
                            <CardDescription>Your current projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.id} className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{project.name}</p>
                                            <div className="mt-1">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-500 h-2 rounded-full" 
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">{project.progress}% selesai</p>
                                        </div>
                                    </div>
                                        <Badge 
                                            variant={project.status === 'Sedang Berjalan' ? 'default' : 
                                                    project.status === 'Tinjauan' ? 'secondary' : 'outline'}
                                            className="ml-4"
                                        >
                                            {project.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Content Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Aksi Cepat</CardTitle>
                            <CardDescription>Akses fitur penting secara instan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-auto p-4 text-left justify-start">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-6 w-6 text-blue-500" />
                                            <span className="font-medium">Buat Proyek</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Mulai inisiatif SPP baru</p>
                                    </div>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 text-left justify-start">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-6 w-6 text-green-500" />
                                            <span className="font-medium">Kelola Pemangku Kepentingan</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Tambah atau perbarui kontak</p>
                                    </div>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 text-left justify-start">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-6 w-6 text-purple-500" />
                                            <span className="font-medium">Pantau Anggaran</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Awasi posisi keuangan</p>
                                    </div>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 text-left justify-start">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-6 w-6 text-orange-500" />
                                            <span className="font-medium">Buat Laporan</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Susun wawasan utama</p>
                                    </div>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Agenda Mendatang</CardTitle>
                            <CardDescription>Tanggal penting yang perlu dicatat</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 rounded-full p-2">
                                        <FileText className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Review Proyek Infrastruktur</p>
                                        <p className="text-xs text-muted-foreground">Jatuh tempo dalam 3 hari</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 rounded-full p-2">
                                        <Users className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Rapat Pemangku Kepentingan</p>
                                        <p className="text-xs text-muted-foreground">Jatuh tempo dalam 1 minggu</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 rounded-full p-2">
                                        <DollarSign className="h-4 w-4 text-purple-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Batas Persetujuan Anggaran</p>
                                        <p className="text-xs text-muted-foreground">Jatuh tempo dalam 2 minggu</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
