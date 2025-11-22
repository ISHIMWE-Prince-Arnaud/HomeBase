import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNeeds } from "@/hooks/useNeeds";
import { updateNeedSchema, type UpdateNeedInput } from "../schema";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import type { Need } from "../api";

interface UpdateNeedDialogProps {
  need: Need | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateNeedDialog({
  need,
  open,
  onOpenChange,
}: UpdateNeedDialogProps) {
  const { updateNeed, isUpdating } = useNeeds();

  const form = useForm<UpdateNeedInput>({
    resolver: zodResolver(updateNeedSchema),
    defaultValues: {
      name: "",
      quantity: "",
      category: "",
    },
  });

  useEffect(() => {
    if (open && need) {
      form.reset({
        name: need.name,
        quantity: need.quantity || "",
        category: need.category || "",
      });
    }
  }, [open, need, form]);

  const onSubmit = (data: UpdateNeedInput) => {
    if (!need) return;
    // Only send fields that have values
    const updateData: UpdateNeedInput = {};
    if (data.name && data.name !== need.name) updateData.name = data.name;
    if (data.quantity !== need.quantity) {
      updateData.quantity = data.quantity || undefined;
    }
    if (data.category !== need.category) {
      updateData.category = data.category || undefined;
    }

    if (Object.keys(updateData).length === 0) {
      onOpenChange(false);
      return;
    }

    updateNeed(
      { id: need.id, data: updateData },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  if (!need) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Update the details for <strong>{need.name}</strong>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Milk, Light bulbs..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="2 liters, 1 pack..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Groceries, Home..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Item"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

