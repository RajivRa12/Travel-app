import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-muted-foreground text-lg mb-8">Our pricing details are coming soon. Stay tuned!</p>
      </div>
      <Footer />
    </div>
  );
} 