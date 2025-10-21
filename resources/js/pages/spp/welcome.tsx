import { Head, Link } from '@inertiajs/react';

export default function SppWelcome() {
    return (
        <>
            <Head title="Selamat Datang SPP" />
            <section className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-br from-primary/25 via-background to-background px-6 py-10 text-foreground md:items-start">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[40px] border border-primary/20 bg-white/5 shadow-[0_45px_90px_-40px_rgba(15,23,42,0.65)] blur-sm dark:bg-white/5" />
                    <div
                        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[48px] bg-[radial-gradient(circle_at_20%_20%,rgba(244,67,54,0.3),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(0,131,255,0.28),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(255,193,7,0.22),transparent_65%)] blur-2xl"
                    />
                    <div
                        className="absolute left-1/2 top-1/2 h-[420px] w-[600px] -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-[56px] border border-white/40 bg-white/10 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.75)] backdrop-blur"
                        style={{
                            backgroundImage:
                                'url(\'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=1400&q=80\')',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </div>
                <div className="z-10 text-center md:text-left">
                    <p className="text-xs uppercase tracking-[0.35rem] text-primary/70">
                        SPP Connect
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
                        Selamat datang di SPP Connect
                    </h1>
                    <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground md:text-base">
                        Akses dasbor Anda, kelola hubungan strategis, dan sinergikan kolaborasi tim
                        dalam satu platform terpadu. Kami hadirkan pengalaman yang memungkinkan
                        Anda mengutamakan hal-hal yang benar-benar penting.
                    </p>
                </div>
                <div className="z-10 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <Link
                        href="/login"
                        className="rounded-md border border-border px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
                    >
                        Masuk
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Buat akun
                    </Link>
                </div>
            </section>
        </>
    );
}
