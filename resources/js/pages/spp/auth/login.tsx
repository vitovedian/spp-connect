import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function SppLogin({ status, canResetPassword }: LoginProps) {
    return (
        <>
            <Head title="Log in" />
            <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-x-[-10%] top-[-40%] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.45),transparent_65%)] blur-2xl" />
                    <div className="absolute inset-x-[5%] bottom-[-45%] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.35),transparent_60%)] blur-[110px]" />
                </div>
                <div className="grid flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
                    <aside className="mx-auto max-w-xl text-center lg:text-left">
                        <p className="text-xs uppercase tracking-[0.35rem] text-sky-300/80">SPP Connect</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Re-connect with your stakeholders effortlessly
                        </h1>
                        <p className="mt-5 text-base text-slate-300">
                            Streamline collaboration, manage outreach, and keep every conversation in
                            motion. Log back in and pick up exactly where you left off.
                        </p>
                    </aside>
                    <main className="relative mx-auto flex w-full max-w-md flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-lg">
                        <Form
                            {...AuthenticatedSessionController.store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <header className="space-y-2 text-center">
                                        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
                                        <p className="text-sm text-slate-300">
                                            Enter your credentials to access your workspace.
                                        </p>
                                        {status && (
                                            <div className="rounded-md border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-200">
                                                {status}
                                            </div>
                                        )}
                                    </header>

                                    <div className="space-y-5 text-left">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-slate-200">
                                                Email address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="bg-white/10 text-white placeholder:text-slate-400"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center text-slate-200">
                                                <Label htmlFor="password">Password</Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="ml-auto text-sm text-sky-300"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Password"
                                                className="bg-white/10 text-white placeholder:text-slate-400"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                                className="border-white/40"
                                            />
                                            <Label htmlFor="remember" className="text-slate-200">
                                                Remember me
                                            </Label>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full bg-sky-500 text-slate-900 hover:bg-sky-400"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && (
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Log in
                                    </Button>

                                    <p className="text-center text-sm text-slate-300">
                                        Need an account?{' '}
                                        <TextLink href={register()} tabIndex={5} className="text-sky-300">
                                            Create one
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
