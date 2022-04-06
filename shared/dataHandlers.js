

// DATA HANDLERS 

export function filterMonthly(yearlyData){
    var filteredDataObjects = []
    var tmp = [];
    var graphTriplet = null;

    const months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
        
        
    months.forEach(month => {
        yearlyData.forEach(element => {
            
            if(element.date.includes(month)){
                tmp.push(element);
            }
            
        });

        graphTriplet = null;
        if(tmp.length > 0){
            graphTriplet = calculateTripletTotal(tmp);
            filteredDataObjects.push({
                // MONTHLY
                timeSpanMode: "MONTHLY",
                // January, February ... December
                timeSpanName: month,
                // Triplet including Incomes, expenditures and profits
                tripletTotal: graphTriplet,
                // Every daily object, splitted (more info in splitDailyData declaration)
                rawData: splitDailyData(tmp)
            })

        }



        tmp = [];

    });

    
    return filteredDataObjects;
}


// DailyObjecty has various expenses and incomes inserted over the day. 
// This create an object for each entry during the day
function splitDailyData(data){
    var newData = [];
    

    data.forEach(dailyObject => {

        dailyObject.expenses.forEach(element => {
            newData.push({
                date: dailyObject.date,
                notes: element.notes,
                singleExpense: element.value
            })
        });

        dailyObject.incomes.forEach(element => {
            newData.push({
                date: dailyObject.date,
                notes: element.notes,
                singleIncome: element.value
            })
        });
    });
    return newData;
}


// Calculate incomes, expenses and profit to draw graphs.
function calculateTripletTotal(data){
    var incomes = 0, expenses = 0, profit;
    data.forEach(dailyData => {
        dailyData.incomes.forEach(element => {
            incomes += element.value;
        });
        dailyData.expenses.forEach(element => {
            expenses += element.value;
        });
    });

    profit = incomes - expenses;

    return {
        incomes: incomes,
        expenses: expenses,
        profit: profit
    }
    
}

