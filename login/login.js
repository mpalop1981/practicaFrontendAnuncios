import { LoginController } from "./LoginController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginFormElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const loginController = new LoginController(loginFormElement);
});
