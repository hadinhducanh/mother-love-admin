import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";
import { ProductColumn } from "./columns";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { productSchema } from "@/schema/productSchema";
import EditDialog from "../product-detail/edit-dialog";
import axios from "axios";
import Cookies from "js-cookie";
import { AlertModal } from "@/components/modal/alert-modal";
import { useToast } from "@/components/ui/use-toast";
import { refreshTokenIfNeeded } from "@/pages/Auth/auth";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const navigate = useNavigate();
  const { toast } = useToast();
  const url = "http://localhost:8080/api/v1/product/delete/";
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const product = productSchema.parse(data);

  const onConfirm = async () => {
    setLoading(true);
    try {
      const isTokenValid = await refreshTokenIfNeeded();
      if (!isTokenValid) {
        toast({
          title: "Session expired. Please login again.",
        });
        navigate("/login");
        return;
      }

      const currentAccessToken = Cookies.get("accessToken");
      await axios.delete(url + `${data.productId}`, {
        headers: {
          Authorization: `Bearer ${currentAccessToken}`,
        },
      });
      toast({
        title: "Product deleted successfully!",
      });
      window.location.reload();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: errorMessage,
      });
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleEditClick = () => {
    setDialogContent(<EditDialog product={product} />);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(data.productId.toString())
              }
            >
              <Icons.copy className="mr-2 h-4 w-4" />
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild onClick={handleEditClick}>
              <DropdownMenuItem>
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="text-red-600"
            >
              <Icons.delete className="mr-2 h-4 w-4" />
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
