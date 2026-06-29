'use client'

import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { useRouter, useSearchParams } from "next/navigation";

const DATE_OPTIONS = [
    { id: "all", label: "All" },
    { id: "today", label: "Today" },
    { id: "week", label: "This week" },
    { id: "month", label: "This month" },
] as const;

export const DateFilters: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentDate = searchParams.get('date') || 'all';

    const handleDateChange = (date: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (date && date !== 'all') {
            params.set('date', date);
        } else {
            params.delete('date');
        }
        params.delete('page');
        router.push(`?${params.toString()}`);
    };

    return (
        <RadioGroup
            defaultValue={currentDate}
            onValueChange={handleDateChange}
            className="flex flex-col gap-4"
        >
            {DATE_OPTIONS.map((option, index) => (
                <div 
                    key={option.id} 
                    className={`flex items-center space-x-3 group animate-fade-up animation-delay-${600 + index * 50}`}
                >
                    <RadioGroupItem
                        value={option.id}
                        id={`date-${option.id}`}
                        className="border-event-border text-event-primary focus:ring-event-primary"
                    />

                    <Label
                        htmlFor={`date-${option.id}`}
                        className="text-sm font-medium text-event-muted group-hover:text-event-text cursor-pointer transition-colors"
                    >
                        {option.label}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    )
}