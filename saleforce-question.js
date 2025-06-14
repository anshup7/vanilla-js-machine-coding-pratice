/**
 * "You're given a deeply nested array with all kinds of values (numbers, strings, booleans, null, undefined, functions, symbols, objects).
Write a function that:

✅ Deep flattens the array
✅ Groups elements by their JavaScript typeof
✅ Tracks the frequency count of each unique value within that type (This was the followup of the main question)
🔸 Sample Input:
const input = [1, 'a', [true, ['b', undefined], [{} , null]], () => {}, Symbol('x')];
 * 
 */

function deepFlatten(value, flatAr=[]) {
    if(!Array.isArray(value)) {
        flatAr.push(value);
        return;
    }

    for(let each of value) {
        deepFlatten(each, flatAr);
    }

    return flatAr;
}

function groupByType(flatAr) {
    return flatAr.reduce((acc, cur) => {
        const typeOfVal = (typeof cur);
        console.log(typeOfVal);
        if(typeOfVal in acc) {
            const stringVersion = String(cur);
            if(stringVersion in acc[typeOfVal]) {
                acc[typeOfVal][stringVersion] += 1;
            } else {
                acc[typeOfVal][stringVersion] = 1;
            }
        } else {
            
                acc[typeOfVal] = {[String(cur)]: 1}
            
        }
        return acc;
    }, {});
}

// const flattened = deepFlatten([1, 'a', [true, ['b', undefined], [{} , null]], () => {}, Symbol('x')]);

const flattened = deepFlatten([new Date(), new RegExp("abc"), {}]);


console.log(flattened);

console.log(groupByType(flattened));

