import { getSpeakers } from "@/app/services/speakerService";
import SpeakerExplorer from "@/app/components/SpeakerExplorer";

export const metadata = {
  title: "Intervenants — EventSync",
  description: "Découvrez nos experts et conférenciers",
};

export default async function SpeakersPage() {
  const speakers = await getSpeakers();
  return <SpeakerExplorer speakers={speakers} />;
}