var btn = document.getElementById('sort');
var array;
btn.addEventListener("click", function(){
    var input = document.getElementById("input").value;  
    array = input.split(' ').map(function(item) {
        return parseInt(item, 10);
    });
    array = quickSort(array, 0, array.length - 1);
    var output = document.getElementById('output');
    var outputText = array.map(String);

    output.value = outputText;
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
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
 }
