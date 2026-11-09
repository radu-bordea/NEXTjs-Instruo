// components/ConfirmDeleteButton.tsx
// Generic delete with confirmation. The page passes an already-bound server action.
"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  action: () => Promise<void>; // e.g. deleteEmployee.bind(null, companyId, employeeId)
  title: string;
  description: string;
  label?: string;              // button text; empty → icon only
};

export default function ConfirmDeleteButton({ action, title, description, label }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline" size={label ? "default" : "icon"} aria-label={label ?? "Șterge"} />}
      >
        <Trash2 className="size-4" />
        {label}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anulează</AlertDialogCancel>
          <form action={action}>
            <Button type="submit" variant="destructive">Da, șterge</Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}