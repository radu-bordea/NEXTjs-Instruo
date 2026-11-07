// components/companies/DeleteCompanyButton.tsx
"use client";

import { Trash2 } from "lucide-react";
import { deleteCompany } from "@/actions/companies";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteCompanyButton({ id, name }: { id: string; name: string }) {
  // bind fixes the id: the form calls deleteCompany(id)
  const deleteThis = deleteCompany.bind(null, id);

  return (
    <AlertDialog>
      {/* Base UI: render instead of asChild */}
      <AlertDialogTrigger render={<Button variant="outline" />}>
        <Trash2 className="size-4" />
        Șterge
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ștergi firma „{name}”?</AlertDialogTitle>
          <AlertDialogDescription>
            Se vor șterge și toți angajații și fișele lor de instruire. Acțiunea nu poate fi anulată.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anulează</AlertDialogCancel>
          {/* A real form, so the server action runs on submit */}
          <form action={deleteThis}>
            <Button type="submit" variant="destructive">Da, șterge</Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}