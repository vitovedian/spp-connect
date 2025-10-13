import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, DollarSign, FileText, Activity } from 'lucide-react';

interface DashboardProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function Dashboard({ auth }: DashboardProps) {
    // Mock data for dashboard statistics
    const stats = [
        {
            title: 'Total Stakeholders',
            value: '1,234',
            change: '+12.5%',
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Projects',
            value: '56',
            change: '+8.2%',
            icon: FileText,
            color: 'bg-green-500',
        },
        {
            title: 'Total Budget',
            value: '$2.4M',
            change: '+15.3%',
            icon: DollarSign,
            color: 'bg-purple-500',
        },
        {
            title: 'Active Collaborations',
            value: '23',
            change: '+5.7%',
            icon: Activity,
            color: 'bg-orange-500',
        },
    ];

    const recentActivity = [
        { id: 1, user: 'John Doe', action: 'created a new project', time: '2 min ago' },
        { id: 2, user: 'Jane Smith', action: 'updated stakeholder information', time: '15 min ago' },
        { id: 3, user: 'Robert Johnson', action: 'submitted a report', time: '1 hour ago' },
        { id: 4, user: 'Emily Davis', action: 'commented on a document', time: '3 hours ago' },
    ];

    const projects = [
        { id: 1, name: 'Infrastructure Upgrade', progress: 75, status: 'In Progress' },
        { id: 2, name: 'Community Outreach', progress: 45, status: 'Planning' },
        { id: 3, name: 'Environmental Impact', progress: 90, status: 'Review' },
        { id: 4, name: 'Financial Audit', progress: 30, status: 'In Progress' },
    ];

    return (
        <AppLayout breadcrumbs={[{ label: 'Dashboard', url: '#' }]}>
            <Head title="Dashboard" />
            
            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {auth.user?.name || 'User'}. Here's what's happening with your SPP projects today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <div className={`${stat.color} p-2 rounded-full`}>
                                        <Icon className="h-4 w-4 text-white" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground flex items-center">
                                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                        {stat.change}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Projects and Activity Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Recent Activity */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your team's latest updates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-4">
                                        <div className="bg-gray-100 rounded-full p-2">
                                            <Users className="h-4 w-4 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                <span className="font-semibold">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ongoing Projects */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects Overview</CardTitle>
                            <CardDescription>Your current projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.id} className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{project.name}</p>
                                            <div className="mt-1">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-500 h-2 rounded-full" 
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">{project.progress}% complete</p>
                                            </div>
                                        </div>
                                        <Badge 
                                            variant={project.status === 'In Progress' ? 'default' : 
                                                    project.status === 'Review' ? 'secondary' : 'outline'}
                                            className="ml-4"
                                        >
                                            {project.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Content Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Access important features</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-auto p-4 text-left justify-start">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-6 w-6 text-blue-500" />
                                            <span className="font-medium">Create Project</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Start a new SPP initiative</p>
                                    </div>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 text-left justify-start">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-6 w-6 text-green-500" />
                                            <span className="font-medium">Manage Stakeholders</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Add or update contacts</p>
                                    </div>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 text-left justify-start">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-6 w-6 text-purple-500" />
                                            <span className="font-medium">Budget Tracking</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Monitor finances</p>
                                    </div>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 text-left justify-start">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-6 w-6 text-orange-500" />
                                            <span className="font-medium">Generate Report</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Create insights</p>
                                    </div>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Milestones</CardTitle>
                            <CardDescription>Important dates to remember</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 rounded-full p-2">
                                        <FileText className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Infrastructure Project Review</p>
                                        <p className="text-xs text-muted-foreground">Due in 3 days</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 rounded-full p-2">
                                        <Users className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Stakeholder Meeting</p>
                                        <p className="text-xs text-muted-foreground">Due in 1 week</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 rounded-full p-2">
                                        <DollarSign className="h-4 w-4 text-purple-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Budget Approval Deadline</p>
                                        <p className="text-xs text-muted-foreground">Due in 2 weeks</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}