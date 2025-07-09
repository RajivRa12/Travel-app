import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Help() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-muted-foreground text-lg mb-8">Help Center coming soon. We're here to assist you!</p>
      </div>
      <Footer />
    </div>
  );
} 