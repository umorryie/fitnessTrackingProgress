import Chart from "chart.js"

const colors = {
    gray: {
        100: "#f6f9fc",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#8898aa",
        700: "#525f7f",
        800: "#32325d",
        900: "#212529",
    },
    theme: {
        default: "#172b4d",
        primary: "#5e72e4",
        secondary: "#f4f5f7",
        info: "#11cdef",
        success: "#2dce89",
        danger: "#f5365c",
        warning: "#fb6340",
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent",
};

const mode: string = "light";
function chartOptions() {
    // Options
    var options = {
        defaults: {
            global: {
                responsive: true,
                maintainAspectRatio: false,
                defaultColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
                defaultFontColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
                defaultFontSize: 13,
                layout: {
                    padding: 0,
                },
                legend: {
                    display: false,
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                        padding: 16,
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                        backgroundColor: colors.theme["primary"],
                    },
                    line: {
                        tension: 0.4,
                        borderWidth: 4,
                        borderColor: colors.theme["primary"],
                        backgroundColor: colors.transparent,
                        borderCapStyle: "rounded",
                    },
                    rectangle: {
                        backgroundColor: colors.theme["warning"],
                    },
                    arc: {
                        backgroundColor: colors.theme["primary"],
                        borderColor: mode === "dark" ? colors.gray[800] : colors.white,
                        borderWidth: 4,
                    },
                },
                tooltips: {
                    enabled: true,
                    mode: "index",
                    intersect: false,
                },
            },
            doughnut: {
                cutoutPercentage: 83,
                legendCallback: function (chart: any) {
                    var data = chart.data;
                    var content = "";

                    data.labels.forEach(function (label: any, index: any) {
                        var bgColor = data.datasets[0].backgroundColor[index];

                        content += '<span class="chart-legend-item">';
                        content +=
                            '<i class="chart-legend-indicator" style="background-color: ' +
                            bgColor +
                            '"></i>';
                        content += label;
                        content += "</span>";
                    });

                    return content;
                },
            },
        },
    };
    Chart.scaleService.updateScaleDefaults("linear", {
        gridLines: {
          borderDash: [2],
          borderDashOffset: 2,
          color: mode === "dark" ? colors.gray[900] : colors.gray[300],
          drawBorder: false,
          drawTicks: false,
          lineWidth: 0,
          zeroLineWidth: 0,
          zeroLineColor: mode === "dark" ? colors.gray[900] : colors.gray[300],
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset:2,
        },
        ticks: {
          beginAtZero: true,
          padding: 10,
          callback: function (value:any) {
            if (!(value % 10)) {
              return value;
            }
          },
        },
      });
    
      // xAxes
      Chart.scaleService.updateScaleDefaults("category", {
        gridLines: {
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          padding: 20,
        },
      });
    
      return options;
}
// Parse global options
function parseOptions(parent: any, options: any) {
    for (var item in options) {
        if (typeof options[item] !== "object") {
            parent[item] = options[item];
        } else {
            parseOptions(parent[item], options[item]);
        }
    }
}
export default {
    parseOptions,
    chartOptions,
    chart: {
        options: {
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            color: colors.gray[900],
                            zeroLineColor: colors.gray[900],
                        },
                        ticks: {
                            callback: function (value: any) {
                                if (!(value % 10)) {
                                    return "" + value + " kg";
                                }
                            },
                        },
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    label: function (item: any, data: any) {
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = item.yLabel;
                        var content = "";

                        if (data.datasets.length > 1) {
                            content += label;
                        }

                        content += yLabel + "kg";
                        return content;
                    },
                },
            },
        },
        data1: {
            labels: ["3 Mar", "7 Mar", "11 Mar", "15 Mar", "20 Mar", "24 Mar", "27 Mar", "31 Mar"],
            datasets: [
                {
                    label: "Performance",
                    data: [30, 48, 57, 60, 71, 83, 85, 87, 88],
                },
            ],
        },
        data2:  {
            labels: ["3 Apr", "7 Apr", "11 Apr", "15 Apr", "20 Apr", "24 Apr", "27 Apr", "31 Apr"],
            datasets: [
                {
                    label: "Performance",
                    data: [90, 91, 94, 100, 120, 130, 150, 160, 170],
                },
            ],
        }
    },
    maxWeight: [
        {
            date: "2021-03-01",
            weight: 220
        },
        {
            date: "2021-03-04",
            weight: 220
        },
        {
            date: "2021-03-08",
            weight: 180
        },

        {
            date: "2021-03-011",
            weight: 195
        },
        {
            date: "2021-03-04",
            weight: 210
        },
        {
            date: "2021-03-020",
            weight: 220
        },
        {
            date: "2021-03-026",
            weight: 220
        },
        {
            date: "2021-03-31",
            weight: 260
        }
    ],
    workoutVolume: [
        {
            date: "2021-03-01",
            weight: 2200
        },
        {
            date: "2021-03-04",
            weight: 2200
        },
        {
            date: "2021-03-08",
            weight: 1800
        },

        {
            date: "2021-03-011",
            weight: 1950
        },
        {
            date: "2021-03-04",
            weight: 2100
        },
        {
            date: "2021-03-020",
            weight: 2200
        },
        {
            date: "2021-03-026",
            weight: 2200
        },
        {
            date: "2021-03-31",
            weight: 2300
        }
    ],
    totalReps: [
        {
            date: "2021-03-01",
            weight: 2200
        },
        {
            date: "2021-03-04",
            weight: 2200
        },
        {
            date: "2021-03-08",
            weight: 1800
        },

        {
            date: "2021-03-011",
            weight: 1950
        },
        {
            date: "2021-03-04",
            weight: 2100
        },
        {
            date: "2021-03-020",
            weight: 2200
        },
        {
            date: "2021-03-026",
            weight: 2200
        },
        {
            date: "2021-03-31",
            weight: 2300
        }],
    totalSets: [
        {
            date: "2021-03-01",
            weight: 2200
        },
        {
            date: "2021-03-04",
            weight: 2200
        },
        {
            date: "2021-03-08",
            weight: 1800
        },

        {
            date: "2021-03-011",
            weight: 1950
        },
        {
            date: "2021-03-04",
            weight: 2100
        },
        {
            date: "2021-03-020",
            weight: 2200
        },
        {
            date: "2021-03-026",
            weight: 2200
        },
        {
            date: "2021-03-31",
            weight: 2300
        }]
};
