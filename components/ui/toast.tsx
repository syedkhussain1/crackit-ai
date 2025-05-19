import * as React from "react"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription, 
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

interface ToastProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  description?: string
  type?: "success" | "error" | "info"
  duration?: number
}

export function Toast({
  open,
  setOpen,
  title,
  description,
  type = "info",
  duration = 3000,
}: ToastProps) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [open, duration, setOpen])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-sm fixed top-4 right-4 z-50 shadow-lg">
        <AlertDialogHeader className="flex-row items-start gap-3">
          {getIcon()}
          <div>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Dismiss</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function useToast() {
  const [open, setOpen] = React.useState(false)
  const [toastProps, setToastProps] = React.useState<Omit<ToastProps, "open" | "setOpen">>({
    title: "",
  })

  const toast = React.useCallback(
    (props: Omit<ToastProps, "open" | "setOpen">) => {
      setToastProps(props)
      setOpen(true)
    },
    []
  )

  return {
    toast,
    ToastComponent: (
      <Toast open={open} setOpen={setOpen} {...toastProps} />
    ),
  }
} 