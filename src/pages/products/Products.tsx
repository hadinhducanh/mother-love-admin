import { ShadDataTable } from "@/components/ShadcnDataTable/data-table";

import { useState, useEffect } from "react";
import { z } from "zod";
import { columns } from "./components/columns";
import axios from "axios";
const paymentSchema = z.object({
  id: z.number(),
  amount: z.number(),
  status: z.enum(["backlog", "todo", "in progress", "done", "canceled"]),
  email: z.string(),
  fullName: z.string(),
});

type PaymentType = z.infer<typeof paymentSchema>;

async function getData(): Promise<PaymentType[]> {
  const res = await axios.get(
    "https://my.api.mockaroo.com/payment_info.json?key=f0933e60"
  );
  if (res.data === null) {
    throw new Error("Failed to fetch data");
  }

  return res.data;
}

export const Products = () => {
  const [paymentData, setPaymentData] = useState<PaymentType[]>([]);
  useEffect(() => {
    const data = async () => {
      const result = await getData();
      setPaymentData(result);
    };
    data();
  }, []);
  return (
    <>
      <div className="containerS mx-auto py-4">
        <ShadDataTable columns={columns} data={paymentData} />
      </div>
    </>
  );
};
