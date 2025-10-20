import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import InputError from '@/components/input-error';
import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Key, User, Mail, Palette, BadgeCheck } from 'lucide-react';
import { useRef } from 'react';
import SppSettingsLayout from './layout';

export default function SppSecuritySettings() {
    const { url } = usePage().props as { url: string };
    const currentPath = url || '/settings/security';
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

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
            title="Pengaturan Keamanan" 
            description="Kelola keamanan akun Anda" 
            currentPath={currentPath}
            navItems={navItems}
        >
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Kata Sandi
                        </CardTitle>
                        <CardDescription>
                            Perbarui kata sandi akun Anda untuk meningkatkan keamanan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...PasswordController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            resetOnError={[
                                'password',
                                'password_confirmation',
                                'current_password',
                            ]}
                            resetOnSuccess
                            onError={(errors) => {
                                if (errors.password) {
                                    passwordInput.current?.focus();
                                }

                                if (errors.current_password) {
                                    currentPasswordInput.current?.focus();
                                }
                            }}
                            className="space-y-6"
                        >
                            {({ errors, processing, recentlySuccessful }) => (
                                <>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current_password">
                                                Kata Sandi Saat Ini
                                            </Label>
                                            <Input
                                                id="current_password"
                                                ref={currentPasswordInput}
                                                name="current_password"
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
                                                placeholder="Kata sandi saat ini"
                                            />
                                            <InputError
                                                message={errors.current_password}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password">
                                                Kata Sandi Baru
                                            </Label>
                                            <Input
                                                id="password"
                                                ref={passwordInput}
                                                name="password"
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                placeholder="Kata sandi baru"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">
                                                Konfirmasi Kata Sandi
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                placeholder="Konfirmasi kata sandi baru"
                                            />
                                            <InputError
                                                message={errors.password_confirmation}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button
                                            disabled={processing}
                                            data-test="update-password-button"
                                        >
                                            Simpan Kata Sandi
                                        </Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-green-600">
                                                Disimpan!
                                            </p>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5" />
                            Autentikasi Dua Faktor
                        </CardTitle>
                        <CardDescription>
                            Tambahkan lapisan keamanan tambahan ke akun Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-muted-foreground">
                                Autentikasi dua faktor membantu melindungi akun Anda dengan memerlukan 
                                kode tambahan selain kata sandi saat login.
                            </p>
                            
                            <div className="flex items-center gap-4">
                                <Button variant="outline">
                                    Siapkan 2FA
                                </Button>
                                <Button variant="secondary">
                                    Nonaktifkan
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </SppSettingsLayout>
    );
}