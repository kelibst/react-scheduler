import React, { useEffect } from "react";
import classNames from "classnames";
import ReactDOM from "react-dom";

interface NotificationProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  danger: boolean
}

const Notification: React.FC<NotificationProps> = ({ message, visible, onClose, danger }) => {
  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [visible, onClose]);

  const notificationClasses = classNames(
    "fixed",
    "right-2",
    "top-3",
    "p-3",
    "text-white",
    "rounded-md",
    "shadow-lg",
    "transition-all",
    "font-bold",
    "bg-green-500",
    {
      "opacity-0": !visible,
      "translate-y-full": !visible,
      // "bg-green-500": !danger,
      // "bg-red-500": danger
    }
  );
  return ReactDOM.createPortal(
    <div className={notificationClasses}>
      <p>{message}</p>
    </div>,
    document.body
  );
};

export default Notification;
