'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "../components/ui/input-group";

const LocationSearch = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get('location') || '');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isInternalChange = useRef(false);

    useEffect(() => {
        const urlLocation = searchParams.get('location') || '';
        if (urlLocation !== value && !isInternalChange.current) {
            setValue(urlLocation);
        }
        isInternalChange.current = false;
    }, [searchParams, value]);

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
                params.set('location', newValue);
            } else {
                params.delete('location');
            }
            
            params.delete('page');
            router.push(`${pathname}?${params.toString()}`);
        }, 300);
    };

    return (
        <InputGroup className="dark bg-background max-w-md rounded-md overflow-hidden border-border focus-within:border-event-primary focus-within:ring-1 focus-within:ring-event-primary/50 transition-all">
            <InputGroupInput 
                placeholder="Search for a city..."
                value={value}
                onChange={handleChange}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};

export default LocationSearch;