import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Users,
  Shield,
  TrendingUp,
  AlertTriangle,
  Globe,
  DollarSign,
  MapPin,
  Star,
  Activity,
  Settings,
  FileText,
  Calendar,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import { ChartContainer } from "@/components/ui/chart";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mockPackages = [
    {
      name: "Himalayan Adventure",
      agent: "Raj Kumar",
      price: 25000,
      status: "Pending",
    },
    {
      name: "Goa Beach Escape",
      agent: "Priya Sharma",
      price: 18500,
      status: "Active",
    },
    {
      name: "Delhi City Tour",
      agent: "Amit Patel",
      price: 9999,
      status: "Blocked",
    },
  ];

  const mockAgents = [
    {
      name: "Raj Kumar",
      email: "raj@mountainexplorers.com",
      status: "Pending",
    },
    {
      name: "Priya Sharma",
      email: "priya@beachgetaways.com",
      status: "Active",
    },
    {
      name: "Amit Patel",
      email: "amit@citytours.com",
      status: "Blocked",
    },
  ];

  const [agents, setAgents] = useState(mockAgents);
  const [packages, setPackages] = useState(mockPackages);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  const handleViewAgent = (agent) => {
    setSelectedAgent(agent);
    setShowAgentModal(true);
  };
  const handleApproveAgent = (idx) => {
    setAgents((prev) => prev.map((a, i) => i === idx ? { ...a, status: "Active" } : a));
    toast({ title: "Agent Approved", description: "The agent has been approved." });
  };
  const handleBlockAgent = (idx) => {
    setAgents((prev) => prev.map((a, i) => i === idx ? { ...a, status: "Blocked" } : a));
    toast({ title: "Agent Blocked", description: "The agent has been blocked." });
  };
  const handleViewPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowPackageModal(true);
  };
  const handleApprovePackage = (idx) => {
    setPackages((prev) => prev.map((p, i) => i === idx ? { ...p, status: "Active" } : p));
    toast({ title: "Package Approved", description: "The package has been approved." });
  };
  const handleBlockPackage = (idx) => {
    setPackages((prev) => prev.map((p, i) => i === idx ? { ...p, status: "Blocked" } : p));
    toast({ title: "Package Blocked", description: "The package has been blocked." });
  };

  const platformStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Agents",
      value: "1,234",
      change: "+12%",
      icon: MapPin,
      color: "text-green-600",
    },
    {
      title: "Platform Revenue",
      value: "$156,890",
      change: "+18%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.1",
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  const recentActivity = [
    {
      type: "user_registration",
      description: "New agent registration: Sarah Johnson",
      time: "2 minutes ago",
      status: "pending",
    },
    {
      type: "booking",
      description: "New booking completed: $1,250",
      time: "15 minutes ago",
      status: "success",
    },
    {
      type: "review",
      description: "Review flagged for moderation",
      time: "1 hour ago",
      status: "warning",
    },
    {
      type: "agent_verification",
      description: "Agent verification completed: Mike Chen",
      time: "2 hours ago",
      status: "success",
    },
  ];

  const pendingActions = [
    {
      title: "Agent Approvals",
      count: 23,
      description: "New agents waiting for verification",
      urgency: "high",
    },
    {
      title: "Content Moderation",
      count: 12,
      description: "Reviews and profiles to moderate",
      urgency: "medium",
    },
    {
      title: "Support Tickets",
      count: 8,
      description: "Escalated customer support issues",
      urgency: "high",
    },
    {
      title: "Payment Issues",
      count: 3,
      description: "Payment disputes to resolve",
      urgency: "critical",
    },
  ];

  const admin = {
    name: "Rajiv Palla",
    role: "Platform Admin",
    email: "admin@wanderly.com",
    description: "Platform administrator with full access to manage users, agents, content, and analytics. Ensures smooth operation and security of the Wanderly platform.",
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExportAnalytics = () => {
    const csv = "Metric,Value\nTotal Revenue,1340000\nTotal Bookings,3\nActive Agents,3\nAvg Booking Value,50000";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "analytics.csv");
  };

  const handleExportLeads = () => {
    const csv = "Name,Email,Status\nJohn Doe,john@example.com,Confirmed\nJane Smith,jane@example.com,Pending";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "leads.csv");
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/sign-in";
  };

  // New business intelligence and performance metrics
  const dashboardStats1 = [
    {
      label: "Total Revenue",
      value: "₹13.4L",
      sub: "+12.5% this month",
      icon: DollarSign,
      iconColor: "text-green-600",
    },
    {
      label: "Total Bookings",
      value: "3",
      sub: "2 confirmed",
      icon: Calendar,
      iconColor: "text-blue-600",
    },
    {
      label: "Active Agents",
      value: "3",
      sub: "2 approved",
      icon: Users,
      iconColor: "text-purple-600",
    },
    {
      label: "Avg Booking Value",
      value: "₹50K",
      sub: "+8.7% increase",
      icon: TrendingUp,
      iconColor: "text-orange-600",
    },
  ];
  const dashboardStats2 = [
    {
      label: "Conversion Rate",
      value: "12.5%",
      sub: "+2.3%",
      icon: TrendingUp,
      iconColor: "text-green-600",
    },
    {
      label: "Avg. Booking Value",
      value: "₹25,450",
      sub: "+8.7%",
      icon: DollarSign,
      iconColor: "text-blue-600",
    },
    {
      label: "Customer Satisfaction",
      value: "4.6/5",
      sub: "+0.2",
      icon: Star,
      iconColor: "text-yellow-600",
    },
    {
      label: "Agent Response Time",
      value: "2.4 hrs",
      sub: "-0.8 hrs",
      icon: Clock,
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header showLogout />

      <div className="container mx-auto px-4 py-8">
        {/* Admin Info Card */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-white rounded-xl shadow p-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-primary">
                {admin.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold leading-tight">{admin.name}</h2>
                  <Badge variant="secondary" className="text-xs">{admin.role}</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{admin.email}</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl text-sm">{admin.description}</p>
          </div>
        </div>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("Admin Dashboard")}</h1>
            <p className="text-muted-foreground">
              Platform overview and management tools
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex justify-end gap-3 mb-4">
          <Button variant="outline" onClick={handleRefresh}>
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.635 19A9 9 0 0021 12.07M18.364 5A9 9 0 003 11.93" /></svg>
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportAnalytics}>
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Export Analytics
          </Button>
          <Button variant="outline" onClick={handleExportLeads}>
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Export Leads
            </Button>
          <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
            </Button>
        </div>

        {/* Admin Feature Quick Access Buttons - Styled */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Quick Admin Tools</h2>
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row flex-wrap gap-4 justify-start">
            <Link to="/admin/users">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition text-base w-full sm:w-auto">User Management</button>
            </Link>
            <Link to="/admin/subscriptions">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition text-base w-full sm:w-auto">Subscription Management</button>
            </Link>
            <Link to="/admin/moderation">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition text-base w-full sm:w-auto">Content Moderation</button>
            </Link>
            <Link to="/admin/analytics">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition text-base w-full sm:w-auto">Analytics & Reports</button>
            </Link>
            <Link to="/admin/notifications">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition text-base w-full sm:w-auto">Notifications</button>
            </Link>
            <Link to="/admin/audit-logs">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition text-base w-full sm:w-auto">Audit Logs</button>
            </Link>
          </div>
        </div>

        {/* New Dashboard Stat Cards - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {dashboardStats1.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* New Dashboard Stat Cards - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats2.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Legacy Platform Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {platformStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from
                    last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex w-full justify-between">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Pending Actions */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Pending Actions
                    </CardTitle>
                    <CardDescription>
                      Items requiring your immediate attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingActions.map((action, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{action.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold mb-1">
                              {action.count}
                            </div>
                            <Badge
                              variant={
                                action.urgency === "critical"
                                  ? "destructive"
                                  : action.urgency === "high"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {action.urgency}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              activity.status === "success"
                                ? "bg-green-500"
                                : activity.status === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">
                              {activity.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">Platform Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">System Status</span>
                      <Badge variant="default">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API Response Time</span>
                      <span className="text-sm font-medium">142ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Sessions</span>
                      <span className="text-sm font-medium">3,247</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agents">
            <Card>
              <CardHeader>
                <CardTitle>Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Search agents..."
                    className="border rounded px-3 py-2 w-full sm:w-64"
                  />
                  <select className="border rounded px-3 py-2 w-full sm:w-40">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Active</option>
                    <option>Blocked</option>
                  </select>
                  </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left font-semibold">Name</th>
                        <th className="py-2 px-4 text-left font-semibold">Email</th>
                        <th className="py-2 px-4 text-left font-semibold">Status</th>
                        <th className="py-2 px-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.map((agent, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-2 px-4">{agent.name}</td>
                          <td className="py-2 px-4">{agent.email}</td>
                          <td className="py-2 px-4">
                            {agent.status === "Pending" && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>
                            )}
                            {agent.status === "Active" && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                            )}
                            {agent.status === "Blocked" && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Blocked</span>
                            )}
                          </td>
                          <td className="py-2 px-4 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewAgent(agent)}>View</Button>
                            {agent.status === "Pending" && (
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleApproveAgent(idx)}>Approve</Button>
                            )}
                            {agent.status !== "Blocked" && (
                              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleBlockAgent(idx)}>Block</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            {/* Agent Details Modal */}
            <Dialog open={showAgentModal} onOpenChange={setShowAgentModal}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agent Details</DialogTitle>
                </DialogHeader>
                {selectedAgent && (
                  <div className="space-y-2">
                    <div><b>Name:</b> {selectedAgent.name}</div>
                    <div><b>Email:</b> {selectedAgent.email}</div>
                    <div><b>Status:</b> {selectedAgent.status}</div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
                <ChartContainer config={{}}>
                  {/* Replace with AreaChart from recharts or your chart lib */}
                  <svg width="100%" height="180"><rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" textAnchor="middle" fill="#aaa">[Area Chart]</text></svg>
                </ChartContainer>
              </div>
              {/* Package Categories */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Package Categories</h2>
                <div className="h-40 flex items-center justify-center text-muted-foreground">[Categories Chart]</div>
              </div>
              {/* Growth Metrics */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Growth Metrics</h2>
                <ChartContainer config={{}}>
                  {/* Replace with BarChart from recharts or your chart lib */}
                  <svg width="100%" height="180"><rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" textAnchor="middle" fill="#aaa">[Bar Chart]</text></svg>
                </ChartContainer>
              </div>
              {/* Conversion Funnel */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Conversion Funnel</h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-blue-50 rounded px-3 py-2 font-medium">
                    <span>Website Visitors</span>
                    <span>12,450</span>
                  </div>
                  <div className="flex justify-between items-center bg-green-50 rounded px-3 py-2 font-medium">
                    <span>Package Views</span>
                    <span>3,280</span>
                  </div>
                  <div className="flex justify-between items-center bg-yellow-50 rounded px-3 py-2 font-medium">
                    <span>Inquiries</span>
                    <span>892</span>
                  </div>
                  <div className="flex justify-between items-center bg-red-50 rounded px-3 py-2 font-medium">
                    <span>Bookings</span>
                    <span>156</span>
                  </div>
                  <div className="flex justify-center mt-2">
                    <span className="bg-gray-100 rounded px-3 py-1 text-sm font-semibold">Conversion Rate: 12.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <div className="mb-6">
              <Button variant="ghost" className="mb-4" asChild>
                <Link to="/admin/dashboard">&larr; Back to Dashboard</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Revenue Analytics Chart */}
              <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Revenue Analytics</h2>
                <ChartContainer config={{}}>
                  {/* Replace with real LineChart from recharts or your chart lib */}
                  <svg width="100%" height="260" viewBox="0 0 500 260">
                    <rect width="500" height="260" fill="#f8fafc" />
                    {/* Axes */}
                    <line x1="40" y1="20" x2="40" y2="220" stroke="#bbb" strokeWidth="2" />
                    <line x1="40" y1="220" x2="480" y2="220" stroke="#bbb" strokeWidth="2" />
                    {/* Line connecting points */}
                    <polyline fill="none" stroke="#222" strokeWidth="3" points="40,200 120,170 200,140 280,160 360,100 440,60" />
                    {/* Dots */}
                    <circle cx="40" cy="200" r="7" fill="#111" />
                    <circle cx="120" cy="170" r="7" fill="#111" />
                    <circle cx="200" cy="140" r="7" fill="#111" />
                    <circle cx="280" cy="160" r="7" fill="#111" />
                    <circle cx="360" cy="100" r="7" fill="#111" />
                    <circle cx="440" cy="60" r="7" fill="#111" />
                    {/* X-axis labels */}
                    <text x="40" y="240" textAnchor="middle" fontSize="14" fill="#888">Jan</text>
                    <text x="120" y="240" textAnchor="middle" fontSize="14" fill="#888">Feb</text>
                    <text x="200" y="240" textAnchor="middle" fontSize="14" fill="#888">Mar</text>
                    <text x="280" y="240" textAnchor="middle" fontSize="14" fill="#888">Apr</text>
                    <text x="360" y="240" textAnchor="middle" fontSize="14" fill="#888">May</text>
                    <text x="440" y="240" textAnchor="middle" fontSize="14" fill="#888">Jun</text>
                    {/* Y-axis labels */}
                    <text x="10" y="220" textAnchor="end" fontSize="14" fill="#888">0</text>
                    <text x="10" y="170" textAnchor="end" fontSize="14" fill="#888">85,000</text>
                    <text x="10" y="120" textAnchor="end" fontSize="14" fill="#888">170,000</text>
                    <text x="10" y="70" textAnchor="end" fontSize="14" fill="#888">255,000</text>
                    <text x="10" y="20" textAnchor="end" fontSize="14" fill="#888">340,000</text>
                  </svg>
                </ChartContainer>
              </div>
              {/* Revenue Breakdown */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Revenue Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-green-50 rounded px-3 py-2 font-medium">
                    <span>Commission (15%)</span>
                    <span>₹2L</span>
                  </div>
                  <div className="flex justify-between items-center bg-blue-50 rounded px-3 py-2 font-medium">
                    <span>Platform Fee (3%)</span>
                    <span>₹0L</span>
                  </div>
                  <div className="flex justify-between items-center bg-purple-50 rounded px-3 py-2 font-medium">
                    <span>Payment Gateway (2%)</span>
                    <span>₹0L</span>
                  </div>
                  <div className="flex justify-between items-center bg-yellow-50 rounded px-3 py-2 font-medium">
                    <span>Net Revenue</span>
                    <span>₹1.1L</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Top Performing Agents Table */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">Top Performing Agents</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left font-semibold">Agent</th>
                      <th className="py-2 px-4 text-left font-semibold">Revenue</th>
                      <th className="py-2 px-4 text-left font-semibold">Bookings</th>
                      <th className="py-2 px-4 text-left font-semibold">Conversion Rate</th>
                      <th className="py-2 px-4 text-left font-semibold">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b last:border-0">
                      <td className="py-2 px-4">
                        <div className="font-semibold">Mountain Explorers</div>
                        <div className="text-xs text-muted-foreground">Manali, Himachal Pradesh</div>
                      </td>
                      <td className="py-2 px-4">₹285K</td>
                      <td className="py-2 px-4">32</td>
                      <td className="py-2 px-4">15.2%</td>
                      <td className="py-2 px-4 flex items-center gap-1"><span>★</span> 4.7</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="font-semibold">Desert Safaris</div>
                        <div className="text-xs text-muted-foreground">Jaisalmer, Rajasthan</div>
                      </td>
                      <td className="py-2 px-4">₹195K</td>
                      <td className="py-2 px-4">24</td>
                      <td className="py-2 px-4">18.5%</td>
                      <td className="py-2 px-4 flex items-center gap-1"><span>★</span> 4.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <CardTitle>Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Search packages..."
                    className="border rounded px-3 py-2 w-full sm:w-64"
                  />
                  <select className="border rounded px-3 py-2 w-full sm:w-40">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Active</option>
                    <option>Blocked</option>
                  </select>
                  </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left font-semibold">Package</th>
                        <th className="py-2 px-4 text-left font-semibold">Agent</th>
                        <th className="py-2 px-4 text-left font-semibold">Price</th>
                        <th className="py-2 px-4 text-left font-semibold">Status</th>
                        <th className="py-2 px-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-2 px-4">{pkg.name}</td>
                          <td className="py-2 px-4">{pkg.agent}</td>
                          <td className="py-2 px-4">₹{pkg.price.toLocaleString()}</td>
                          <td className="py-2 px-4">
                            {pkg.status === "Pending" && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>
                            )}
                            {pkg.status === "Active" && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                            )}
                            {pkg.status === "Blocked" && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Blocked</span>
                            )}
                          </td>
                          <td className="py-2 px-4 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewPackage(pkg)}>View</Button>
                            {pkg.status === "Pending" && (
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleApprovePackage(idx)}>Approve</Button>
                            )}
                            {pkg.status !== "Blocked" && (
                              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleBlockPackage(idx)}>Block</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            {/* Package Details Modal */}
            <Dialog open={showPackageModal} onOpenChange={setShowPackageModal}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Package Details</DialogTitle>
                </DialogHeader>
                {selectedPackage && (
                  <div className="space-y-2">
                    <div><b>Name:</b> {selectedPackage.name}</div>
                    <div><b>Agent:</b> {selectedPackage.agent}</div>
                    <div><b>Price:</b> ₹{selectedPackage.price.toLocaleString()}</div>
                    <div><b>Status:</b> {selectedPackage.status}</div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
