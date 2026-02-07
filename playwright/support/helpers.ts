export function generateOrderCode() {
    const prefix = 'VLO';
  
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
  
    const randomLetter = () =>
      letters.charAt(Math.floor(Math.random() * letters.length));
  
    const randomNumber = () =>
      numbers.charAt(Math.floor(Math.random() * numbers.length));
  
    const part =
      randomLetter() +
      randomNumber() +
      randomNumber() +
      randomNumber() +
      randomLetter() +
      randomLetter();
  
    return `${prefix}-${part}`;
  }
  