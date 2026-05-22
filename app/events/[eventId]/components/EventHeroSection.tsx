import { Calendar, Clock, MapPin } from "lucide-react";

interface EventHeroSectionProps {
    title: string;
    isLive: boolean;
    startDate: string;
    endDate: string;
    location: string;
    imageUrl?: string;
}

function formatDateRange(startDateStr: string, endDateStr: string): string {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = start.toLocaleDateString('fr-FR', { month: 'long' });
    const year = start.getFullYear();

    return `${startDay} - ${endDay} ${month} ${year}`;
}

function formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

export const EventHeroSection = ({ title, isLive, startDate, endDate, location, imageUrl }: EventHeroSectionProps) => {

    const words = title.split(" ");
    const mainTitle = words.slice(0, 2).join(" ");
    const subTitle = words.slice(2).join(" ");

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 md:items-center">

            <div className="relative rounded-lg overflow-hidden h-56 sm:h-64 md:h-48 lg:h-56 w-full">
                <img
                    src={imageUrl || "/tech-summit-conference-crowd-stage-purple-hero.png"}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {isLive && (
                    <div
                        className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold"
                        style={{
                            backgroundColor: "rgba(34, 197, 94, 0.25)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            color: "#22c55e",
                        }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        EN COURS
                    </div>
                )}
            </div>

            <div className="flex flex-col justify-center">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-event-text uppercase leading-tight mb-4">
                    {mainTitle}
                    <br />
                    <span className="text-event-primary">{subTitle}</span>
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-8">
                    <div className="flex items-center gap-3">
                        <Calendar className="text-event-primary shrink-0" size={22} />
                        <div>
                            <p className="text-event-muted text-xs sm:text-sm mb-1">DATE</p>
                            <p className="text-event-text font-semibold text-sm sm:text-base">{formatDateRange(startDate, endDate)}</p>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-10 bg-event-border/50" />

                    <div className="flex items-center gap-3">
                        <Clock className="text-event-primary shrink-0" size={22} />
                        <div>
                            <p className="text-event-muted text-xs sm:text-sm mb-1">HEURE</p>
                            <p className="text-event-text font-semibold text-sm sm:text-base">{formatTime(startDate)} - {formatTime(endDate)}</p>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-10 bg-event-border/50" />

                    <div className="flex items-center gap-3">
                        <MapPin className="text-event-primary shrink-0" size={22} />
                        <div>
                            <p className="text-event-muted text-xs sm:text-sm mb-1">LIEU</p>
                            <p className="text-event-text font-semibold text-sm sm:text-base">{location}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

};