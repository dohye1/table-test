import React, { useState } from "react";
import { render } from "react-dom";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from "./Button";
import Input from "./Input";

export default function GridExample() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };
  const onBtExport = () => {
    gridApi.exportDataAsExcel();
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button onClick={onBtExport}>export</button>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          frameworkComponents={{ input: Input, button: Button }}
          enableRangeSelection={true}
          enableRangeHandle={true}
          onGridReady={onGridReady}
          rowData={rowData}
          modules={AllModules}
          suppressRowClickSelection={true}
          rowSelection={"multiple"}
          defaultColDef={{
            editable: true,
            resizable: true,
          }}
        >
          <AgGridColumn
            field="athlete"
            minWidth={150}
            headerCheckboxSelection={true}
            headerCheckboxSelectionFilteredOnly={true}
            checkboxSelection={true}
            suppressSizeToFit={true}
          />
          <AgGridColumn field="age" maxWidth={90} />
          <AgGridColumn field="country" minWidth={150} />
          <AgGridColumn field="year" maxWidth={90} />
          <AgGridColumn field="date" minWidth={150} />
          <AgGridColumn field="sport" minWidth={150} />
          <AgGridColumn field="gold" cellRenderer="input" />
          <AgGridColumn field="silver" cellRenderer="button" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        </AgGridReact>
      </div>
    </div>
  );
}
