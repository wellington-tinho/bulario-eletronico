import {useFetch} from "../../hooks/useFetch";
import {MedicationData} from "../../shared/types/dotlib";
import styles from "./styles.module.sass";
import { useState } from 'react';
import {handleDownload} from "../../shared/utils/handleDownload.ts";
import { FontSizeChanger } from "../../components/FontSizeChanger/index.tsx";
import { HandleThemeSwitcher } from "../../components/HandleThemeSwitcher/index.tsx";
import { FormatDate } from "../../shared/utils/formatDate.ts";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const {data, isError, isFetching, isLoading} = useFetch<MedicationData[]>('data'); // fetch data from API using react-query

  const dataSorted = data?.sort((a, b) => a.name.localeCompare(b.name)); // sort data by name
  const dataSorted2 = dataSorted?.slice(0, 10); // get the first 10 items from the sorted data

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
            
              <search>
                <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  
                }}>
                  <input
                    type="search"
                    name="search"
                    placeholder="Digite aqui oque você procura"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit">Consultar</button>
                </form>
              </search>

              <div className={styles.Acsessibility}>
                <FontSizeChanger/>
                <HandleThemeSwitcher/>
              </div>
            </div>

            <div className={styles.TableContainer}>
              {!!searchTerm ? (
                <h2>
                  Resultados obtidos: 
                  <strong>{' '+dataSorted2?.length}</strong>
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

                  {dataSorted2?.map((medication) => (
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

