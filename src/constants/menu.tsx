import { ChatIcon } from "@/icons/chat-icon";
import { HelpDeskIcon } from "@/icons/help-desk-icon";
import {
  Clock,
  CreditCard,
  Inbox,
  LayoutDashboard,
  Mail,
  MessageSquareMore,
  Settings,
  Settings2,
  SquareUser,
  Star,
} from "lucide-react";

type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: JSX.Element;
  path: string;
};

type TABS_MENU_PROPS = {
  label: string;
  icon?: JSX.Element;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    path: "dashboard",
  },
  {
    label: "Conversations",
    icon: <MessageSquareMore />,
    path: "conversation",
  },
  {
    label: "Integrations",
    icon: <Settings2 />,
    path: "integration",
  },
  {
    label: "Settings",
    icon: <Settings />,
    path: "settings",
  },
  {
    label: "Appointments",
    icon: <SquareUser />,
    path: "appointment",
  },
  {
    label: "Email Marketing",
    icon: <Mail />,
    path: "email-marketing",
  },
];

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "unread",
    icon: <Inbox />,
  },
  {
    label: "all",
    icon: <Inbox />,
  },
  {
    label: "expired",
    icon: <Clock />,
  },
  {
    label: "starred",
    icon: <Star />,
  },
];

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "help desk",
  },
  {
    label: "questions",
  },
];

export const APPOINTMENT_TABLE_HEADER = [
  "Name",
  "RequestedTime",
  "Added Time",
  "Domain",
];

export const EMAIL_MARKETING_HEADER = ["Id", "Email", "Answers", "Domain"];

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "chat",
    icon: <ChatIcon />,
  },
  {
    label: "helpdesk",
    icon: <HelpDeskIcon />,
  },
];
