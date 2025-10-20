import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Key, Palette, User, Mail, Lock, BadgeCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';
import SppSettingsLayout from './layout';
import { SharedData } from '@/types';

export default function SppSettings() {
    const { url } = usePage().props as { url: string };
    const currentPath = url || '/settings';

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
            title="Ringkasan Pengaturan" 
            description="Kelola preferensi dan keamanan akun Anda" 
            currentPath={currentPath}
            navItems={navItems}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">Selamat datang di Pengaturan</h2>
                    <p className="text-muted-foreground">
                        Kelola informasi akun, keamanan, dan preferensi pribadi Anda di sini.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Profil</CardTitle>
                                <CardDescription>Informasi pribadi Anda</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" asChild>
                                <Link href="/settings/profile">Kelola Profil</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Lock className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Keamanan</CardTitle>
                                <CardDescription>Kata sandi & verifikasi</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" asChild>
                                <Link href="/settings/security">Kelola Keamanan</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Email</CardTitle>
                                <CardDescription>Alamat dan verifikasi</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" asChild>
                                <Link href="/settings/email">Kelola Email</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Palette className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Tampilan</CardTitle>
                                <CardDescription>Preferensi tampilan</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" asChild>
                                <Link href="/settings/appearance">Kelola Tampilan</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Panduan Keamanan</CardTitle>
                        <CardDescription>
                            Tips untuk menjaga akun Anda tetap aman
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="grid gap-2 text-sm">
                            <li className="flex items-start gap-2">
                                <div className="bg-green-500 rounded-full p-0.5 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                </div>
                                <span>Gunakan kata sandi unik minimal 12 karakter</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-green-500 rounded-full p-0.5 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                </div>
                                <span>Aktifkan autentikasi dua faktor</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-green-500 rounded-full p-0.5 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                </div>
                                <span>Periksa aktivitas login secara berkala</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-green-500 rounded-full p-0.5 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                </div>
                                <span>Jangan bagikan informasi akun ke pihak lain</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </SppSettingsLayout>
    );
}