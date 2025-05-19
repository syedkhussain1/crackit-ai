"use client"
import LandingImg from '../assets/main.svg'
import Logo from '../assets/logo.svg'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  const { isSignedIn } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Image id='landing-page-logo' src={Logo} alt="Crackit AI" className="h-30 w-auto" priority />
          <div className="flex items-center gap-3">
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="outline" size="sm">Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <section className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Crackit with AI
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Streamline your job search with our intelligent tracking system. Organize applications, track interviews, and land your dream job with confidence.
              </p>
              <div className="pt-4">
                {isSignedIn ? (
                  <Button asChild size="lg">
                    <Link href="/add-job" className="flex items-center gap-2">
                      Continue to Dashboard
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button size="lg" className="flex items-center gap-2">
                      Get Started
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px]">
              <Image 
                src={LandingImg} 
                alt="Job tracking illustration"
                id="landing-page-image"
                className="object-contain"
                priority
                fill
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
