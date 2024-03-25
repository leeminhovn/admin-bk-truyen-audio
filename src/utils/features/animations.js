export function increaseNumber(targetNumber, duration, onUpdate, onComplete) {
  const increment = targetNumber / duration;
  let currentValue = 0;

  const intervalId = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetNumber) {
      currentValue = targetNumber;
      clearInterval(intervalId);
      if (onComplete) {
        onComplete();
      }
    }
    onUpdate(Math.floor(currentValue));
  }, duration / Math.abs(targetNumber));
}
