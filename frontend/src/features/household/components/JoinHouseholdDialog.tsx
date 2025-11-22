import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHousehold } from "@/hooks/useHousehold";
import { joinHouseholdSchema, type JoinHouseholdInput } from "../schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UserPlus } from "lucide-react";

export function JoinHouseholdDialog() {
  const [open, setOpen] = useState(false);
  const { joinHousehold, isJoining } = useHousehold();

  const form = useForm<JoinHouseholdInput>({
    resolver: zodResolver(joinHouseholdSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  const onSubmit = (data: JoinHouseholdInput) => {
    joinHousehold(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <UserPlus className="mr-2 h-4 w-4" />
          Join Existing Household
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Household</DialogTitle>
          <DialogDescription>
            Enter the invite code shared by a household member.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="inviteCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invite Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ABC12345"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isJoining}>
              {isJoining ? "Joining..." : "Join Household"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
