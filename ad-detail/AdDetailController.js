import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import AdService from "../ad-list/AdService.js";
import { buildAdDetailView } from "../ad-list/AdView.js";
import { decodeToken } from "../utils/decodeToken.js";

export class AdDetailController {
  constructor(adDetailElement) {
    this.adDetailElement = adDetailElement;
    this.ad = null;
  }

  async showAd(adId) {
    if (!adId) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Id del anuncio no válido"
      );

      return;
    }

    try {
      this.ad = await AdService.getAd(adId);
      const adTemplate = buildAdDetailView(this.ad);
      this.adDetailElement.innerHTML = adTemplate;

      this.handleDeleteButton();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

  handleDeleteButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      // decodificamos token
      const userInfo = decodeToken(loggedUserToken);

      // comprobamos si el id de usuario logado es el mismo que el id del creador del ad
      const isOwner = this.isAdOwner(userInfo.userId);
      console.log(isOwner);

      // pintamos botón
      if (isOwner) {
        this.drawDeleteButton();
      }
    }
  }

  isAdOwner(userId) {
    return userId === this.ad.userId;
  }

  drawDeleteButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Borrar Anuncio";

    this.adDetailElement.appendChild(buttonElement);

    this.adDetailElement.addEventListener("click", () => {
      this.deleteAd();
    });
  }

  async deleteAd() {
    const shouldDelete = window.confirm("Estás seguro de borrar el anuncio?");

    if (shouldDelete) {
      try {
        await AdService.deleteAd(this.ad.id);
        window.location.href = "/";
      } catch (error) {
        pubSub.publish(
            pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error
            );
      }
    }
  }
}
