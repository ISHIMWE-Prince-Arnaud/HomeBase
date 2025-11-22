import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePayments } from "@/hooks/usePayments";
import { useHousehold } from "@/hooks/useHousehold";
import { useAuth } from "@/hooks/useAuth";
import { createPaymentSchema, type CreatePaymentInput } from "../schema";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Banknote } from "lucide-react";

export function CreatePaymentDialog() {
  const [open, setOpen] = useState(false);
  const { createPayment, isCreating } = usePayments();
  const { household } = useHousehold();
  const { user } = useAuth();

  const form = useForm<
    z.input<typeof createPaymentSchema>,
    unknown,
    CreatePaymentInput
  >({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      toUserId: undefined,
      amount: 0,
    },
  });

  const onSubmit = (data: CreatePaymentInput) => {
    createPayment(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  // Filter out current user from recipients
  const recipients = household?.members.filter((m) => m.id !== user?.id) || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Banknote className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogDescription>
            Record a payment you made to another household member.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="toUserId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid To</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {recipients.map((member) => (
                        <SelectItem
                          key={member.id}
                          value={member.id.toString()}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      value={
                        typeof field.value === "number" ||
                        typeof field.value === "string"
                          ? field.value
                          : ""
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : val);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? "Recording..." : "Record Payment"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
