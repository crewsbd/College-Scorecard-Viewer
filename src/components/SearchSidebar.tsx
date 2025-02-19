import { useEffect, useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import { GlobalContext } from "../GlobalContext";

export default function SearchSidebar() {
  // States and Context
  const [query, changeQuery] = useState<string>("");
  const [schoolList, changeSchoolList] = useState<
    { id: string; name: string }[]
  >([]);
  const { apiKey, changeCurrentSchool } = useContext(GlobalContext);

  // Limit the number of queries
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    async function getCollegeList() {
      console.log("Query API(SearchSidebar)");
      const result = await fetch(
        `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&page=0&per_page=20&fields=id,school.name&school.name=${debouncedQuery}`
      );
      const json = await result.json();
      changeSchoolList(
        json.results.map((school: { id: string; "school.name": string }) => {
          return { id: school.id, name: school["school.name"] };
        })
      );
    }
    getCollegeList();
  }, [debouncedQuery, apiKey]);

  // Handle changes to the query input and update the state
  function searchHandler(event: React.ChangeEvent<HTMLInputElement>) {
    changeQuery(event?.target.value);
  }
  // Handle clicks to the school so they propagate to the MainView via GlobalContext
  function loadSchool(id: string) {
    console.log("LOADING SCHOOL " + id);
    changeCurrentSchool(id);
  }

  return (
    <div id="search">
      <input type="text" onChange={searchHandler}></input>
      <ul>
        {schoolList.map((listing) => {
          return (
            <li
              key={listing.id}
              onClick={() => {
                loadSchool(listing.id);
              }}
            >
              {listing.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
