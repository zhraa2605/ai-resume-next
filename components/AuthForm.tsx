"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BotMessageSquare, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { logIn, signUp } from "@/app/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthType = "sign-in" | "sign-up";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const AuthForm = ({ type }: { type: AuthType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (type === "sign-up") {
        await signUp(values);
      } else {
        await logIn(values);
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <Card className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg border border-gray-200">
        <CardHeader className="space-y-4 text-center">
          <div className="rounded-full bg-peach-dark-200 size-16 mx-auto flex justify-center items-center">
            <BotMessageSquare size={36} className="text-white" />
          </div>
          <CardTitle className="text-peach-dark-200 font-bold text-xl sm:text-2xl">
            {type === "sign-up"
              ? "Create your account"
              : "Login to your account"}
          </CardTitle>
        
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-8"
            >
              {type === "sign-up" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-peach-dark-200 font-semibold">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peach-dark-200 size-4" />

                          <Input
                            placeholder=" Full Name"
                            {...field}
                            className="focus:border-peach focus:outline-none pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-peach-dark-200 font-semibold">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peach-dark-200 size-4" />
                        <Input
                          type="email"
                          placeholder="Email"
                          {...field}
                          className="focus:border-peach focus:outline-none pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-peach-dark-200 font-semibold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peach-dark-200 size-4" />
                        <Input
                          type="password"
                          placeholder="Password"
                          className="focus:border-peach focus:outline-none pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-peach-dark-200 text-warm-gray hover:bg-peach-dark"
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : type === "sign-up"
                  ? "Sign Up"
                  : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-sm text-center text-muted-foreground flex flex-col sm:flex-row gap-2 justify-center">
          <span>
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
            <span className="text-peach-dark-200 cursor-pointer font-medium hover:underline">
              {type === "sign-in" ? "Sign Up" : "Login"}
            </span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
