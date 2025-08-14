export interface Message {
  sender: "bot" | "user";
  text: string;
  showBreathingButton?: boolean;
}
