import { useRef, useState } from "react";
import "./App.css";
import csv from "csvtojson";
import PieChartComponent, {
  PieChartComponentInterface,
} from "./components/PieChartComponent";

function isString(entry: FormDataEntryValue): entry is string {
  return typeof entry === "string";
}

function App() {
  const [pieData, setPieData] = useState<PieChartComponentInterface["data"]>(
    []
  );
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [segmentCount, setSegmentCount] = useState(5);

  const formRef = useRef<HTMLFormElement>(null);

  const generateChart: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // clear errors on retry
    setErrorMsg(null);

    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        const csvDataRaw = formData.get("csvData");
        const segmentValue = formData.get("segmentCount");

        if (segmentValue && isString(segmentValue)) {
          setSegmentCount(parseInt(segmentValue, 10));
        }

        if (!csvDataRaw) {
          setErrorMsg("Please fill in some data");
          return;
        }

        if (isString(csvDataRaw)) {
          csv({ noheader: true })
            .fromString(csvDataRaw)
            .then((jsonObj) => {
              setPieData(jsonObj);
            });
        } else {
          setErrorMsg("Please enter a valid CSV value");
        }
      }
    } catch (e) {
      setErrorMsg((e as Error).message);
    }
  };
  return (
    <>
      <h1>CSV to pie chart</h1>
      <p>Convert a CSV string to a pie chart.</p>
      <div className="container">
        <div className="inputBox">
          <form action="javascript:void(0)" ref={formRef}>
            <fieldset className="form-fieldset">
              <label>
                <span>Chart CSV data</span>
                <textarea name="csvData" rows={10} placeholder="Please remove the CSV header from the pasted string" />
              </label>
              <label>
                <span>Chart segments to show</span>
                <input
                  type="number"
                  name="segmentCount"
                  defaultValue={segmentCount}
                />
              </label>
            </fieldset>
          </form>
          {errorMsg && <div className="errorContainer">{errorMsg}</div>}

          <button className="submitBtn" type="button" onClick={generateChart}>
            Generate chart ⚡️
          </button>

          {pieData.length > 0 && (
            <PieChartComponent segments={segmentCount} data={pieData} />
          )}
          {/* <pre>{JSON.stringify(pieData, null, 4)}</pre> */}
        </div>
      </div>
    </>
  );
}

export default App;
