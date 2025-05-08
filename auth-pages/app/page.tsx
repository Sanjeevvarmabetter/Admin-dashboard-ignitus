import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Welcome to Ignitus Networks</h1>
      <p className="mt-4 max-w-md text-lg text-gray-400">
      Near Blockchain CrowdFunding Application
      </p>
      <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild variant="outline" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
          <Link href="/signup">Create Account</Link>
        </Button>
      </div>
    </div>
  )
}
