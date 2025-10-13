import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';
import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';

export default function SppTwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: 'Use a recovery code',
                description:
                    'Enter one of your stored SPP recovery codes to prove it’s really you.',
                toggleText: 'prefer to use an authentication code instead?',
                accent: 'text-emerald-200/80',
            };
        }

        return {
            title: 'Two-factor authentication',
            description:
                'Enter the six-digit code from your authenticator app to complete sign-in.',
            toggleText: 'use a recovery code instead?',
            accent: 'text-sky-200/80',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Two-factor" />
            <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-x-[-15%] top-[-45%] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.45),transparent_65%)] blur-2xl" />
                    <div className="absolute inset-x-[12%] bottom-[-50%] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35),transparent_60%)] blur-[120px]" />
                </div>
                <div className="grid flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
                    <aside className="mx-auto max-w-xl text-center lg:text-left">
                        <p className={`text-xs uppercase tracking-[0.35rem] ${authConfigContent.accent}`}>
                            Secure access
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Double-check it’s you
                        </h1>
                        <p className="mt-5 text-base text-slate-300">
                            Your workspace contains sensitive stakeholder information. Two-factor
                            authentication keeps everything protected by requiring a second proof of
                            identity every time you sign in from a new device.
                        </p>
                    </aside>
                    <main className="relative mx-auto flex w-full max-w-md flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-lg">
                        <header className="space-y-2 text-center">
                            <h2 className="text-2xl font-semibold text-white">
                                {authConfigContent.title}
                            </h2>
                            <p className="text-sm text-slate-300">
                                {authConfigContent.description}
                            </p>
                        </header>
                        <Form
                            {...store.form()}
                            className="mt-6 space-y-6"
                            resetOnError
                            resetOnSuccess={!showRecoveryInput}
                        >
                            {({ errors, processing, clearErrors }) => (
                                <>
                                    {showRecoveryInput ? (
                                        <div className="space-y-2 text-left">
                                            <Input
                                                name="recovery_code"
                                                type="text"
                                                placeholder="Recovery code"
                                                autoFocus
                                                className="bg-white/10 text-white placeholder:text-slate-400"
                                                disabled={processing}
                                            />
                                            <InputError message={errors.recovery_code} />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center space-y-3 text-center">
                                            <InputOTP
                                                name="code"
                                                maxLength={OTP_MAX_LENGTH}
                                                value={code}
                                                onChange={(value) => setCode(value)}
                                                disabled={processing}
                                                pattern={REGEXP_ONLY_DIGITS}
                                            >
                                                <InputOTPGroup>
                                                    {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                                                        <InputOTPSlot key={index} index={index} />
                                                    ))}
                                                </InputOTPGroup>
                                            </InputOTP>
                                            <InputError message={errors.code} />
                                        </div>
                                    )}
                                    <Button
                                        type="submit"
                                        className="w-full bg-sky-500 text-slate-900 hover:bg-sky-400"
                                        disabled={processing}
                                    >
                                        Continue
                                    </Button>
                                    <div className="text-center text-sm text-slate-300">
                                        Need another option?{' '}
                                        <button
                                            type="button"
                                            className="text-sky-200 underline underline-offset-4 hover:text-sky-100"
                                            onClick={() => toggleRecoveryMode(clearErrors)}
                                        >
                                            {authConfigContent.toggleText}
                                        </button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </main>
                </div>
            </div>
        </>
    );
}
