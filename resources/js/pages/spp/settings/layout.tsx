import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Key, Palette, User, Settings } from 'lucide-react';

interface NavItem {
    title: string;
    href: string;
    icon: any;
    description: string;
}

interface SettingsLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    currentPath: string;
    navItems: NavItem[];
}

export default function SppSettingsLayout({ 
    children, 
    title, 
    description, 
    currentPath, 
    navItems 
}: SettingsLayoutProps) {
    return (
        <div className="min-h-screen bg-background pl-4 lg:pl-4">
            <Head title={`${title} - Pengaturan`} />
            
            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2">
                            <Settings className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
                            <p className="text-muted-foreground">Atur preferensi akun dan keamanan Anda</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Opsi Pengaturan</CardTitle>
                                <CardDescription>
                                    Kelola informasi akun Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    {navItems.map((item, index) => (
                                        <Link 
                                            key={index} 
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-md p-3 text-sm transition-colors ${
                                                currentPath === item.href
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'hover:bg-muted'
                                            }`}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.title}</span>
                                                <span className="text-xs opacity-80">{item.description}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {children}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}