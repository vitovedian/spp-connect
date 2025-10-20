import EmailVerificationNotificationController from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { logout } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface VerifyEmailProps {
    status?: string;
}

export default function SppVerifyEmail({ status }: VerifyEmailProps) {
    return (
        <>
            <Head title="Verifikasi email" />
            <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-x-[-15%] top-[-45%] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.4),transparent_65%)] blur-2xl" />
                    <div className="absolute inset-x-[12%] bottom-[-50%] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(165,180,252,0.4),transparent_60%)] blur-[120px]" />
                </div>
                <div className="grid flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
                    <aside className="mx-auto max-w-xl text-center lg:text-left">
                        <p className="text-xs uppercase tracking-[0.35rem] text-emerald-200/80">Verifikasi email</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Konfirmasi alamat Anda untuk membuka semua fitur
                        </h1>
                        <p className="mt-5 text-base text-slate-300">
                            Kami telah mengirim tautan verifikasi ke kotak masuk Anda. Mengonfirmasi email memastikan
                            tim dapat mempercayai setiap notifikasi yang Anda kirim.
                        </p>
                    </aside>
                    <main className="relative mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_45px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-lg">
                        <header className="space-y-2">
                            <h2 className="text-2xl font-semibold text-white">Menunggu konfirmasi</h2>
                            <p className="text-sm text-slate-300">
                                Tidak menerima email? Kami bisa mengirimkannya kembali.
                            </p>
                            {status === 'verification-link-sent' && (
                                <div className="rounded-md border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-200">
                                    Tautan verifikasi terbaru sedang dikirim ke kotak masuk Anda.
                                </div>
                            )}
                        </header>
                        <Form
                            {...EmailVerificationNotificationController.store.form()}
                            className="flex w-full flex-col gap-4"
                        >
                            {({ processing }) => (
                                <>
                                    <Button
                                        type="submit"
                                        className="w-full bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Kirim ulang email verifikasi
                                    </Button>
                                    <TextLink href={logout()} className="text-sm text-emerald-200">
                                        Keluar
                                    </TextLink>
                                </>
                            )}
                        </Form>
                    </main>
                </div>
            </div>
        </>
    );
}
