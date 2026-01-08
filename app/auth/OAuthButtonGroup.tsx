import { Button } from "@/components/ui/button";
import { useStackApp } from "@stackframe/stack";
import GithubIcon from "./GithubIcon";
import GoogleIcon from "./GoogleIcon";

interface OAuthButtonGroupProps {
  type: "Sign in" | "Sign up";
}

const OAuthButtonGroup = ({ type }: OAuthButtonGroupProps) => {
  const app = useStackApp();

  const handleSigninWithGoogle = async () => {
    await app.signInWithOAuth("google");
  };
  const handleSigninWithGithub = async () => {
    await app.signInWithOAuth("github");
  };

  return (
    <>
      <Button
        variant="default"
        className="rounded-sm flex gap-2 w-full mb-4 bg-black text-white hover:bg-black/80"
        size={"sm"}
        onClick={handleSigninWithGithub}
      >
        <GithubIcon />
        <div className="grow text-center">{type} with Github</div>
      </Button>
      <Button
        variant="outline"
        className="rounded-sm flex gap-2 w-full mb-4"
        size={"sm"}
        onClick={handleSigninWithGoogle}
      >
        <GoogleIcon />
        <div className="grow text-center">{type} with Google</div>
      </Button>
    </>
  );
};

export default OAuthButtonGroup;
