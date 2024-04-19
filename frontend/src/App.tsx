import { useFetch } from "./hooks/useFetch";
import { MedicationData } from "./shared/types/dotlib";

function App() {

  const { data, isError, isFetching, isLoading } = useFetch<MedicationData>('data'); // fetch data from API using react-query
  
  return (
    <>
        {/* Test to fetch data from API */}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {isFetching && <p>Fetching...</p>}
        {data && JSON.stringify(data)}
    </>
  )
}

export default App
