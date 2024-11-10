import { DiagnosisEntry } from "../types";
import diagnosesData from "../../data/diagnoses";

const getDiagnosesEntries = (): DiagnosisEntry[] => {
  return diagnosesData;
};

export default { getDiagnosesEntries };
