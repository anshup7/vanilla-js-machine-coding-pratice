/**
 * https://www.geeksforgeeks.org/dsa/perfect-sum-problem-print-subsets-given-sum/
 */


const target = 0;
let result = [];
function printSubsets(ar, currentSet=[], sum=0, i=0){
    if(target === 0) return result = [[]];
    if(sum === target) {
        result.push([...currentSet]);
        return; // No need top go further, all the numbers in the set are given positive.
    }

    if(i >= ar.length) {
        return;
    }

    sum += ar[i];
    currentSet.push(ar[i]);
    printSubsets(ar, currentSet, sum, i + 1); // Check possibilities by considering the current value.
    sum -= ar[i];
    currentSet.pop();
    printSubsets(ar, currentSet, sum, i + 1); // Check possiblities by not considering the current value.
}

// printSubsets([5, 2, 3, 10, 6, 8]);
printSubsets([5, 7, 8]);
console.log(result);