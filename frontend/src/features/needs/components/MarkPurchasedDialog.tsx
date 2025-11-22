import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNeeds } from "@/hooks/useNeeds";
import { markPurchasedSchema, type MarkPurchasedInput } from "../schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { Need } from "../api";
import { useEffect } from "react";

interface MarkPurchasedDialogProps {
  need: Need | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MarkPurchasedDialog({
  need,
  open,
  onOpenChange,
}: MarkPurchasedDialogProps) {
  const { markPurchased, isMarkingPurchased } = useNeeds();

  const form = useForm<
    z.input<typeof markPurchasedSchema>,
    unknown,
    MarkPurchasedInput
  >({
    resolver: zodResolver(markPurchasedSchema),
    defaultValues: {
      createExpense: false,
      amount: 0,
      description: "",
    },
  });

  const createExpense = useWatch({
    control: form.control,
    name: "createExpense",
    defaultValue: false,
  });

  // Reset form when dialog opens/closes or need changes
  useEffect(() => {
    if (open) {
      form.reset({
        createExpense: false,
        amount: 0,
        description: need ? `Purchased ${need.name}` : "",
      });
    }
  }, [open, need, form]);

  const onSubmit = (data: MarkPurchasedInput) => {
    if (!need) return;
    markPurchased(
      { id: need.id, data },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark as Purchased</DialogTitle>
          <DialogDescription>
            Confirm purchase of <strong>{need?.name}</strong>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="createExpense"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Create Expense</FormLabel>
                    <FormDescription>
                      Automatically add this to household expenses.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {createExpense && (
              <>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Expense details..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isMarkingPurchased}>
              {isMarkingPurchased ? "Processing..." : "Confirm Purchase"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
