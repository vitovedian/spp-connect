import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, User, Shield, Palette, BadgeCheck } from 'lucide-react';
import SppSettingsLayout from './layout';

export default function SppEmailSettings() {
    const { url } = usePage().props as { url: string };
    const currentPath = url || '/settings/email';

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
            title="Pengaturan Email" 
            description="Kelola alamat email dan preferensi notifikasi" 
            currentPath={currentPath}
            navItems={navItems}
        >
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Alamat Email
                        </CardTitle>
                        <CardDescription>
                            Perbarui alamat email utama Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-email">Email Saat Ini</Label>
                                <Input
                                    id="current-email"
                                    value="user@example.com"
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="new-email">Email Baru</Label>
                                <Input
                                    id="new-email"
                                    type="email"
                                    placeholder="Alamat email baru"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="confirm-email">Konfirmasi Email Baru</Label>
                                <Input
                                    id="confirm-email"
                                    type="email"
                                    placeholder="Konfirmasi alamat email baru"
                                />
                            </div>
                            
                            <div className="flex items-center gap-4 pt-2">
                                <Button>
                                    Perbarui Email
                                </Button>
                                <Button variant="outline">
                                    Kirim Verifikasi Ulang
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Preferensi Notifikasi</CardTitle>
                        <CardDescription>
                            Atur jenis notifikasi yang Anda terima melalui email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Notifikasi Aktivitas</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Terima pemberitahuan tentang aktivitas akun Anda
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Aktif
                                </Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Ringkasan Mingguan</Label>
                                    <p className="text-sm text-muted-foreground">
                                    Kirim ringkasan aktivitas mingguan ke email Anda
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Aktif
                                </Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Pengingat Pembayaran</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Dapatkan pengingat pembayaran invoice sebelum jatuh tempo
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Nonaktif
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </SppSettingsLayout>
    );
}