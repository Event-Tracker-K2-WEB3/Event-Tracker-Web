import SessionPageLoader from "./_components/SessionPageLoader";

export default function Loading() {
  return (
    <SessionPageLoader
      title="Loading sessions"
      subtitle="Fetching the conference sessions."
    />
  );
}