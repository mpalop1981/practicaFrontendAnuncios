import { pubSub } from "../shared/pubSub.js";
import { signupService } from "./SignupService.js";

export class SignupController {
  constructor(formElement) {
    this.formElement = formElement;

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.onAnyInputChanged();
    this.onSubmitForm();
  }

  onAnyInputChanged() {
    const inputElements = Array.from(
      this.formElement.querySelectorAll("input")
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkIfAllInputsAreFilled(inputElements);
      });
    });
  }

  checkIfAllInputsAreFilled(inputElements) {
    const areAllInputsFilled = inputElements.every(
      (inputElement) => inputElement.value
    );

    if (areAllInputsFilled) {
      this.formElement.querySelector("button").removeAttribute("disabled");
    } else {
      this.formElement.querySelector("button").setAttribute("disabled", "");
    }
  }

  onSubmitForm() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.formElement);

      const username = formData.get("textInput");
      const passwordInput = formData.get("passwordInput");
      const passwordMatchInput = formData.get("passwordMatchInput");

      const arePasswordsEqual = this.checkIfPasswordsAreEqual(
        passwordInput,
        passwordMatchInput
      );

      if (!arePasswordsEqual) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "las contraseñas no son iguales"
        );
        return;
      }

      const isPasswordValid = this.checkIfPasswordMatchRegExp(passwordInput);

      if (!isPasswordValid) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "La contraseña debe contener sólo números o letras"
        );
        return;
      }

      this.createUser(username, passwordInput);
    });
  }

  checkIfPasswordsAreEqual(passwordInput, passwordMatchInput) {
    return passwordInput === passwordMatchInput;
  }

  checkIfPasswordMatchRegExp(password) {
    const passwordRegExp = new RegExp(/^[a-zA-Z0-9]*$/);

    return passwordRegExp.test(password);
  }

  async createUser(username, passwordInput) {
    try {
      await signupService.createUser(username, passwordInput);
      this.loginUser(username, passwordInput);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

  async loginUser(username, passwordInput) {
    try {
      await signupService.loginUser(username, passwordInput);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}