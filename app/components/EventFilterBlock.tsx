import SearchBar from "./SearchBar";

interface EventFilterBlockProps {
    initialSearch?: string;
}

const EventFilterBlock = ({ initialSearch = '' }: EventFilterBlockProps) => {
    return (
        <section className="dark bg-event-bg w-full px-12 py-4">
            <SearchBar initialValue={initialSearch} />
        </section>
    );
};

export default EventFilterBlock;