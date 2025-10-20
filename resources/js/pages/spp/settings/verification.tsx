import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { BadgeCheck, User, Shield, Mail, Palette } from 'lucide-react';
import SppSettingsLayout from './layout';

export default function SppVerificationSettings() {
    const { url } = usePage().props as { url: string };
    const currentPath = url || '/settings/verification';

    // Navigation items for the settings layout
    const navItems = [
        {
            title: 'Profil',
            href: '/settings/profile',
            icon: User,
            description: 'Ubah informasi pribadi'
        },
        {
            title: 'Keamanan',
            href: '/settings/security',
            icon: Shield,
            description: 'Ubah kata sandi & 2FA'
        },
        {
            title: 'Email',
            href: '/settings/email',
            icon: Mail,
            description: 'Atur alamat email'
        },
        {
            title: 'Tampilan',
            href: '/settings/appearance',
            icon: Palette,
            description: 'Personalisasi tampilan'
        },
        {
            title: 'Verifikasi',
            href: '/settings/verification',
            icon: BadgeCheck,
            description: 'Verifikasi akun'
        }
    ];

    return (
        <SppSettingsLayout 
            title="Pengaturan Verifikasi" 
            description="Kelola status verifikasi akun Anda" 
            currentPath={currentPath}
            navItems={navItems}
        >
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5" />
                            Status Verifikasi Email
                        </CardTitle>
                        <CardDescription>
                            Status verifikasi alamat email Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Badge variant="destructive">Belum Terverifikasi</Badge>
                                <span className="text-muted-foreground">user@example.com</span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                                Verifikasi email diperlukan untuk mengakses semua fitur aplikasi dan 
                                menerima notifikasi penting.
                            </p>
                            
                            <div className="pt-2">
                                <Button>
                                    Kirim Tautan Verifikasi
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Verifikasi Identitas</CardTitle>
                        <CardDescription>
                            Verifikasi identitas tambahan untuk akses premium
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Verifikasi Identitas</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Verifikasi identitas dengan dokumen resmi
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Belum Terverifikasi
                                </Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Verifikasi Organisasi</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Verifikasi afiliasi organisasi Anda
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Belum Terverifikasi
                                </Button>
                            </div>
                            
                            <div className="pt-4">
                                <Button variant="secondary">
                                    Ajukan Verifikasi
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Aktivitas Verifikasi</CardTitle>
                        <CardDescription>
                            Riwayat verifikasi dan aktivitas terkait
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-100 rounded-full p-2 mt-1">
                                    <BadgeCheck className="h-4 w-4 text-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Tautan verifikasi dikirim</p>
                                    <p className="text-xs text-muted-foreground">10 menit yang lalu</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-gray-100 rounded-full p-2 mt-1">
                                    <BadgeCheck className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Pengajuan verifikasi organisasi</p>
                                    <p className="text-xs text-muted-foreground">2 hari yang lalu</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </SppSettingsLayout>
    );
}