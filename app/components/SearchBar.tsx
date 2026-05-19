'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "../components/ui/input-group";

interface SearchBarProps {
    initialValue?: string;
}

const SearchBar = ({ initialValue = '' }: SearchBarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [value, setValue] = useState(initialValue);

    // Debounce pour éviter trop de requêtes
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams();
            if (value) {
                params.set('q', value);
            }
            router.push(`${pathname}?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timer);
    }, [value, router, pathname]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <InputGroup className="dark bg-background max-w-md rounded-md overflow-hidden border-border focus-within:border-event-primary focus-within:ring-1 focus-within:ring-event-primary/50 transition-all">
            <InputGroupInput 
                placeholder="Rechercher un événement, un sujet, une ville..."
                value={value}
                onChange={handleChange}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};

export default SearchBar;