import { useHousehold } from "@/hooks/useHousehold";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, LogOut, Users } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function HouseholdInfo() {
  const { household, leaveHousehold, isLeaving } = useHousehold();

  if (!household) return null;

  const copyInviteCode = () => {
    navigator.clipboard.writeText(household.inviteCode);
    toast.success("Invite code copied to clipboard");
  };

  return (
    <FadeIn className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{household.name}</CardTitle>
              <CardDescription>
                Manage your household settings and members.
              </CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="h-8">
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  Leave
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Leave Household?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to leave this household? You will lose
                    access to all household data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-white hover:bg-destructive/90"
                    onClick={() => leaveHousehold()}>
                    {isLeaving ? "Leaving..." : "Leave"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Invite Code</p>
              <p className="text-xs text-muted-foreground">
                Share this code to invite others.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <code className="relative rounded bg-background border px-[0.5rem] py-[0.3rem] font-mono text-sm font-semibold tracking-widest">
                {household.inviteCode}
              </code>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={copyInviteCode}>
                <Copy className="h-3.5 w-3.5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <Users className="mr-2 h-4 w-4" />
              Members ({household.members.length})
            </h3>
            <StaggerContainer className="grid gap-3 sm:grid-cols-2">
              {household.members.map((member) => (
                <StaggerItem key={member.id}>
                  <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/20 transition-colors">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage
                        src={member.profileImage}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-none truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
