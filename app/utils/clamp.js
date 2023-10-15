export function clamp(num, min, max) {
    let tempNum = num;
  
    if (tempNum > max) {
      tempNum = max;
    } else if (tempNum < min) {
      tempNum = min;
    }
  
    return tempNum;
  }