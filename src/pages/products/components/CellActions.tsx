import { useState } from "react";
import EditDialog from "../dialogs/edit-dialog";
import ViewDialog from "../dialogs/view-dialog";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Copy } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { DialogContent } from "@radix-ui/react-dialog";
import DeleteDialog from "../dialogs/delete-dialog";
import { DataTableRowActionsProps, paymentSchmea } from "./cell-action";

export function CellActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const payment = paymentSchmea.parse(row.original);

  const handleViewClick = () => {
    setDialogContent(<ViewDialog payment={payment} />);
  };

  const handleEditClick = () => {
    setDialogContent(<EditDialog payment={payment} />);
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.areaId)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          {/* </DialogTrigger> */}
          {/* <DialogTrigger asChild onClick={handleEditClick}> */}
          <DropdownMenuItem>
            <Icons.edit className="mr-2 h-4 w-4" />
            Edit Details
          </DropdownMenuItem>
          {/* </DialogTrigger> */}
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Icons.delete className="mr-2 h-4 w-4" />
            Delete Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      <DeleteDialog
        payment={payment}
        isOpen={showDeleteDialog}
        showActionToggle={setShowDeleteDialog}
      />
    </>
  );
}
