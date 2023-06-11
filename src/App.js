import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DualAxes } from "@ant-design/plots";

const DemoDualAxes = () => {
  const data = [
    {
      time: "2019-03",
      value: 350,
      type: "A",
    },
    {
      time: "2019-04",
      value: 900,
      type: "A",
    },
    {
      time: "2019-05",
      value: 300,
      type: "A",
    },
    {
      time: "2019-06",
      value: 450,
      type: "A",
    },
    {
      time: "2019-07",
      value: 470,
      type: "Ab",
    },
    {
      time: "2019-03",
      value: 240,
      type: "Ab",
    },
    {
      time: "2019-04",
      value: 630,
      type: "Ab",
    },
    {
      time: "2019-05",
      value: 510,
      type: "Ab",
    },
    {
      time: "2019-06",
      value: 813,
      type: "Ab",
    },
    {
      time: "2019-07",
      value: 240,
      type: "Ab",
    },
  ];
  const total = [
    {
      time: "2019-03",
      count: 590,
    },
    {
      time: "2019-04",
      count: 1530,
    },
    {
      time: "2019-05",
      count: 810,
    },
    {
      time: "2019-06",
      count: 1263,
    },
    {
      time: "2019-07",
      count: 910,
    },
  ];
  const config = {
    data: [data, total],
    xField: "time",
    yField: ["value", "count"],
    yAxis: {
      value: {
        min: 0,
        max: 2000,
      },
      count: {
        min: 0,
        max: 2000,
      },
    },
    geometryOptions: [
      {
        geometry: "column",
        isStack: true,
        seriesField: "type",
      },
      {
        geometry: "line",
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return (
    <DualAxes
      {...config}
      onReady={(plot) => {
        plot.on("plot:click", (evt) => {
          const { x, y } = evt;
          const { xField } = plot.options;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
        });

        plot.on("legend-item:click", (evt) => {
          const { x, y } = evt.gEvent;
          console.log("---click--");
        });

        plot.on("legend-item-name:click", (evt) => {
          console.log("------");
          const { x, y } = evt.gEvent;
          const filter = evt.gEvent.target.attrs.text;
          if (filter !== "count") {
            console.log(x);
            console.log(y);
            console.log(evt);
            console.log(plot);
            console.log(plot.chart.views[0]);
            setTimeout(() => {
              console.log(plot.chart.views[0].getData());
              const currentData = plot.chart.views[0].filteredData;
              console.log(currentData);
              let newData = {};
              for (let index = 0; index < currentData.length; index++) {
                const data = currentData[index];
                console.log("-------");
                console.log(data);
                if (newData[data.time] === undefined) {
                  newData[data.time] = 0;
                }

                newData[data.time] = newData[data.time] + data.value;
              }
              console.log("----*****---");
              console.log(newData);
              let newTotalData = [];
              Object.keys(newData).forEach((key) => {
                newTotalData.push({
                  time: key,
                  count: newData[key],
                });
              });
              plot.chart.views[1].changeData(newTotalData);
            }, 200);
          }
        });
      }}
    />
  );
};

export default DemoDualAxes;
