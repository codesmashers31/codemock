import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import loginIllustration from "/media/illustrations/12.svg";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
   try {
  await login(email, password);
  navigate("/dashboard");  // ✅ go to dashboard after login
} catch (err: any) {
  setError(err.message || "Login failed");
} finally {
  setIsLoading(false);
}

  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col-reverse lg:flex-row w-full">
        {/* Left Side - Illustration */}
        <aside className="lg:w-1/2 flex justify-center items-center bg-gradient-hero p-4 sm:p-8 md:p-12">
          <div className="w-full max-w-lg mx-auto space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                CareerConnect
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Welcome back to your professional community
              </p>
            </div>
            <div>
              <img
                src={loginIllustration}
                alt="Login illustration"
                className="w-full max-h-60 sm:max-h-80 object-cover rounded-2xl shadow-xl transition-all duration-300"
              />
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Access personalized opportunities",
                  desc: "Get matched with jobs that fit your skills and preferences"
                },
                {
                  title: "Connect with industry experts",
                  desc: "Grow your professional network with meaningful connections"
                },
                {
                  title: "Track your career progress",
                  desc: "Monitor your applications and career growth in one place"
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                    <svg className="w-3 h-3 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Side - Login Form */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-background">
          <div className="w-full max-w-md mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="flex justify-end w-full mb-4">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  New to CareerConnect?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>

            <Card className="shadow-lg border-none bg-white/95 rounded-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
                      Email ID<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 sm:h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs sm:text-sm font-medium">
                      Password<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 sm:h-12"
                      required
                    />
                    <div className="flex justify-end">
                      <Link
                        to="/forgot-password"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-10 sm:h-12 text-base font-medium" 
                    variant="hero"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <Separator />

                {/* Google SSO */}
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">Or continue with</p>
                  <Button variant="outline" className="w-full h-10 sm:h-12 text-base font-medium">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};