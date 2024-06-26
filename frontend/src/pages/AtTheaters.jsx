import "../index.css";
import React, { useState } from "react";
import axios from "axios";
import { parseString } from "react-native-xml2js";
import ScheduleItem from "../components/ScheduleItem";

function AtTheaters() {
  const [atTheaters, setAtTheaters] = useState([]);
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  // handles dropdown menu value changes
  const handleSelectChange = (e) => {
    setCity(e.target.value);
  };

  // handles date selection changes
  // changes date from yyyy-mm-dd to dd.mm.yyyy
  const handleDateChange = (e) => {
    const dateTemp = e.target.value;
    const dateChanged = dateTemp.slice(8) + "." + dateTemp.slice(5,-3) + "." + dateTemp.slice(0,-6);
    setDate(dateChanged);
  };

  // handles button click
  function handleButton() {
    if (city != ""){
      getSchedule(city);
    }
  };

  // gets XML from finnkino and turns it into JSON
  // gets poster, show start time, auditorium number and movie title from JSON and displays them on the list
  async function getSchedule(city){
    try {
        const result = await axios.get('https://www.finnkino.fi/xml/Schedule/?area=' + city + "&dt=" + date);

        parseString(result.data, (err, parsedJson) => {
          if (err === null) {
            const res = parsedJson.Schedule.Shows[0].Show;
            const list = res.map((Show) => (
              <ScheduleItem key={Show.ID} time={JSON.stringify(Show.dttmShowStart).slice(13,-5)} auditorium={Show.TheatreAuditorium} title={Show.OriginalTitle} imgSRC={Show.Images[0].EventLargeImagePortrait}></ScheduleItem>
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

  return (
    <div className="atTheatersContainer">
      <div className="selectBar">
        <select name="city" id="city" onChange={handleSelectChange}>
          <option value="" className="other">Select a theater</option>
          <option value="1039" className="other">Espoo: OMENA</option>
          <option value="1038" className="other">Espoo: SELLO</option>
          <option value="1045" className="other">Helsinki: ITIS</option>
          <option value="1031" className="other">Helsinki: KINOPALATSI</option>
          <option value="1032" className="other">Helsinki: MAXIM</option>
          <option value="1033" className="other">Helsinki: TENNISPALATSI</option>
          <option value="1013" className="other">Vantaa: FLAMINGO</option>
          <option value="1015" className="other">Jyväskylä: FANTASIA</option>
          <option value="1016" className="other">Kuopio: SCALA</option>
          <option value="1017" className="other">Lahti: KUVAPALATSI</option>
          <option value="1041" className="other">Lappeenranta: STRAND</option>
          <option value="1018" className="other">Oulu: PLAZA</option>
          <option value="1019" className="other">Pori: PROMENADI</option>
          <option value="1034" className="other">Tampere: CINE ATLAS</option>
          <option value="1035" className="other">Tampere: PLEVNA</option>
          <option value="1022" className="other">Turku: KINOPALATSI</option>
          <option value="1046" className="other">Raisio: LUXE MYLLY</option>
        </select>
        <input type="date" onChange={handleDateChange} />
        <button type="button" onClick={handleButton}>Search</button>
      </div>
      <div className="atTheatersResults">
          {atTheaters}
      </div>
    </div>
  );
}
export default AtTheaters;
