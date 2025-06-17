export class Colors {
  static pathColor = "white";
  static lineColor = "white";
  static wallColor = "black";
  static startColor = "green";
  static endColor = "red";
  static visitedColor = "gray";
  static resultColor = "blue";

  static colors = [
    this.pathColor,
    this.wallColor,
    this.startColor,
    this.endColor,
  ]
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}