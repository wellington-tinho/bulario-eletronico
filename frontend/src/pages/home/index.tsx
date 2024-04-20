import {useFetch} from "../../hooks/useFetch";
import {MedicationData} from "../../shared/types/dotlib";
import styles from "./styles.module.sass";
import { useState } from 'react';
import {handleDownload} from "../../shared/utils/handleDownload.ts";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const {data, isError, isFetching, isLoading} = useFetch<MedicationData[]>('data'); // fetch data from API using react-query
  const dataSorted = data?.sort((a, b) => a.name.localeCompare(b.name)); // sort data by name

  const dataSorted2 = dataSorted?.slice(0, 10); // get the first 10 items from the sorted data

  return (
    <div className={styles.Container}>
      <h1>Bulario eletronico</h1>
      {
        isLoading ? ( <p className={styles.Loading}>Carregando dados...</p> ) :
        isError ? ( <p className={styles.Error}>Ocorreu um erro ao carregar os dados</p> ) :
        isFetching ? ( <p className={styles.Updating}> Atualizando dados... </p> ) :
        (
          <div className={styles.DrugFormulary}>

            <div className="fontSize" id="fontSize">
              <a className="small" rel="10" href="#">A</a>
              <a className="medium" rel="13" href="#">A</a>
              <a className="big selected" rel="16" href="#">A</a>
              <span>Tamanho do texto</span>
            </div>
            
            <search>
              <form onSubmit={() => {
              }}>
                <input
                  type="search"
                  name="search"
                  placeholder="Digite aqui oque você procura"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
            </search>


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
                  <td>{medication.published_at}</td>{/*  Data de Publicação */}
                  <td> {/*  Bula do Paciente */}
                    <a
                      href="#"
                      onClick={() => handleDownload(medication.documents[0].url, `Bula-${medication.name}-Paciente.pdf`)}>
                      <img src="assets/images/pdf.png" alt="Icone de PDF"/>
                    </a>
                  </td>
                  <td> {/*  Bula do Profissional */}
                    <a
                      href="#"
                      onClick={() => handleDownload(medication.documents[1].url, `Bula-${medication.name}-Paciente.pdf`)}>
                      <img src="assets/images/pdf.png" alt="Icone de PDF"/>
                    </a>
                  </td>
                  <td> {/*  Principais Ativos */}
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
        )
      }
    </div>
  )
}

