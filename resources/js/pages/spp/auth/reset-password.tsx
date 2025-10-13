import NewPasswordController from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function SppResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <>
            <Head title="Reset password" />
            <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-x-[-15%] top-[-45%] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.45),transparent_65%)] blur-2xl" />
                    <div className="absolute inset-x-[12%] bottom-[-50%] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.35),transparent_60%)] blur-[120px]" />
                </div>
                <div className="grid flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
                    <aside className="mx-auto max-w-xl text-center lg:text-left">
                        <p className="text-xs uppercase tracking-[0.35rem] text-blue-200/80">Secure reset</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Choose a new password with confidence
                        </h1>
                        <p className="mt-5 text-base text-slate-300">
                            Protect your workspace with a fresh, strong password. Once saved, you’ll be
                            redirected to log in with your updated credentials.
                        </p>
                    </aside>
                    <main className="relative mx-auto flex w-full max-w-md flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-lg">
                        <header className="space-y-2 text-center">
                            <h2 className="text-2xl font-semibold text-white">Reset password</h2>
                            <p className="text-sm text-slate-300">
                                Update your credentials to continue securely.
                            </p>
                        </header>
                        <Form
                            {...NewPasswordController.store.form()}
                            transform={(data) => ({ ...data, token, email })}
                            resetOnSuccess={['password', 'password_confirmation']}
                            className="mt-6 flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="email" className="text-slate-200">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            readOnly
                                            className="bg-white/10 text-white"
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="password" className="text-slate-200">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            autoFocus
                                            placeholder="Create a password"
                                            className="bg-white/10 text-white placeholder:text-slate-400"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="password_confirmation" className="text-slate-200">
                                            Confirm password
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            placeholder="Repeat password"
                                            className="bg-white/10 text-white placeholder:text-slate-400"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-400 text-slate-900 hover:bg-blue-300"
                                        data-test="reset-password-button"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Reset password
                                    </Button>
                                </>
                            )}
                        </Form>
                    </main>
                </div>
            </div>
        </>
    );
}
