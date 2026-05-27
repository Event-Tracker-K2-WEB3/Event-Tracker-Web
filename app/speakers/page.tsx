import { getSpeakers } from "@/app/services/speakerService";
import SpeakerExplorer from "@/app/components/SpeakerExplorer";

export const metadata = {
  title: "Speakers — EventSync",
  description: "Discover our experts and speakers",
};

export default async function SpeakersPage() {
  const speakers = await getSpeakers();
  return <SpeakerExplorer speakers={speakers} />;
}