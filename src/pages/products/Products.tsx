import { ShadDataTable } from "@/components/ShadcnDataTable/data-table";

import { useState, useEffect } from "react";
import { columns } from "./components/columns";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { useNavigate } from "react-router-dom";

interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  status: number;
  image: string;
  category: {
    categoryId: number;
    categoryName: string;
  };
  brand: {
    brandId: number;
    brandName: string;
    image: string;
  };
}

interface FetchProductsResponse {
  data: Product[];
  total: number;
  content: Product[];
}

const fetchProducts = async (
  pageNo: number,
  pageSize: number,
  sortBy: string,
  sortDir: "asc" | "desc"
): Promise<FetchProductsResponse> => {
  const response = await axios.get(`http://localhost:8080/api/v1/product`, {
    params: {
      pageNo,
      pageSize,
      sortBy,
      sortDir,
    },
  });
  return response.data;
};

export const Products = () => {
  const [data, setData] = useState<Product[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("productId");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [totalRows, setTotalRows] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchProducts(pageNo, pageSize, sortBy, sortDir);
        setData(result.content); // Assuming the data is in the `data` field of the response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [pageNo, pageSize, sortBy, sortDir]);
  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <Heading
          title={`Product (${Object.keys(data).length})`}
          description="Manage Product in the shop"
        />

        <Button onClick={() => navigate("/newProduct")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="containerS mx-auto py-4">
        <ShadDataTable columns={columns} data={data} searchKey="productName" />
      </div>
    </>
  );
};
