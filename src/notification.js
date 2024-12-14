import { notification } from "antd";
export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message, type = "error") => {
    api[type]({
      message: "Уведомление",
      description: message,
    });
  };
  return { contextHolder, openNotificationWithIcon };
};
