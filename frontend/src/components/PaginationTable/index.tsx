import { useSearchParams } from "react-router-dom";
import { IMedicationData } from "../../shared/types/dotlib";
import styles from "./styles.module.sass";

interface IPaginationTable {
  data: IMedicationData[] | undefined;
  pagination: number;
  page: number;
}

export function PaginationTable({data, pagination, page}:IPaginationTable) {
  const [_, setSearchParams] = useSearchParams();

  return (
    <>
      {data?.length! > pagination && (
        <div className={styles.Pagination}>
          <button
            className={styles.PaginationButton}
            onClick={() => setSearchParams(state => { 
              if(String(page - 1)) {
                state.set('page', String(page - 1));
              }
            return state;
            })
            }
            disabled={page === 0}
          >
            Anterior
          </button>
          <button
            className={styles.PaginationButton}
            onClick={() => setSearchParams(state => {
              state.set('page', String(page + 1));
              return state;
            })}
            disabled={(page + 1) * pagination >= data?.length!}
          >
            Próximo
          </button>
        </div>
      )}
    </>
  )
}
