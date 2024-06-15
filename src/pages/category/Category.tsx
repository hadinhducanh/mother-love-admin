import { ShadDataTable } from "@/components/ShadcnDataTable/data-table";

import { useState, useEffect } from "react";
import { columns } from "./components/columns";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { useNavigate } from "react-router-dom";

interface Category {
  categoryId: number;
  categoryName: string;
}

interface FetchProductsResponse {
  data: Category[];
  total: number;
  content: Category[];
}

const fetchProducts = async (
  pageNo: number,
  pageSize: number,
  sortBy: string,
  sortDir: "asc" | "desc"
): Promise<FetchProductsResponse> => {
  const response = await axios.get(`http://localhost:8080/api/v1/categories`, {
    params: {
      pageNo,
      pageSize,
      sortBy,
      sortDir,
    },
  });
  return response.data;
};

export const Category = () => {
  const [data, setData] = useState<Category[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("categoryId");
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
          title={`Category (${Object.keys(data).length})`}
          description="Manage Category in the shop"
        />

        <Button onClick={() => navigate("/newCategory")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="containerS mx-auto py-4">
        <ShadDataTable columns={columns} data={data} searchKey="categoryName" />
      </div>
    </>
  );
};
