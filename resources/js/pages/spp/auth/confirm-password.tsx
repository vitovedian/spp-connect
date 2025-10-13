import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function SppConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />
            <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-x-[-20%] top-[-40%] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.45),transparent_65%)] blur-2xl" />
                    <div className="absolute inset-x-[5%] bottom-[-50%] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.35),transparent_60%)] blur-[120px]" />
                </div>
                <div className="grid flex-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
                    <aside className="mx-auto max-w-xl text-center lg:text-left">
                        <p className="text-xs uppercase tracking-[0.35rem] text-pink-200/80">Secure step</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Confirm your identity to continue
                        </h1>
                        <p className="mt-5 text-base text-slate-300">
                            For sensitive actions, we ask you to re-enter your password. This keeps your
                            stakeholders’ data safe and ensures only you can proceed.
                        </p>
                    </aside>
                    <main className="relative mx-auto flex w-full max-w-md flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur-lg">
                        <header className="space-y-2 text-center">
                            <h2 className="text-2xl font-semibold text-white">Confirm password</h2>
                            <p className="text-sm text-slate-300">
                                Enter your current password to unlock this action.
                            </p>
                        </header>
                        <Form {...store.form()} resetOnSuccess={['password']} className="mt-6 flex flex-col gap-6">
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="password" className="text-slate-200">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            autoComplete="current-password"
                                            autoFocus
                                            placeholder="Enter password"
                                            className="bg-white/10 text-white placeholder:text-slate-400"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-pink-400 text-slate-900 hover:bg-pink-300"
                                        data-test="confirm-password-button"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Confirm password
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
