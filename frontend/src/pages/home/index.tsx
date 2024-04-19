import { useFetch } from "../../hooks/useFetch";
import { MedicationData } from "../../shared/types/dotlib";
import styles from "./styles.module.sass";

export default function Home() {

  const { data, isError, isFetching, isLoading } = useFetch<MedicationData[]>('data'); // fetch data from API using react-query

  return (
    <div className={styles.Container}>
      <h1>Bulario eletronico</h1>
      {
        isLoading ? (
          <p className={styles.Loading}>Carregando...</p>
        ) : isError ? (
          <p className={styles.Error}>Ocorreu um erro</p>
        ) : isFetching ? (
          <p className={styles.Updating}>Atualizando...</p>
        ) : (
          <ul className={styles.List}>
            {data?.map((medication) => (
              <li key={medication.id}  className={styles.Item}>
                <h2>{medication.name}</h2>
                <p>{medication.company}</p>
                <ul className={styles.Documents}>
                  {medication.documents.map((document) => (
                    <li key={document.id}>
                      <a href={document.url}>{document.expedient}</a>
                    </li>
                  ))}
                </ul>
                <ul className={styles.ActivePrinciples}>
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

