import { toast as baseToast } from "@/hooks/use-toast";

type ToastFunction = typeof baseToast;

interface ToastUtils extends ToastFunction {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const toast = baseToast as ToastUtils;

toast.success = (title: string, description?: string) => {
  baseToast({
    title,
    description,
    className: "bg-green-600 text-white border-none",
  });
};

toast.error = (title: string, description?: string) => {
  baseToast({
    title,
    description,
    variant: "destructive",
  });
};

toast.warning = (title: string, description?: string) => {
  baseToast({
    title,
    description,
    className: "bg-yellow-500 text-white border-none",
  });
};

toast.info = (title: string, description?: string) => {
  baseToast({
    title,
    description,
    className: "bg-blue-500 text-white border-none",
  });
};

export { toast };
