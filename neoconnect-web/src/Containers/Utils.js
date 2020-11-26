import { store } from 'react-notifications-component';

export const showNotif = (error, title, msg) => {
  store.addNotification({
    title: title,
    message: msg ? msg : "Veuillez essayer ultérieurement.",
    type: error ? "danger" : "success",
    insert: "top",
    container: "top-right",
    pauseOnHover: true,
    isMobile: true,
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 7000,
      onScreen: true,
      showIcon: true
    }
  });
}

export const themeVal = ['', 'Mode', 'Cosmétique', 'High tech', 'Nourriture', 'Jeux Vidéo', 'Sport/Fitness'];

export const emailValid = (email) => {
  if (!RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").test(email)) {
    return (false);
  }
  return (true);
}
