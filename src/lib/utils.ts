import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as crypto from "crypto";
import PusherServer from "pusher";
import PusherClient from "pusher-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encryptionHandler = (message: string) => {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync("my secret key", "salt", 32);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(message, "utf8", "hex");
  return (encrypted += cipher.final("hex"));
};

export const decryptionHandler = (cipher: string) => {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync("my secret key", "salt", 32);
  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(cipher, "hex", "utf8");
  return (decrypted += decipher.final("utf8"));
};

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  cluster: "mt1",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  {
    cluster: "mt1",
  }
);

export const postToParent = (message: string) => {
  window.parent.postMessage(message, "*");
};

export const extractEmailsFromString = (text: string) => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
};

export const extractURLfromString = (url: string) => {
  return url.match(/https?:\/\/[^\s"<>]+/);
};

export const extractUUIDFromString = (url: string) => {
  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  );
};

export const getMonthName = (month: number) => {
  return month == 1
    ? "Jan"
    : month == 2
    ? "Feb"
    : month == 3
    ? "Mar"
    : month == 4
    ? "Apr"
    : month == 5
    ? "May"
    : month == 6
    ? "Jun"
    : month == 7
    ? "Jul"
    : month == 8
    ? "Aug"
    : month == 9
    ? "Sep"
    : month == 10
    ? "Oct"
    : month == 11
    ? "Nov"
    : month == 12 && "Dec";
};
