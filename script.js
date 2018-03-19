var array;
var posArray;
var Chart;
var oldArr = [];
var arrayOfArrs = [];
var arrayOfLabels = [];
var arrayOfIndexes = [];
var arrindex = 0;
document.getElementById('sort').addEventListener("click", function(){
    var input = document.getElementById("input").value;  



    array = input.split(' ').map(function(item) {
        return parseInt(item, 10);
    });
    draw(Chart);
    array = quickSort(array, 0, array.length - 1);
    var output = document.getElementById('output');
    var outputText = array.map(String);
    output.value = outputText;
    var timer = setInterval(function() {
        var i = (arrayOfIndexes[arrindex])[0];
        var j = (arrayOfIndexes[arrindex])[1];
        
        Chart.data.datasets[0].backgroundColor = [];

        Chart.data.datasets[0].backgroundColor[i] = "red";
        Chart.data.datasets[0].backgroundColor[j] = "red";
        Chart.data.datasets[0].data = arrayOfArrs[arrindex];
        Chart.data.labels = arrayOfLabels[arrindex];
        Chart.update();
        arrindex++;
        if(arrindex > arrayOfArrs.length - 1) {
            Chart.data.datasets[0].backgroundColor = [];
            Chart.update();
            clearTimeout(timer);
        }
    }, 2000);

});



function quickSort(arr, left, right){
    var len = arr.length, 
    pivot,
    partitionIndex;
   if(left < right){
     pivot = right;
     partitionIndex = partition(arr, pivot, left, right);
     
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
   }
   return arr;
 }



 function partition(arr, pivot, left, right){
    var pivotValue = arr[pivot],
        partitionIndex = left; 
    for(var i = left; i < right; i++){
     if(arr[i] < pivotValue){
       swap(arr, i, partitionIndex);
       partitionIndex++;
     }
   }
   swap(arr, right, partitionIndex);
   return partitionIndex;
 }

 function swap(arr, i, j){
    oldArr = array.slice(0);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    addDataToArr(i, j); 
}

function addDataToArr(i, j) {
    if(!(array.length==oldArr.length && array.every(function(v,i) { return v === oldArr[i]}))){
        ugrapdeToPos();
        arrayOfArrs.push(posArray);
        arrayOfLabels.push(array.map(String));
        arrayOfIndexes.push([i, j]);
    }
}


function draw() {
    var ctx = document.getElementById('myCanvas').getContext('2d');
    ugrapdeToPos();
    var Data = {
        labels: array.map(String),
        datasets: [{
            label: 'Elements',
            data: posArray,
            backgroundColor: []
        }]
      };
       
      var chartOptions = {
        title: {
            display: true,
            text: 'Array'
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        },
        scales:
        {
            yAxes: [{
                display: false
            }]
        },
        tooltips: {
            enabled: false
        }
      };
      Chart = new Chart(ctx, {
        type: 'bar',
        data: Data,
        options: chartOptions
    })
}


function ugrapdeToPos() {
    var min = Math.min(...array);
    posArray = array.slice(0);
    posArray.forEach(function(part, index, theArray){
        posArray[index] += Math.abs(min)*2;
    });
}
