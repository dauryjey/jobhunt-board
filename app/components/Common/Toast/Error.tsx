import { Toast, ToastToggle } from "flowbite-react";
import { HiExclamation } from "react-icons/hi/index.js";

interface ErrorProps {
  error: boolean;
}

export const ErrorToast: React.FC<ErrorProps> = ({ error }: ErrorProps) => {
  return (
    <>
      {error && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            It seems something went wrong. Please try again.
          </div>
          <ToastToggle />
        </Toast>
      )}
    </>
  );
};
