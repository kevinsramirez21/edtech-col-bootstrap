import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AssociateForm } from "./associate-form"
import { Associate } from "@/types/associate"

interface AssociateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  associate?: Associate | null
  isLoading: boolean
}

export function AssociateModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  associate, 
  isLoading 
}: AssociateModalProps) {
  const isEditing = !!associate

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Asociado" : "Agregar Nuevo Asociado"}
          </DialogTitle>
        </DialogHeader>
        <AssociateForm
          initialData={associate || undefined}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}