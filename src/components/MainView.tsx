import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import ObjectView from "./ObjectView";

export type SchoolData = {
  results: [
    {
      school: {
        name: string;
        address: string;
        city: string;
        state: string;
        zip: string;
      }
    }
  ]
}

export default function MainView({ id }: { id: string }) {
  const { apiKey } = useContext(GlobalContext);
  const [schoolData, changeSchoolData] = useState<SchoolData | null>(null);

  useEffect(() => {
    async function getCollegeData() {
      console.log("Query API(MainView)" + id);
      const result = await fetch(
        `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&page=0&per_page=20&id=${id}`
      );

      changeSchoolData(await result.json());
    }
    getCollegeData();
  }, [apiKey, id]);

  console.log("SCHOOL DATA");
  console.dir(schoolData);

  


  return (
    <div id="main_view">
      <div className="float_header">
        <h3>
          {schoolData?.results?.[0]?.school?.name
            ? schoolData.results[0].school.name
            : "None"}
          ({id})
        </h3>
        <div>
          {schoolData?.results?.[0]?.school?.address
            ? schoolData.results[0].school.address
            : "None"}
        </div>
        <div>
          {schoolData?.results?.[0]?.school?.city
            ? schoolData.results[0].school.city
            : "None"}
          ,{" "}
          {schoolData?.results?.[0]?.school?.state
            ? schoolData.results[0].school.state
            : "None"}{" "}
          {schoolData?.results?.[0]?.school?.zip
            ? schoolData.results[0].school.zip
            : "None"}
        </div>
      </div>
      <div>
        <ObjectView dataObject={schoolData?.results?.[0]} />
      </div>
    </div>
  );
}
