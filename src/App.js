import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { DualAxes } from "@ant-design/plots";

// Show detailed data via Column chart and total number via Line chart.
// Features:
//    #1 Share same legend and filter data by legend
//    #2 When remove/add detailed data via legend, the total line chart will be updated as well.
//    #3 Click `2M` or `All` to re-render the chart using new data.
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

const DemoDualAxes = () => {
  const [detailData, setDetailData] = useState(data);
  const [totalData, setTotalData] = useState(total);

  const config = {
    data: [detailData, totalData],
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
  const ref = useRef();
  return (
    <>
      <button
        onClick={() => {
          console.log("click to filter");
          // ref.current?.downloadImage();
          const filteredDetailDate = data.filter(
            (item) => item.time === "2019-03" || item.time === "2019-04"
          );
          const filteredTotalDate = total.filter(
            (item) => item.time === "2019-03" || item.time === "2019-04"
          );
          setDetailData(filteredDetailDate);
          setTotalData(filteredTotalDate);
          // console.log(filteredDetailDate);
          // console.log(filteredDetailDate);
          // console.log(ref.current?.chart);
          // console.log(ref.current?.chart.views[0]);
          // // ref.current?.chart.views[0].filter("time", (value, datum) => {
          // //   console.log("---filter---");
          // //   console.log(value);
          // //   console.log(datum);
          // //   return value === "2019-03" || value === "2019-04";
          // // });
          // ref.current?.chart.views[0].changeData(filteredDetailDate);
          // ref.current?.chart.views[0].adjustCoordinate();
          // ref.current?.chart.views[1].changeData(filteredTotalDate);
          // ref.current?.chart.views[1].adjustCoordinate();
        }}
      >
        2M
      </button>
      <button
        onClick={() => {
          console.log("click to filter");
          // ref.current?.downloadImage();

          setDetailData(data);
          setTotalData(total);
        }}
      >
        All
      </button>
      <DualAxes
        {...config}
        onReady={(plot) => {
          ref.current = plot;
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
              // console.log(x);
              // console.log(y);
              // console.log(evt);
              // console.log(plot);
              // console.log(plot.chart.views[0]);
              // The filteredData will be delayed when we click the legend to filter.
              setTimeout(() => {
                // console.log(plot.chart.views[0].getData());
                const currentData = plot.chart.views[0].getData();
                console.log(currentData);
                let newData = {};
                for (let index = 0; index < currentData.length; index++) {
                  const data = currentData[index];
                  // console.log("-------");
                  // console.log(data);
                  if (newData[data.time] === undefined) {
                    newData[data.time] = 0;
                  }

                  newData[data.time] = newData[data.time] + data.value;
                }
                // console.log("----*****---");
                // console.log(newData);
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
    </>
  );
};

export default DemoDualAxes;
