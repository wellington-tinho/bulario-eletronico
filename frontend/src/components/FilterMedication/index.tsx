import { useRef } from "react";
import styles from "./styles.module.sass";
import { useSearchParams } from "react-router-dom";

export function FilterMedication() {
  const medicationTerm = useRef<HTMLInputElement>(null);  // search term to filter data
  const companyTerm = useRef<HTMLInputElement>(null);  // search term to filter data
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMedicationTerm = searchParams.get('medication') || ''
  const initialCompanyTerm = searchParams.get('company') || ''

  const handleFilter = () => {
    const medication = medicationTerm.current?.value;
    const company = companyTerm.current?.value;

    setSearchParams(state => { 
      if(medication) {
        state.set('medication', medication);
      } else {
        state.delete('medication');
      }
    return state;
    });	

    setSearchParams(state => {
      if(company) {
        state.set('company', company);
      } else {
        state.delete('company');
      }
    return state;
    });
  }

  return (
    <search className={styles.FilterMedication}>
      <form 
      onSubmit={(e) => {
        e.preventDefault();
        handleFilter();
      }}>
        <input
          type="search"
          name="medication"
          placeholder="Nome do medicamento"
          ref={medicationTerm}
          defaultValue={initialMedicationTerm}
        />
        <input
          type="search"
          name="company"
          placeholder="Nome do laboratório"
          ref={companyTerm}
          defaultValue={initialCompanyTerm}
        />
        <button type="submit">Consultar</button>
      </form>
    </search>
  );
}