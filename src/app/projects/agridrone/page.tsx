import { Metadata } from "next";
import { AgriDronePRD } from "./AgriDronePRD";

export const metadata: Metadata = {
  title: "AgriDrone PRD — B Anish",
  description: "Product requirements document for a drone services marketplace connecting farmers with licensed operators.",
};

export default function AgriDronePage() {
  return <AgriDronePRD />;
}
