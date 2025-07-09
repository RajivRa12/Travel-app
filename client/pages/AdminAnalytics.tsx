import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AdminAnalytics() {
  return (
    <div className="min-h-screen bg-background">
      <Header showLogout />
      <div className="container mx-auto py-12">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/admin/dashboard">&larr; Back to Dashboard</Link>
        </Button>
        <h1 className="text-3xl font-bold mb-4">Export Report</h1>
        <p className="mb-6">Use AI to generate and export detailed analytics and reports for the platform.</p>
        <Button variant="outline" disabled>
          AI Export & Report (Coming Soon)
        </Button>
      </div>
      <Footer />
    </div>
  );
} 