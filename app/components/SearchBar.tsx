import { Search } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "../components/ui/input-group";

interface SearchBarProps {
    onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    return (
        <InputGroup className="dark max-w-xs border-border focus-within:border-event-primary focus-within:ring-1 focus-within:ring-event-primary/50 transition-all">
            <InputGroupInput placeholder="Rechercher un événement, un sujet..." />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    )
}

export default SearchBar