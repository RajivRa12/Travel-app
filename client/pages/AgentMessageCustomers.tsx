import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AgentMessageCustomers() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header showLogout />
      <div className="container mx-auto py-12">
        <button
          className="mb-6 flex items-center gap-2 text-sm text-primary hover:underline focus:outline-none"
          onClick={() => navigate("/agent/dashboard")}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold mb-4">Message Customers</h1>
        <p className="mb-6">Use AI to draft and send messages to your customers.</p>
        <Button variant="outline" disabled>
          AI Customer Messaging (Coming Soon)
        </Button>
      </div>
      <Footer />
    </div>
  );
} 