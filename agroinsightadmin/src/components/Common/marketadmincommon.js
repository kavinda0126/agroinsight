import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import MMDBCard from "../MarketAdmin/MAMain/MMDBCard";
import moment from "moment";

const MarketAdminCommon = () => {
  const [highestPriceCrop, setHighestPriceCrop] = useState(null);
  const [lowestThisWeek, setLowestThisWeek] = useState(null);
  const [dailyHighest, setDailyHighest] = useState([]);
  const [highestThisWeek, setHighestThisWeek] = useState(null);

  useEffect(() => {
    function getCrops() {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/crop/croplist`)
        .then((res) => {
          const crops = res.data;
          if (crops.length > 0) {
            const highestCrop = crops.reduce((prev, current) => {
              return prev.Price > current.Price ? prev : current;
            });
            setHighestPriceCrop(highestCrop);
          }
        })
        .catch((err) => {
          alert("Error fetching crops");
        });
    }
    getCrops();
  }, []);

  useEffect(() => {
    function getCrophistory() {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/crop/gethistory`)
        .then((res) => {
          const filteredCrops = res.data;
          const today = moment();
          const weekStart = today.subtract(7, "days");

          const thisWeekCrops = filteredCrops.filter((crop) =>
            moment(crop.date, "DD/MM/YYYY").isSameOrAfter(weekStart)
          );

          const dailyCrops = {};
          thisWeekCrops.forEach((crop) => {
            const cropDate = moment(crop.date, "DD/MM/YYYY").format(
              "DD/MM/YYYY"
            );
            if (
              !dailyCrops[cropDate] ||
              dailyCrops[cropDate].Price < crop.Price
            ) {
              dailyCrops[cropDate] = crop;
            }
          });

          const dailyHighestArray = Object.keys(dailyCrops)
            .map((date) => ({
              date,
              Crop_name: dailyCrops[date].Crop_name,
              Price: dailyCrops[date].Price,
            }))
            .sort(
              (a, b) =>
                moment(a.date, "DD/MM/YYYY") - moment(b.date, "DD/MM/YYYY")
            );

          setDailyHighest(dailyHighestArray);

          setDailyHighest(dailyHighestArray);

          if (thisWeekCrops.length > 0) {
            const highestCropThisWeek = thisWeekCrops.reduce(
              (prev, current) => {
                return prev.Price > current.Price ? prev : current;
              }
            );
            setHighestThisWeek(highestCropThisWeek);

            const lowestCropThisWeek = thisWeekCrops.reduce((prev, current) => {
              return prev.Price < current.Price ? prev : current;
            });
            setLowestThisWeek(lowestCropThisWeek);
          }
        })
        .catch((err) => {
          alert("error fetching crop history");
        });
    }
    getCrophistory();
  }, []);

  return (
    <div className="row mt-4">
      {highestPriceCrop && (
        <MMDBCard
          title="Today Market Trend"
          value1={`${highestPriceCrop.Crop_name}`}
          value2={`Price Per 1kg : Rs.${highestPriceCrop.Price}.00`}
          iconClass="bi bi-calendar-event"
          duration="Islandwide"
        />
      )}
      {highestThisWeek && (
        <MMDBCard
          title="This Week Market Trend"
          value1={`${highestThisWeek.Crop_name}`}
          value2={`Price Per 1kg : Rs.${highestThisWeek.Price}.00`}
          iconClass="bi bi-calendar-week"
          duration="Islandwide"
        />
      )}
      {lowestThisWeek && (
        <MMDBCard
          title="This Week Market Downturn"
          value1={`${lowestThisWeek.Crop_name}`}
          value2={`Price Per 1kg : Rs.${lowestThisWeek.Price}.00`}
          duration="Islandwide"
        />
      )}
    </div>
  );
};

export default MarketAdminCommon;
