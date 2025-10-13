import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface ForgotPasswordProps {
    status?: string;
}

export default function SppForgotPassword({ status }: ForgotPasswordProps) {
    return (
        <>
            <Head title="Forgot password" />
            <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-x-[-15%] top-[-45%] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.45),transparent_65%)] blur-2xl" />
                    <div className="absolute inset-x-[10%] bottom-[-50%] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.38),transparent_60%)] blur-[120px]" />
                </div>
                <div className="grid flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
                    <aside className="mx-auto max-w-xl text-center lg:text-left">
                        <p className="text-xs uppercase tracking-[0.35rem] text-sky-200/80">Password reset</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                            We’ll help you get back into the flow
                        </h1>
                        <p className="mt-5 text-base text-slate-300">
                            Enter the email address tied to your SPP Connect account and we’ll send
                            over a secure link so you can set a new password.
                        </p>
                    </aside>
                    <main className="relative mx-auto flex w-full max-w-md flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-lg">
                        <header className="space-y-2 text-center">
                            <h2 className="text-2xl font-semibold text-white">Reset your password</h2>
                            <p className="text-sm text-slate-300">
                                We’ll email you a link to choose a fresh password.
                            </p>
                            {status && (
                                <div className="rounded-md border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-200">
                                    {status}
                                </div>
                            )}
                        </header>
                        <Form {...PasswordResetLinkController.store.form()} className="mt-6 flex flex-col gap-6">
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="email" className="text-slate-200">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            placeholder="email@example.com"
                                            className="bg-white/10 text-white placeholder:text-slate-400"
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-sky-500 text-slate-900 hover:bg-sky-400"
                                        data-test="email-password-reset-link-button"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Email password reset link
                                    </Button>
                                    <p className="text-center text-sm text-slate-300">
                                        Remembered it?{' '}
                                        <TextLink href={login()} className="text-sky-200">
                                            Go back to log in
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
