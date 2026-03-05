import { 
    SignInButton, 
    SignOutButton, 
    SignUpButton, 
    Show 
} from "@clerk/nextjs";
import { Button } from "@base-ui/react";

export const Navigation = () => {
    return (
        <nav className="border-b border-[var(--foreground)]/10">
            <div className="flex container h-16 items-center justify-between px-4 mx-auto">
                <div className="text-xl font-semibold">RAG Chatbot</div>
                
                <div className="flex gap-2">
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <Button>Sign In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button>Sign Up</Button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <SignOutButton>
                            <Button className="border border-[var(--foreground)]/20 px-4 py-2 rounded-md hover:bg-[var(--foreground)]/5 transition-colors">
                                Sign Out
                            </Button>
                        </SignOutButton>
                    </Show>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;