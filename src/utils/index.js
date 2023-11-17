import InputChangeSound from "../assets/inputChangeSound.mp3";
import ErrorMessageSound from "../assets/errorMessage.ogg";

export function playInputChangeSound() {
  const audio = new Audio(InputChangeSound);
  audio.play();
}

export function playErrorSound() {
  const audio = new Audio(ErrorMessageSound);
  audio.play();
}

export const GreetOnLogin = (text) => {
  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    window.speechSynthesis.speak(speech);
  } else {
    console.error("Speech synthesis not supported");
  }
};

// For handle api events.
export const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};
