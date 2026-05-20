'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
    const searchParams = useSearchParams();

    const [value, setValue] = useState(initialValue);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isInternalChange = useRef(false);

    useEffect(() => {
        const urlQuery = searchParams.get('q') || '';
        if (urlQuery !== value && !isInternalChange.current) {
            setValue(urlQuery);
        }
        isInternalChange.current = false;
    }, [value, searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        isInternalChange.current = true;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (newValue) {
                params.set('q', newValue);
            } else {
                params.delete('q');
            }

            params.delete('page');
            router.push(`${pathname}?${params.toString()}`);
        }, 300);
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