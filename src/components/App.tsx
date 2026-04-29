import React, { useEffect, useState } from "react";
import axios from "axios";
import ActivityChart from "./ActivityChart";

const API_TOKEN = process.env.APP_API_TOKEN || "";
const NAME = process.env.APP_NAME || "Student";
const ENDPOINT = process.env.APP_ENDPOINT || "";

interface IActivityElement {
  duration: number;
  date: string;
}

const App = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (!API_TOKEN || !ENDPOINT) {
      console.log("Missing APP_API_TOKEN or APP_ENDPOINT");
      setIsLoading(false);
      return;
    }

    axios
      .get(ENDPOINT, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      })
      .then((response: { data: IActivityElement[] }) => {
        if (response?.data) {
          const durations = response.data.map((stat: IActivityElement) =>
            stat.duration && stat.duration > 0
              ? (stat.duration / 3600).toFixed(2)
              : 0
          );
          setSeries([
            { name: "Coding activity", type: "area", data: durations },
          ]);
          setDates(response.data.map((stat: IActivityElement) => stat.date));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR GETTING DATA", error);
        setIsLoading(false);
      });
  };

  const content = isLoading ? (
    <div>Loading data...</div>
  ) : (
    <div>
      <div className="content__chart">
        <ActivityChart labels={dates} name={`hours`} series={series} />
      </div>

      <div className="content__title">Activity Chart for {NAME}</div>
    </div>
  );

  return <div className="content">{content}</div>;
};

export default App;
