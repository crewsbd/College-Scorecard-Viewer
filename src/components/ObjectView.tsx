import React from "react";

// import { SchoolData } from "./MainView";


export default function ObjectView({ dataObject }: { dataObject: unknown}) {
  function toggleVisible(event: React.MouseEvent<HTMLDivElement>) {
    console.log("CLICK!");
    event.stopPropagation();
    // const bill = document.createElement("div");
    const parent = event.currentTarget.parentElement;
    parent?.classList.toggle("closed");
  }
  function enableHover(event: React.MouseEvent<HTMLDivElement>) {
    console.log("Enable");
    event.stopPropagation();
    event.currentTarget.classList.add("hover_js");
  }
  function disableHover(event: React.MouseEvent<HTMLDivElement>) {
    console.log("Disable");
    event.stopPropagation();
    event.currentTarget.classList.remove("hover_js");
  }

  function traverseObjectHTML(name: string, data: object | null, level: number) {
    let newChild = <></>;
    let keyIterator = 0;

    if (data == null) {
      // NAME: NULL
      newChild = <li style={{ zIndex: level }}>{name}: NULL</li>;
    } else if (typeof data == "string") {
      newChild = (
        <li style={{ zIndex: level }}>
          {name}: "{data}"
        </li>
      );
    } else if (typeof data == "number") {
      newChild = (
        <li style={{ zIndex: level }}>
          {name}: {data}
        </li>
      );
    } else if (typeof data == "boolean") {
      newChild = (
        <li style={{ zIndex: level }}>
          {name}: {data}
        </li>
      );
    } else if (typeof data == "object") {
      if (Array.isArray(data)) {
        // It's an array. NAME: []
        newChild = (
          <li className="closed">
            <div
              onClick={toggleVisible}
              onMouseOver={enableHover}
              onMouseOut={disableHover}
              className="ul-minimized"
            >
              {name} {">"}
            </div>
            {data.map((item) => {
              keyIterator++;
              return (
                <>
                  <ul key={keyIterator}>
                    {traverseObjectHTML("", item, level + 1)}
                  </ul>
                </>
              );
            })}
          </li>
        );
      } else {
        // It's a regular object. NAME: {}
        newChild = (
          <li className="closed">
            <div
              onClick={toggleVisible}
              onMouseOver={enableHover}
              onMouseOut={disableHover}
            >
              {name} {">"}
            </div>
            {Object.entries(data).map((pair) => {
              const [key, value] = pair;
              keyIterator++;
              return (
                <ul key={keyIterator}>
                  {traverseObjectHTML(key, value, level + 1)}
                </ul>
              );
            })}
          </li>
        );
      }
    }
    // Final return
    return (
      <>
        {/* {name !== "" ? <li>{name}</li> : null} */}
        {newChild}
      </>
    );
  }

  const schoolData = traverseObjectHTML("School Data", dataObject as object, 0);

  return <ul className="object_viewer">{schoolData}</ul>;
}
