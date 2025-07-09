import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Plane,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  AlertTriangle,
  Users,
  Settings,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Admin sign in:", formData);
      setIsLoading(false);
      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    }, 1000);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setShowForgot(false);
      toast({ title: "Password reset link sent!", description: `Check your email (${forgotEmail}) for instructions.` });
      setForgotEmail("");
    }, 1200);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Admin Warning */}
          <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This is a restricted admin area. Only authorized platform
              administrators may access this section.
            </AlertDescription>
          </Alert>

          {/* Sign In Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Shield className="h-12 w-12 text-primary" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-red-500"></div>
                </div>
              </div>
              <CardTitle className="text-2xl">Admin Access</CardTitle>
              <CardDescription>
                Platform administration and management portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@wanderly.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={formData.password}
                      onChange={(e) =>
                        updateFormData("password", e.target.value)
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline mt-1 text-right w-full"
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        updateFormData("rememberMe", checked)
                      }
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Admin Sign In"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-3">Other access options:</p>
                  <div className="space-y-2">
                    <Link to="/agent/sign-in">
                      <Button variant="outline" size="sm" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Agent Sign In
                      </Button>
                    </Link>
                    <Link to="/sign-in">
                      <Button variant="outline" size="sm" className="w-full">
                        <Plane className="mr-2 h-4 w-4" />
                        Customer Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Security Notice</span>
              </div>
              <p className="text-xs text-muted-foreground">
                All admin activities are logged and monitored. Unauthorized
                access attempts are tracked and reported.
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
