import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"

const DATE_OPTIONS = [
    { id: "all", label: "Tous" },
    { id: "today", label: "Aujourd'hui" },
    { id: "week", label: "Cette semaine" },
    { id: "month", label: "Ce mois-ci" },
] as const;

interface DateFiltersProps {
    onDateChange: (value: string) => void;
}

export const DateFilters: React.FC<DateFiltersProps> = ({ onDateChange }) => {
    return (
        <RadioGroup
            defaultValue="all"
            onValueChange={onDateChange}
            className="flex flex-col gap-4"
        >
            {DATE_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 group">
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