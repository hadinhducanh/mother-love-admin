import { z } from "zod";
// import { PaymentType } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { statuses } from "@/components/ShadcnDataTable/filters";
import { CategoryType } from "@/schema/categorySchema";
import React from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface Category {}

interface ManageCategoryForm {}

const editSchema = z.object({
  categoryId: z.coerce.number().refine((value) => value > 0, {
    message: "Category Required.",
  }),
  categoryName: z.string().min(1, { message: "Category Name Required" }),
});

type editSchemaType = z.infer<typeof editSchema>;

export const AddCategory: React.FC<ManageCategoryForm> = () => {
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      categoryId: 0,
      categoryName: "",
    },
  });

  function onSubmit(values: editSchemaType) {
    console.log(values);
  }
  return (
    <div>
      <div className="mt-2">
        <Heading
          title={"Create new category"}
          description={"Add a new category"}
        />
      </div>
      <Separator />
      <div className="py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="ml-auto">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
