import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-background">
      <Header showLogout />
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Admin Settings</h1>
        <p className="mb-6">Use AI to get recommendations and manage platform settings.</p>
        <Button variant="outline" disabled>
          AI Settings Assistant (Coming Soon)
        </Button>
      </div>
      <Footer />
    </div>
  );
} 