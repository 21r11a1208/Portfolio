import { Metadata } from "next";
import { ArattaiRCA } from "./ArattaiRCA";

export const metadata: Metadata = {
  title: "Arattai RCA — B Anish",
  description: "Root cause analysis of Zoho's Arattai — an Indian messaging app that hit #1 in downloads then lost 99% of its user base within 8 weeks.",
};

export default function ArattaiRCAPage() {
  return <ArattaiRCA />;
}
