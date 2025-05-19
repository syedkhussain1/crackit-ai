import { AreaChart, Layers, AppWindow, Upload, Building2 } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    label: "add job",
    href: "/add-job",
    icon: <Layers />,
  },
  {
    label: "jobs",
    href: "/jobs",
    icon: <AppWindow />,
  },
  {
    label: "interview gpt",
    href: "/interview-gpt",
    icon: <Upload />,
    },
  {
    label: "stats",
    href: "/stats",
    icon: <AreaChart />,
    },
];

export default links;