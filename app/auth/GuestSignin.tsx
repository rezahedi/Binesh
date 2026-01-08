import { Button } from "@/components/ui/button";
import { useStackApp } from "@stackframe/stack";
import { useRouter } from "next/navigation";

const GuestSignin = () => {
  const stackApp = useStackApp();
  const router = useRouter();

  const handleTestSignin = async () => {
    const result = await stackApp.signInWithCredential({
      email: "john.doe@example.com",
      password: "z7EM3RRtQ9z3fvL",
    });

    if (result.status === "ok") {
      router.push(process.env.NEXT_PUBLIC_APP_BASE!);
    }
  };

  return (
    <Button
      variant="outline"
      size={"sm"}
      className="rounded-sm px-5 block mx-auto"
      onClick={handleTestSignin}
    >
      John Doe
    </Button>
  );
};

export default GuestSignin;
