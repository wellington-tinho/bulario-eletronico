import { useFetch } from "./hooks/useFetch";
import { MedicationData } from "./shared/types/dotlib";

function App() {

  const { data, isError, isFetching, isLoading } = useFetch<MedicationData[]>('data'); // fetch data from API using react-query

  return (
    <div>
      <h1>Bulario eletronico</h1>
      {
        isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error</p>
        ) : isFetching ? (
          <p>Updating...</p>
        ) : (
          <ul>
            {data?.map((medication) => (
              <li key={medication.id}>
                <h2>{medication.name}</h2>
                <p>{medication.company}</p>
                <ul>
                  {medication.documents.map((document) => (
                    <li key={document.id}>
                      <a href={document.url}>{document.expedient}</a>
                    </li>
                  ))}
                </ul>
                <ul>
                  {medication.active_principles.map((activePrinciple) => (
                    <li key={activePrinciple.id}>{activePrinciple.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )
      }

    </div>
  )
}

export default App
