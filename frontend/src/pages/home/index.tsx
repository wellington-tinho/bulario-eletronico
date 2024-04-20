import {useFetch} from "../../hooks/useFetch";
import {MedicationData} from "../../shared/types/dotlib";
import styles from "./styles.module.sass";
import {handleDownload} from "../../shared/utils/handleDownload.ts";
import { FontSizeChanger } from "../../components/FontSizeChanger/index.tsx";
import { HandleThemeSwitcher } from "../../components/HandleThemeSwitcher/index.tsx";
import { FormatDate } from "../../shared/utils/formatDate.ts";
import { FilterMedication } from "../../components/FilterMedication/index.tsx";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams] = useSearchParams();
  const medicationTerm = searchParams.get('medication');
  const companyTerm = searchParams.get('company');

  const url = 'data'; // url to fetch the data
  const keyToCache = `data-${medicationTerm}-${companyTerm}`; // key to cache the data
  const {data, isError, isFetching, isLoading} = useFetch<MedicationData[]>(url,keyToCache); // fetch data from the api
  const dataSorted = data?.sort((a, b) => a.name.localeCompare(b.name)); // sort data by name

  const dataFiltered = dataSorted?.filter((medication) => {
    const medicationLower = medication.name.toLowerCase();
    const companyLower = medication.company.toLowerCase();

     if (medicationTerm && companyTerm) {
      return medicationLower.includes(medicationTerm.toLowerCase()) && companyLower.toLowerCase().includes(companyTerm.toLowerCase())
    } else if (medicationTerm) {
      return medicationLower.includes(medicationTerm.toLowerCase())
    }
    else if (companyTerm) {
      return companyLower.toLowerCase().includes(companyTerm.toLowerCase())
    }
    return dataSorted;
  })


  return (
    <div className={styles.Container}>
      <h1>Bulário Eletrônico</h1>
      {
        isLoading ? ( <p className={styles.Loading}>Carregando dados...</p> ) :
        isError ? ( <p className={styles.Error}>Ocorreu um erro ao carregar os dados</p> ) :
        isFetching ? ( <p className={styles.Updating}> Atualizando dados... </p> ) :
        (
          <div className={styles.DrugFormulary}>

            <div className={styles.Header}>
              <FilterMedication/>

              <div className={styles.Acsessibility}>
                <FontSizeChanger/>
                <HandleThemeSwitcher/>
              </div>
            </div>

            <div className={styles.TableContainer}>
              {medicationTerm || companyTerm ? (
                <h2>
                  Resultados obtidos: 
                  <strong>{' '+dataFiltered?.length}</strong>
                </h2>
              ) : (
                <h2>
                 Lista de Medicamentos
                </h2>
              )
            }
              <div className={styles.Table}>
                  
                <table>
                  <thead>
                    <tr>
                      <th>Medicamento</th>
                      <th>Empresa - CNPJ</th>
                      <th>Expediente</th>
                      <th>Data de Publicação</th>
                      <th>Bula do Paciente</th>
                      <th>Bula do Profissional</th>
                      <th>Princípio Ativos</th>
                    </tr>
                    </thead>
                  <tbody>

                  {dataFiltered?.map((medication) => (
                    <tr key={medication.id} className={styles.Item}>
                      <td>{medication.name}</td>{/*  Medicamento */}
                      <td>{medication.company}</td>{/*  Empresa - CNPJ */}
                      <td>{medication.documents[0].expedient}</td>{/*  Expediente */}
                      <td>{FormatDate(medication.published_at)}</td>{/*  Data de Publicação */}
                      <td className={styles.TableItemDoc}> {/*  Bula do Paciente */}
                        <a
                          href="#"
                          onClick={() => handleDownload(medication.documents[0].url, `Bula-${medication.name}-Paciente.pdf`)}>
                          <img src="assets/images/pdf.png" alt="Icone de PDF"/>
                        </a>
                      </td>
                      <td className={styles.TableItemDoc}> {/*  Bula do Profissional */}
                        <a
                          href="#"
                          onClick={() => handleDownload(medication.documents[1].url, `Bula-${medication.name}-Paciente.pdf`)}>
                          <img src="assets/images/pdf.png" alt="Icone de PDF"/>
                        </a>
                      </td>
                      <td className={styles.TableItemActives}> {/*  Principais Ativos */}
                        <ul>
                          {medication.active_principles.map((activePrinciple) => (
                            <li key={activePrinciple.id}>{activePrinciple.name}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

