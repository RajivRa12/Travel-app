import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AdminModeration() {
  return (
    <div className="min-h-screen bg-background">
      <Header showLogout />
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/admin/dashboard">&larr; Back to Dashboard</Link>
        </Button>
        <h1 className="text-2xl font-bold mb-6">Content Moderation</h1>
        <div className="bg-white rounded shadow p-8 text-center text-muted-foreground">
          Content moderation features coming soon...
        </div>
      </div>
      <Footer />
    </div>
  );
} 