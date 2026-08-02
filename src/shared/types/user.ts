
export interface User {
  id:                 string;
  createdAt:          Date;
  updatedAt:          Date;
  username:           string;
  discordWebhookUrl:  string | null;
  discordEnabled:     boolean;
}
