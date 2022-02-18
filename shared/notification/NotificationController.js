import { buildNotificationView } from "./NotificationView.js";
import { pubSub } from "../pubSub.js";

export class NotificationController {
  constructor(notificationElement) {
    this.notificationElement = notificationElement;

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    pubSub.subscribe(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, (message) => {
      this.show(message);
    });
  }

  show(message) {
    const noticationTemplate = buildNotificationView(message);

    this.notificationElement.innerHTML = noticationTemplate;

    const closeButtonelement = this.notificationElement.querySelector("button");

    closeButtonelement.addEventListener("click", (event) => {
      this.notificationElement.innerHTML = "";
    });
  }
}
