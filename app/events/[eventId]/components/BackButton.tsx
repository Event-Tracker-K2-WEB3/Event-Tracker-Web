import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const BackButton = () => {
    return (
        <Link
            href="/events"
            className="text-event-muted hover:text-event-primary transition m-6 inline-flex items-center gap-2"
        >
            <ArrowLeft size={16} />
            <span>Back to events</span>
        </Link>
    );
};