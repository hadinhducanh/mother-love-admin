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
import { toast } from "react-hot-toast";
import { ProductColumn } from "./columns";
import { useParams, useNavigate } from "react-router-dom";
// import ViewDialog from "../dialogs/view-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { productSchema } from "@/schema/productSchema";
import EditDialog from "../product-detail/edit-dialog";
// import ViewDialog from "../dialogs/view-dialog";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const params = useParams();
  const navigate = useNavigate();
  const product = productSchema.parse(data);

  const onConfirm = async () => {
    try {
      setLoading(true);
      // await axios.delete(url + `${data.productId}`);
      toast.success("Product deleted.");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response.data.title);
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // const handleViewClick = () => {
  //   setDialogContent(<ViewDialog product={product} />);
  // };
  const handleEditClick = () => {
    setDialogContent(<EditDialog product={product} />);
  };

  return (
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
          {/* <DialogTrigger asChild onClick={handleViewClick}>
            <DropdownMenuItem>
              {" "}
              <Icons.view className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DialogTrigger> */}
          <DialogTrigger asChild onClick={handleEditClick}>
            <DropdownMenuItem>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit Details
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={() => onConfirm()}
            className="text-red-600"
          >
            <Icons.delete className="mr-2 h-4 w-4" />
            Delete Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
    </Dialog>
  );
};
