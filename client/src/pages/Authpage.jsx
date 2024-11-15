import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Authpage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        {
          email: signInEmail,
          password: signInPassword,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast({
          title: "Sign In Successful! ✅",
          description: "You have successfully signed in.",
        });
        navigate("/home/discover");
      } else {
        toast({
          variant: "destructive",
          title: response.data.message || "Sign In failed",
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",

        title: error.response?.data?.message || "Error during sign in",
        description: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          username: signUpName,
          email: signUpEmail,
          password: signUpPassword,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Sign Up Successful!",
          description: "You have successfully created an account.",
        });
      } else {
        toast({
          variant: "destructive",
          title: response.data.message || "Sign Up failed",
          description: "Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response?.data?.message || "Error during sign up",
        description: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="h-36 w-36">
        <img
          src="https://www.spyne.ai/_next/image?url=https%3A%2F%2Fmedia.spyneai.com%2Funsafe%2Ffilters%3Aformat(webp)%2Fd20uiuzezo3er4.cloudfront.net%2FAI-tools%2Fai-tool-home%2FHeaderNew%2FSpyne%2BLogo%2Bblack.png&w=640&q=75"
          alt=""
        />
      </div>
      <Tabs defaultValue="signIn" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signIn">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="signInEmail">Email</Label>
                <Input
                  id="signInEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signInPassword">Password</Label>
                <Input
                  id="signInPassword"
                  type="password"
                  placeholder="Enter your password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignIn}>Sign In</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signUp">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account by filling in your details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="signUpName">Name</Label>
                <Input
                  id="signUpName"
                  placeholder="Enter your name"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signUpEmail">Email</Label>
                <Input
                  id="signUpEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signUpPassword">Password</Label>
                <Input
                  id="signUpPassword"
                  type="password"
                  placeholder="Create a password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignUp}>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
