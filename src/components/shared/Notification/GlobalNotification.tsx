import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export interface NotificationProps {
  message: string;
}

export function showSuccessNotification({ message }: NotificationProps) {
  notifications.show({
    title: "Uspjeh!",
    message: message,
    color: "teal",
    icon: <IconCheck size={18} />,
    autoClose: 4000,
    position: "top-right",
  });
}
