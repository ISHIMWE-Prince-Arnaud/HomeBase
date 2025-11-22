import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChores } from "@/hooks/useChores";
import { createChoreSchema, type CreateChoreInput } from "../schema";
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
// Actually I didn't install textarea. I'll use Input for description or install textarea.
// Let's use Input for now to be safe, or install textarea.
// I'll stick to Input for description for now.
import { useState } from "react";
import { Plus } from "lucide-react";
import { useHousehold } from "@/hooks/useHousehold";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ChoreFormValues = {
  title: string;
  description: string;
  dueDate: string;
  assignedToId?: number;
};

export function CreateChoreDialog() {
  const [open, setOpen] = useState(false);
  const { createChore, isCreating } = useChores();
  const { household } = useHousehold();

  const form = useForm<ChoreFormValues>({
    resolver: zodResolver(createChoreSchema) as Resolver<ChoreFormValues>,
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      assignedToId: undefined,
    },
  });

  const onSubmit = (data: ChoreFormValues) => {
    const parsed: CreateChoreInput = createChoreSchema.parse(
      data as z.input<typeof createChoreSchema>
    );

    createChore(parsed, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Chore
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Chore</DialogTitle>
          <DialogDescription>
            Create a new chore for your household.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Clean the kitchen" {...field} />
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
                    <Input placeholder="Optional details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignedToId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <Select
                    onValueChange={(val) =>
                      field.onChange(val ? Number(val) : undefined)
                    }
                    value={
                      field.value === undefined || field.value === null
                        ? ""
                        : String(field.value)
                    }>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unassigned" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {household?.members.map((member) => (
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
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Chore"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
