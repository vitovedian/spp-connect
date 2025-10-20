import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface RegisterProps {
    mustVerifyEmail: boolean;
    terms?: boolean;
}

export default function SppRegister({ mustVerifyEmail, terms }: RegisterProps) {
    return (
        <>
            <Head title="Buat akun" />
            <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-x-[-10%] top-[-40%] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.45),transparent_65%)] blur-2xl" />
                    <div className="absolute inset-x-[5%] bottom-[-45%] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35),transparent_60%)] blur-[110px]" />
                </div>
                <div className="grid flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_1fr] lg:px-12">
                    <aside className="mx-auto max-w-xl text-center lg:text-left">
                        <p className="text-xs uppercase tracking-[0.35rem] text-indigo-200/80">SPP Connect</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Mulai inisiatif pemangku kepentingan Anda hari ini
                        </h1>
                        <p className="mt-5 text-base text-slate-300">
                            Bangun relasi yang bermakna, pantau dampak, dan kolaborasi dengan tim Anda secara langsung.
                            Buat akun untuk membuka akses ke ruang kerja SPP.
                        </p>
                    </aside>
                    <main className="relative mx-auto flex w-full max-w-lg flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-lg">
                        <Form
                            {...RegisteredUserController.store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <header className="space-y-2 text-center">
                                        <h2 className="text-2xl font-semibold text-white">Buat akun SPP Anda</h2>
                                        <p className="text-sm text-slate-300">
                                            Lengkapi detail di bawah ini untuk memulai.
                                        </p>
                                    </header>

                                    <div className="space-y-5 text-left">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-slate-200">
                                                Nama lengkap
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                required
                                                autoComplete="name"
                                                placeholder="Jane Smith"
                                                className="bg-white/10 text-white placeholder:text-slate-400"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-slate-200">
                                                Email kerja
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoComplete="email"
                                                placeholder="anda@perusahaan.com"
                                                className="bg-white/10 text-white placeholder:text-slate-400"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="text-slate-200">
                                                    Kata sandi
                                                </Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    required
                                                    autoComplete="new-password"
                                                    placeholder="Buat kata sandi"
                                                    className="bg-white/10 text-white placeholder:text-slate-400"
                                                />
                                                <InputError message={errors.password} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation" className="text-slate-200">
                                                    Konfirmasi kata sandi
                                                </Label>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    required
                                                    autoComplete="new-password"
                                                    placeholder="Ulangi kata sandi"
                                                    className="bg-white/10 text-white placeholder:text-slate-400"
                                                />
                                                <InputError message={errors.password_confirmation} />
                                            </div>
                                        </div>

                                        {terms && (
                                            <div className="flex items-start gap-3 text-slate-200">
                                                <Checkbox id="terms" name="terms" className="mt-1 border-white/40" />
                                                <Label htmlFor="terms" className="text-sm text-slate-200">
                                                    Saya menyetujui{' '}
                                                    <TextLink href="/terms" className="text-indigo-200">
                                                        Ketentuan Layanan
                                                    </TextLink>{' '}
                                                    and{' '}
                                                    <TextLink href="/privacy-policy" className="text-indigo-200">
                                                        Kebijakan Privasi
                                                    </TextLink>
                                                </Label>
                                                <InputError message={errors.terms} />
                                            </div>
                                        )}

                                        {mustVerifyEmail && (
                                            <p className="rounded-md border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-xs text-amber-100">
                                                Setelah mendaftar, kami akan mengirim tautan verifikasi ke email Anda.
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full bg-indigo-400 text-slate-900 hover:bg-indigo-300"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Buat akun
                                    </Button>

                                    <p className="text-center text-sm text-slate-300">
                                        Sudah punya akun?{' '}
                                        <TextLink href={login()} className="text-indigo-200">
                                            Masuk
                                        </TextLink>
                                    </p>
                                </>
                            )}
                        </Form>
                    </main>
                </div>
            </div>
        </>
    );
}
