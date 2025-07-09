import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plane,
  Menu,
  User,
  Settings,
  LogOut,
  MapPin,
  Star,
  Calendar,
  Bell,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HeaderProps {
  showLogout?: boolean;
}

export default function Header({ showLogout }: HeaderProps) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"customer" | "agent" | "admin">(
    "customer",
  );
  const { t, i18n } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const userEmail = "customer@example.com"; // Replace with real user email from auth context
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const adminDetails = {
    name: "Rajiv Palla",
    email: "admin@wanderly.com",
    role: "Platform Admin",
  };

  useEffect(() => {
    // Check for agent login in localStorage
    const checkUser = () => {
      const agent = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
      if (agent && agent.role === 'agent') {
        setIsLoggedIn(true);
        setUserType('agent');
      } else {
        setIsLoggedIn(false);
        setUserType('customer');
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    fetch(`/api/notifications/${userEmail}`)
      .then(res => res.json())
      .then(data => {
        setNotifications(data.notifications || []);
        setUnreadCount((data.notifications || []).filter((n: any) => !n.read).length);
      });
  }, [userEmail]);

  // Mark all as read when dropdown is opened
  useEffect(() => {
    if (!showNotifications || notifications.length === 0) return;
    const unread = notifications.filter((n: any) => !n.read);
    if (unread.length === 0) return;
    unread.forEach((n: any) => {
      fetch(`/api/notifications/${n._id}/read`, { method: "PUT" })
        .then(() => {
          setNotifications((prev) => prev.map((notif) => notif._id === n._id ? { ...notif, read: true } : notif));
        });
    });
    setUnreadCount(0);
  }, [showNotifications]);

  useEffect(() => {
    if (!userEmail || !('serviceWorker' in navigator) || !window.Notification) return;
    // Request permission and subscribe to push notifications
    async function subscribePush() {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
      const reg = await navigator.serviceWorker.ready;
      // Get VAPID public key from backend
      const res = await fetch('/api/notifications/vapidPublicKey');
      const { publicKey } = await res.json();
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      // Send subscription to backend
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, subscription: sub }),
      });
    }
    // Helper to convert VAPID key
    function urlBase64ToUint8Array(base64String: string) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
    subscribePush();
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // ...clear any other auth state if needed...
    navigate("/agent/sign-in");
  };

  const navigation = [
    { name: "Browse Agents", href: "/browse-agents", icon: MapPin },
    { name: "Travel Packages", href: "/packages", icon: Calendar },
    { name: "Top Destinations", href: "/destinations", icon: Star },
    { name: "How it Works", href: "/how-it-works", icon: Calendar },
  ];

  const agentNavigation = [
    { name: "Dashboard", href: "/agent/dashboard", icon: Settings },
    { name: "My Packages", href: "/agent/packages", icon: Calendar },
    { name: "My Itineraries", href: "/agent/itineraries", icon: MapPin },
  ];

  const currentNav = isLoggedIn && userType === "agent" ? agentNavigation : navigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 min-w-0 flex-shrink-0"
        >
          <div className="relative">
            <Plane className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-accent"></div>
          </div>
          <span className="text-lg md:text-xl font-bold text-foreground hidden xs:block">
            Wanderly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {currentNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Language Switcher */}
          <select
            value={i18n.language}
            onChange={e => i18n.changeLanguage(e.target.value)}
            className="border rounded px-2 py-1 text-xs md:text-sm focus:outline-none"
            aria-label="Select language"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
          {/* Notification Bell */}
          <div className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-accent focus:outline-none"
              aria-label="Notifications"
              onClick={() => setShowNotifications(v => !v)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 p-4">
                <div className="font-semibold mb-2">{t("Notifications")}</div>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="text-sm text-muted-foreground">No notifications</li>
                  ) : notifications.map((n, i) => (
                    <li key={n._id || i} className={`text-sm ${n.read ? "text-muted-foreground" : "font-semibold"}`}>{n.message}</li>
                  ))}
                </ul>
                <div className="mt-2 text-xs text-right">
                  <button className="text-primary hover:underline">View all</button>
                </div>
              </div>
            )}
          </div>
          {/* Profile button for admin */}
          {userType === "admin" ? (
            <>
              <Button
                size="sm"
                className="h-9 px-3 md:px-4 text-xs md:text-sm"
                onClick={() => setShowProfileModal(true)}
              >
                Profile
              </Button>
              <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Admin Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <div><b>Name:</b> {adminDetails.name}</div>
                    <div><b>Email:</b> {adminDetails.email}</div>
                    <div><b>Role:</b> {adminDetails.role}</div>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
          <Button
            size="sm"
            className="h-9 px-3 md:px-4 text-xs md:text-sm"
            asChild
          >
            <Link to="/join-as-agent">Get Started</Link>
          </Button>
          )}

          {showLogout ? (
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 md:px-4 text-xs md:text-sm"
              onClick={handleLogout}
            >
              Log out
            </Button>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 md:px-4 text-xs md:text-sm"
                asChild
              >
                <Link to="/agent/sign-in">Agent Login</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-9 w-9 p-0 touch-manipulation"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center space-x-3 p-6 pb-4 border-b">
                  <div className="relative">
                    <Plane className="h-7 w-7 text-primary" />
                    <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-xl font-bold">Wanderly</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-4">
                  <div className="space-y-1">
                    {currentNav.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-manipulation ${
                            location.pathname === item.href
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* Bottom Actions */}
                {!isLoggedIn && (
                  <div className="p-6 pt-4 border-t bg-muted/30">
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-base"
                        asChild
                      >
                        <Link to="/agent/sign-in">
                          <User className="mr-3 h-5 w-5" />
                          Agent Login
                        </Link>
                      </Button>
                      <Button className="w-full h-12 text-base" asChild>
                        <Link to="/join-as-agent">Get Started</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
