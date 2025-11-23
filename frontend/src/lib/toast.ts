import toast from "react-hot-toast";

// Toast wrapper with consistent styling and behavior
export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(description ? `${message}\n${description}` : message, {
      duration: 3000,
      icon: "✓",
    });
  },

  error: (message: string, description?: string) => {
    toast.error(description ? `${message}\n${description}` : message, {
      duration: 4000,
      icon: "✕",
    });
  },

  loading: (message: string) => {
    return toast.loading(message);
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: Error) => string);
    }
  ) => {
    return toast.promise(promise, messages);
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },
};

export { toast };
