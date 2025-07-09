import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-muted-foreground text-lg mb-8">About Us page coming soon. Learn more about our mission!</p>
      </div>
      <Footer />
    </div>
  );
} 