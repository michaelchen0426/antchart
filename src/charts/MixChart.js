import React, { useState, useEffect } from "react";
import { Mix } from "@ant-design/plots";

// Show multiple charts together. https://charts.ant.design/en/examples/plugin/multi-view/#combo-plot
// Problem: Cannot display legend and filter the data by legend.
const DemoMix = () => {
  const config = {
    appendPadding: 8,
    tooltip: {
      shared: true,
    },
    syncViewPadding: true,
    plots: [
      {
        type: "column",
        options: {
          data: [
            {
              date: "2015-02",
              value: 160,
              type: "A",
            },
            {
              date: "2015-08",
              value: 245,
              type: "A",
            },
            {
              date: "2016-01",
              value: 487,
              type: "A",
            },
            {
              date: "2017-02",
              value: 500,
              type: "A",
            },
            {
              date: "2018-01",
              value: 503,
              type: "A",
            },
            {
              date: "2018-08",
              value: 514,
              type: "A",
            },
            {
              date: "2015-02",
              value: 1160,
              type: "AB",
            },
            {
              date: "2015-08",
              value: 1245,
              type: "AB",
            },
            {
              date: "2016-01",
              value: 1487,
              type: "AB",
            },
            {
              date: "2017-02",
              value: 1500,
              type: "AB",
            },
            {
              date: "2018-01",
              value: 1503,
              type: "AB",
            },
            {
              date: "2018-08",
              value: 1514,
              type: "AB",
            },
          ],
          isStack: true,
          seriesField: "type",
          xField: "date",
          yField: "value",
          yAxis: {
            max: 10000,
          },
          meta: {
            date: {
              sync: true,
            },
            value: {
              alias: "店数(间)",
            },
          },
          label: {
            position: "middle",
          },
        },
      },
      {
        type: "line",
        options: {
          data: [
            {
              date: "2015-02",
              value: 1200,
            },
            {
              date: "2015-08",
              value: 800,
            },
            {
              date: "2016-01",
              value: 700,
            },
            {
              date: "2017-02",
              value: 1200,
            },
            {
              date: "2018-01",
              value: 300,
            },
            {
              date: "2018-08",
              value: 500,
            },
          ],
          xField: "date",
          yField: "value",
          xAxis: false,
          yAxis: {
            visible: false,
            max: 10000,
          },
          meta: {
            date: {
              sync: "date",
            },
            // value: {
            //   alias: "递增",
            //   formatter: (v) => `${(v * 100).toFixed(1)}%`,
            // },
          },
          smooth: true,
          // label: {
          //   callback: (value) => {
          //     return {
          //       offsetY: value === 0.148 ? 36 : value === 0.055 ? 0 : 20,
          //       style: {
          //         fill: "#1AAF8B",
          //         fontWeight: 700,
          //         stroke: "#fff",
          //         lineWidth: 1,
          //       },
          //     };
          //   },
          // },
          color: "#1AAF8B",
          legend: {},
        },
      },
    ],
  };
  return <Mix {...config} />;
};
export default DemoMix;
