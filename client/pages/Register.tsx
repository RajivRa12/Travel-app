import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess(true);
      setTimeout(() => navigate("/sign-in"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto px-2 sm:px-0">
          <Button variant="ghost" className="mb-6 w-full sm:w-auto" onClick={() => navigate("/")}>Back to Home</Button>
          <div className="bg-white rounded-lg shadow p-4 sm:p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">{t("Customer Register")}</h2>
            <p className="text-muted-foreground text-center mb-6">{t("Create your account")}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("Full Name")}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t("Your Name")}
                  value={formData.name}
                  onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("Email Address")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("customer@example.com")}
                  value={formData.email}
                  onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("Password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("Create a strong password")}
                  value={formData.password}
                  onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              {success && <div className="text-green-600 text-sm text-center">{t("Registration successful! Redirecting...")}</div>}
              <Button type="submit" className="w-full h-12 text-base" size="lg" disabled={isLoading}>
                {isLoading ? t("Registering...") : t("Register")}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("Already have an account?")}{' '}
                <Link to="/sign-in" className="text-primary hover:underline font-medium">
                  {t("Sign In")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 