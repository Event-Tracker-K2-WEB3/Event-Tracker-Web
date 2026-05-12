import SearchBar from "./SearchBar";

const EventFilterBlock = () => {
    const handleSearch = (term: string) => {

    };

    return (
        <section
            className="dark bg-event-bg w-full px-12 py-4">
            <div className="">
                <SearchBar onSearch={handleSearch} />
            </div>
        </section>
    )
}

export default EventFilterBlock