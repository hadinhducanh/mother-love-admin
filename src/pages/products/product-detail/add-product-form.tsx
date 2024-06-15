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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { statuses } from "@/components/ShadcnDataTable/filters";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useState } from "react";
import toast, { useToaster } from "react-hot-toast";

// type EditProps = {
//   product: ProductType;
// };

interface Product {}

interface ManageProductForm {}

const editSchema = z.object({
  productId: z.number(),
  productName: z.string().min(1, { message: "Product Name Required" }),
  description: z.string(),
  price: z.coerce.number().refine((value) => value > 0, {
    message: "Price must be greater than 0.",
  }),
  status: z.number(),
  image: z.string(),
  categoryId: z.coerce.number().refine((value) => value > 0, {
    message: "Category Required.",
  }),
  brandId: z.coerce.number().refine((value) => value > 0, {
    message: "Brand Required.",
  }),
});

type editSchemaType = z.infer<typeof editSchema>;

export const AddProduct: React.FC<ManageProductForm> = () => {
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      productId: 0,
      productName: "",
      description: "",
      price: 0,
      status: 1,
      image: "",
      categoryId: 0,
      brandId: 0,
    },
  });

  const onSubmit = async (values: editSchemaType) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/product",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0dnR2YW4iLCJpYXQiOjE3MTgzNzgxOTMsImV4cCI6MTcxODQ2NDU5M30.tk0mwpZAI8AFZkOevF4nNrHN0nPo8bYMvSA9errHLTw3s4XGzg-2a2cnQuU2-Bj2"
            )}`,
          },
        }
      );
      toast.success("Create new Product successfully!");
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const refreshResponse = await axios.post(
            "http://localhost:8080/api/v1/auth/refresh_token",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0dnR2YW4iLCJpYXQiOjE3MTgzNzgxOTMsImV4cCI6MTcxODk4Mjk5M30.voo2Ue5H_LDyykV0Xm9ObModBGzRwHMmxRNe_MBPlvWpWt7kv5KC3FabutOYX4Hi"
                )}`,
              },
            }
          );
          localStorage.setItem(
            "access_token",
            refreshResponse.data.access_token
          );
          localStorage.setItem(
            "refresh_token",
            refreshResponse.data.refresh_token
          );
          onSubmit(values); // Retry original request
        } catch (refreshError: any) {
          toast.error("Failed to refresh token. Please log in again.");
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        toast.error("Failed to create product.");
        console.error("Error adding product:", error);
      }
    }
  };

  return (
    <div>
      <div className="mt-2">
        <Heading
          title={"Create new product"}
          description={"Add a new product"}
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
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Status to Update" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {statuses.map((status, index) => (
                            <SelectItem key={index} value={status.value}>
                              <span className="flex items-center">
                                <status.icon className="mr-2 h-5 w-5 text-muted-foreground" />
                                {status.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
