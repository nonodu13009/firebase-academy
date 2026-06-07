import { levels } from "@/data/levels";
import NiveauContent from "./NiveauContent";

export function generateStaticParams() {
  return levels.map((level) => ({ niveau: level.slug }));
}

export default function NiveauPage() {
  return <NiveauContent />;
}
