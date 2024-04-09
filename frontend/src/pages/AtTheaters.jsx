import "../index.css";
import React, { useState } from "react";
import axios from "axios";
import { parseString } from "react-native-xml2js";
import { useEffect } from "react";

function AtTheaters() {
  const [atThreaters, setAtTheaters] = useState([]);

  async function getXml(){
    try {
        const result = await axios.get('https://www.finnkino.fi/xml/Schedule/?area=1018');

        parseString(result.data, (err, parsedJson) => {
          if (err === null) {
            const res = parsedJson.Schedule.Shows[0].Show;
            const list = res.map((Show) => (
              <li key={Show.ID}> {JSON.stringify(Show.dttmShowStart).slice(13,-2)}, {Show.TheatreAndAuditorium}, {Show.OriginalTitle}</li>
            ));
            setAtTheaters(list);
          } else {
            console.error(err);
          }
        });

    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    getXml();
  }, []);

  return (
    <div className="atTheatersContainer">
      <div className="results">
        <ul>
          {atThreaters}
        </ul>
      </div>
    </div>
  );
}
export default AtTheaters;
