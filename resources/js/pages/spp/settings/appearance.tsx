import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Palette, User, Shield, Mail, BadgeCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppearance } from '@/hooks/use-appearance';
import SppSettingsLayout from './layout';

export default function SppAppearanceSettings() {
    const { url } = usePage().props as { url: string };
    const currentPath = url || '/settings/appearance';
    const { appearance, updateAppearance } = useAppearance();

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
            title="Pengaturan Tampilan" 
            description="Sesuaikan preferensi tampilan aplikasi Anda" 
            currentPath={currentPath}
            navItems={navItems}
        >
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            Tema Aplikasi
                        </CardTitle>
                        <CardDescription>
                            Pilih tema warna yang Anda sukai
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Tema Aplikasi</Label>
                                <Select value={appearance} onValueChange={(value) => updateAppearance(value as 'light' | 'dark' | 'system')}>
                                    <SelectTrigger id="theme" className="w-[200px]">
                                        <SelectValue placeholder="Pilih tema" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Terang</SelectItem>
                                        <SelectItem value="dark">Gelap</SelectItem>
                                        <SelectItem value="system">Sistem</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="accent-color">Warna Aksen</Label>
                                <div className="flex gap-2">
                                    {['blue', 'green', 'purple', 'orange', 'pink'].map((color) => (
                                        <button
                                            key={color}
                                            className={`h-8 w-8 rounded-full bg-${color}-500 border-2 ${
                                                color === 'blue' ? 'border-primary' : 'border-transparent'
                                            }`}
                                            aria-label={`Pilih warna ${color}`}
                                            onClick={() => console.log(`Selected ${color}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Preferensi UI</CardTitle>
                        <CardDescription>
                            Atur elemen tampilan antarmuka
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Mode Kompak</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Gunakan tata letak yang lebih padat
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Nonaktif
                                </Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Animasi UI</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Tampilkan animasi transisi dan efek halus
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Aktif
                                </Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Font Default</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Gunakan font sistem bawaan
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Aktif
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Preferensi Bahasa</CardTitle>
                        <CardDescription>
                            Pilih bahasa tampilan antarmuka
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="language">Bahasa</Label>
                                <Select value="id" onValueChange={(value) => console.log(value)}>
                                    <SelectTrigger id="language" className="w-[200px]">
                                        <SelectValue placeholder="Pilih bahasa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="id">Indonesia</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="de">Deutsch</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </SppSettingsLayout>
    );
}