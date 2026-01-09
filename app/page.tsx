import { stackServerApp } from "@stack/server";
import Image from "next/image";
import Link from "next/link";
import SloganBuilder from "./SloganBuilder";
import {
  BookOpenIcon,
  CodeIcon,
  Gamepad2Icon,
  LightbulbIcon,
  PencilIcon,
  Users2Icon,
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { redirect } from "next/navigation";
import HeroFeatureCard from "./HeroFeatureCard";
import { AuthModal, SigninButton, SignupButton } from "@/auth";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import ThemeSwitchButton from "./ThemeSwitchButton";

export default async function WebsitePage() {
  const user = await stackServerApp.getUser();
  if (user) {
    return redirect("/learn");
  }

  const STATS = [
    { title: "Interactive", value: "Quiz & Exercises" },
    { title: "Gamified", value: "Keep Learners Engaged" },
    { title: "Markdown", value: "Human & AI Friendly" },
    { title: "Open Source", value: "Free Forever" },
  ];
  const FEATURES = [
    {
      color: "from-yellow-400 to-orange-400",
      icon: PencilIcon,
      title: "Bite-sized Learning Platform",
      description:
        "Create bite-sized lessons that are easy to understand mixed with engaging content and interactive quizzes.",
    },
    {
      color: "from-blue-400 to-cyan-400",
      icon: CodeIcon,
      title: "Markdown-Based Format",
      description:
        "Standardized, AI-friendly content format that's easy to naturally write and edit, and reuse across any subject.",
    },
    {
      color: "from-purple-400 to-pink-400",
      icon: Gamepad2Icon,
      title: "Built-in Gamification",
      description:
        "Motivate learners with points, streaks, and achievements. Keep them coming back for more.",
    },
    {
      color: "from-green-400 to-emerald-400",
      icon: BookOpenIcon,
      title: "Interactive Components",
      description:
        "Embed quizzes, exercises, and interactive elements directly in your lessons to reinforce learning.",
    },
    {
      color: "from-red-400 to-rose-400",
      icon: Users2Icon,
      title: "Open Source & Free",
      description:
        "Built by the community, for the community. Join us and help shape the future of learning.",
    },
    {
      color: "from-indigo-400 to-violet-400",
      icon: LightbulbIcon,
      title: "Learn Through Practice",
      description:
        "Focus on deep understanding through hands-on practice, not memorization.",
    },
  ];

  return (
    <AuthModalProvider>
      <AuthModal />
      <header className="sticky top-0 bg-background w-full shadow-lg z-10">
        <div className="container max-w-7xl px-4 py-4 mx-auto flex gap-3 items-center justify-between">
          <h1>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_BASE}`}
              className="flex gap-2 items-center hover:text-primary"
            >
              <Image
                src="/assets/binesh-logo.svg"
                width={50}
                height={50}
                alt="Binesh Logo"
              />
              <div className="text-3xl font-bold">Binesh</div>
            </Link>
          </h1>
          <nav className="grow hidden sm:block">
            <ul className="flex gap-1 justify-center text-lg">
              <li>
                <Link
                  href="#features"
                  className="block p-2 px-6 rounded-full hover:bg-muted"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="block p-2 px-6 rounded-full hover:bg-muted"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="block p-2 px-6 rounded-full hover:bg-muted"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-2 items-center">
            <SigninButton
              title="Sign In"
              variant="outline"
              className="border-muted-foreground shadow-none active:translate-0"
            />
            <ThemeSwitchButton />
          </div>
        </div>
      </header>
      <section className="text-center my-10">
        <SloganBuilder />
      </section>
      <section className="py-16 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <b className="font-semibold text-lg">{stat.title}</b>
                <p className="text-foreground/80 mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div id="how-it-works"></div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 font-md-serif text-4xl sm:text-5xl">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto text-foreground/80 sm:text-lg text-balance">
              A platform designed for anyone who wants to create engaging
              content and learn effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                color={feature.color}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
        <div id="features"></div>
      </section>
      <HeroFeatureCard
        className="bg-[#f0f8f7] dark:bg-foreground/5"
        image="/assets/app-screen-05.png"
        title={
          <>
            More effective,
            <br /> more fun
          </>
        }
        description="Binesh's interactive approach helps you master concepts in less
            time, with more purpose and joy."
      />
      <HeroFeatureCard
        className="bg-[#f7f2ff] dark:bg-background"
        image="/assets/app-screen-06.png"
        title={
          <>
            Stay
            <br /> motivated
          </>
        }
        description="Finish every day smarter with engaging lessons, competitive features, and daily encouragement."
        reverse
      />
      <section
        id="about"
        className="pt-20 px-6 bg-[#f8f7f0] dark:bg-foreground/5"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="font-md-serif text-4xl sm:text-5xl text-balance mb-4 sm:mb-14">
            Learn through practice
          </h3>
          <p className="my-10 text-balance sm:text-lg text-foreground/80 mx-auto max-w-5xl">
            Binesh (meaning &quot;Insight&quot; in Persian) is an open-source
            platform that makes content creation effortless and learning
            engaging for everyone. Anyone can create bite-sized lessons with
            interactive components using simple Markdown. Share knowledge, learn
            from others, and grow together.
          </p>
          <SignupButton
            title="Get Started"
            variant="primary"
            className="text-lg py-4 px-14"
          />
          <div className="mt-14 rounded-2xl rounded-b-none sm:rounded-4xl sm:rounded-b-none overflow-hidden max-w-4xl mx-auto">
            <video
              src="/assets/quiz_720.mp4"
              autoPlay
              loop
              muted
              className="w-full -mb-10 sm:-mb-26"
            />
          </div>
        </div>
      </section>
      <footer className="not-dark:bg-foreground not-dark:text-background">
        <div className="max-w-7xl mx-auto px-4 py-28 flex flex-col sm:flex-row gap-8 items-center sm:items-end justify-between">
          <div>
            <h1>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_BASE}`}
                className="flex gap-4 items-center"
              >
                <Image
                  src="/assets/binesh-logo.svg"
                  width={76}
                  height={76}
                  alt="Binesh Logo"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="text-4xl font-bold">Binesh</h2>
                  <p className="font-light">Learn through practice.</p>
                </div>
              </Link>
            </h1>
            <p className="mt-16">
              &copy; 2025 Binesh. Open source and build with mix of hand coding
              and AI.
            </p>
          </div>
          <nav>
            <ul className="flex gap-4 [&_a]:hover:underline">
              <li>
                <Link target="_blank" href="https://github.com/rezahedi/binesh">
                  Github
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://rezahedi.dev">
                  Portfolio
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </AuthModalProvider>
  );
}
