import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Store JWT in localStorage (or context in future)
      localStorage.setItem("token", data.token);
      // Redirect to home or profile
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    // Simulate API call
    setTimeout(() => {
      setForgotLoading(false);
      setShowForgot(false);
      toast({ title: "Password reset link sent!", description: `Check your email (${forgotEmail}) for instructions.` });
      setForgotEmail("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto px-2 sm:px-0">
          <Button variant="ghost" className="mb-6 w-full sm:w-auto" onClick={() => navigate("/")}>Back to Home</Button>
          <div className="bg-white rounded-lg shadow p-4 sm:p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">{t("Customer Sign In")}</h2>
            <p className="text-muted-foreground text-center mb-6">{t("Sign in to your account")}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder={t("Enter your password")}
                  value={formData.password}
                  onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  className="text-xs text-primary hover:underline mt-1 text-right w-full"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot password?
                </button>
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <Button type="submit" className="w-full h-12 text-base" size="lg" disabled={isLoading}>
                {isLoading ? t("Signing in...") : t("Sign In")}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("Don't have an account?")}{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  {t("Register")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Dialog open={showForgot} onOpenChange={setShowForgot}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleForgot} className="space-y-4">
            <div>
              <Label htmlFor="forgot-email">Email Address</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => setShowForgot(false)}>Cancel</Button>
              <Button type="submit" disabled={forgotLoading || !forgotEmail}>
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 