import React from "react";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";




export default function Graph(props){
    const chartConfig={
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
    }

    //console.log('Graph: ', props);
    
    return(
        <BarChart
            data={{
                labels: ['Incomes', 'Expenses', 'Profit'],
                datasets: [
                    {
                        data: [
                            props.data.total_incomes,
                            props.data.total_expenses, 
                            props.data.total_profits

                        ]
                    }
                ]
            }}
            width={300}
            height={200}
            chartConfig={chartConfig}
        />
    );

}