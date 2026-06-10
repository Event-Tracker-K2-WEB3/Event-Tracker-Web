import SearchBar from "./SearchBar";

interface EventFilterBlockProps {
    initialSearch?: string;
}

const EventFilterBlock = ({ initialSearch = '' }: EventFilterBlockProps) => {
    return (
        <section className="dark bg-event-bg w-full px-12 py-4 animate-fade-up animation-delay-300">
            <SearchBar initialValue={initialSearch} />
        </section>
    );
};

export default EventFilterBlock;