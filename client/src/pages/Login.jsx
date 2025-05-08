import  React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login with:", email, password)
  }

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Login with Google")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900 p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 pl-10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 pl-10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="#" className="font-medium text-purple-400 hover:text-purple-300">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Sign in
          </Button>

          <Separator className="my-4 bg-gray-700" />

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
