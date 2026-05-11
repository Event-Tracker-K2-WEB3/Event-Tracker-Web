import SearchBar from "./SearchBar";

const EventFilterBlock = () => {
    const handleSearch = (term: string) => {

    };

    return (
        <section
            className="bg-event-bg w-full px-12 py-4 mb-6 border-b border-border/50">
            <div className="">
                <SearchBar onSearch={handleSearch} />
            </div>
        </section>
    )
}

export default EventFilterBlock