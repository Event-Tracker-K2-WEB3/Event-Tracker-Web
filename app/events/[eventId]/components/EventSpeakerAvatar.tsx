import { EventSpeaker } from "@/app/services/eventService";

interface EventSpeakerAvatarProps {
    speaker: EventSpeaker;
}

function getSpeakerPhotoSource(photo?: string | null): string | null {
    if (!photo) {
        return null;
    }

    if (
        photo.startsWith("/") ||
        photo.startsWith("http://") ||
        photo.startsWith("https://")
    ) {
        return photo;
    }

    return `/images/speakers/${photo}.jpg`;
}

export const EventSpeakerAvatar = ({ speaker }: EventSpeakerAvatarProps) => {
    const photoSource = getSpeakerPhotoSource(speaker.photo);
    const fallbackInitials = speaker.initials || speaker.name.charAt(0);

    return (
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/10">
            {photoSource ? (
                <img
                    src={photoSource}
                    alt={speaker.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-event-primary/20 text-sm font-bold text-event-primary">
                    {fallbackInitials}
                </div>
            )}
        </div>
    );
};