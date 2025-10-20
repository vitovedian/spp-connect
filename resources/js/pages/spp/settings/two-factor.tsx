import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { Form, Head, usePage } from '@inertiajs/react';
import { Shield, ShieldBan, ShieldCheck, User, Mail, Palette, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import SppSettingsLayout from './layout';

interface TwoFactorProps {
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
}

export default function SppTwoFactorSettings({ 
    requiresConfirmation = false, 
    twoFactorEnabled = false 
}: TwoFactorProps) {
    const { url } = usePage().props as { url: string };
    const currentPath = url || '/settings/two-factor';
    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);

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
            title="Pengaturan Autentikasi Dua Faktor" 
            description="Kelola keamanan akun Anda dengan 2FA" 
            currentPath={currentPath}
            navItems={navItems}
        >
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Autentikasi Dua Faktor
                        </CardTitle>
                        <CardDescription>
                            Tambahkan lapisan keamanan tambahan ke akun Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {twoFactorEnabled ? (
                            <div className="flex flex-col items-start justify-start space-y-4">
                                <Badge variant="default">Aktif</Badge>
                                <p className="text-muted-foreground">
                                    Dengan autentikasi dua faktor diaktifkan, Anda akan
                                    diminta kode acak yang aman selama login,
                                    yang dapat Anda ambil dari aplikasi TOTP di ponsel Anda.
                                </p>

                                <TwoFactorRecoveryCodes
                                    recoveryCodesList={recoveryCodesList}
                                    fetchRecoveryCodes={fetchRecoveryCodes}
                                    errors={errors}
                                />

                                <div className="relative inline">
                                    <Form action="/user/two-factor-authentication" method="delete">
                                        {({ processing }) => (
                                            <Button
                                                variant="destructive"
                                                type="submit"
                                                disabled={processing}
                                            >
                                                <ShieldBan /> Nonaktifkan 2FA
                                            </Button>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-start justify-start space-y-4">
                                <Badge variant="destructive">Nonaktif</Badge>
                                <p className="text-muted-foreground">
                                    Saat Anda mengaktifkan autentikasi dua faktor, Anda
                                    akan diminta kode yang aman selama login.
                                    Kode ini dapat diambil dari aplikasi TOTP
                                    yang didukung di ponsel Anda.
                                </p>

                                <div>
                                    {hasSetupData ? (
                                        <Button
                                            onClick={() => setShowSetupModal(true)}
                                        >
                                            <ShieldCheck />
                                            Lanjutkan Penyiapan
                                        </Button>
                                    ) : (
                                        <Form action="/user/two-factor-authentication" method="post">
                                            {({ processing }) => (
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    <ShieldCheck />
                                                    Aktifkan 2FA
                                                </Button>
                                            )}
                                        </Form>
                                    )}
                                </div>
                            </div>
                        )}

                        <TwoFactorSetupModal
                            isOpen={showSetupModal}
                            onClose={() => setShowSetupModal(false)}
                            requiresConfirmation={requiresConfirmation}
                            twoFactorEnabled={twoFactorEnabled}
                            qrCodeSvg={qrCodeSvg}
                            manualSetupKey={manualSetupKey}
                            clearSetupData={clearSetupData}
                            fetchSetupData={fetchSetupData}
                            errors={errors}
                        />
                    </CardContent>
                </Card>
            </div>
        </SppSettingsLayout>
    );
}