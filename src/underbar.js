// Sort the object's values by a criterion produced by an iterator.
// If iterator is a string, sort objects by that property with the name
// of that string. For example, _.sortBy(people, 'name') should sort
// an array of people by their name.
_.sortBy = function (collection, iterator) {
  const termEval = elem => eval(`'${elem}'.${iterator}`)

  if (typeof iterator === 'function') {
    return collection.sort((a, b) => iterator(a) - iterator(b));
  } else {
    return collection.sort((a, b) => termEval(a) - termEval(b));
  }
};

// Zip together two or more arrays with elements of the same index
// going together.
//
// Example:
// _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
_.zip = function (...origArrs) {
  /* START SOLUTION */
  // determine longest array
  // we could sort by length but this would take longer and then I would need knowledge of sequence
  // map out lengths
  // Find which one was max of lengths
  const arrayLengths = _.map(origArrs, arr => arr.length);
  const maxArrLength = Math.max(...arrayLengths);
  let finalArr = Array(maxArrLength);
  // console.log(maxArrLength, origArrs, finalArr)
  _.each(finalArr, (v, i) => {
    finalArr[i] = _.pluck(origArrs, i);
  })

  return finalArr;

  // iterate through and gather value for each subArray[i] from the arrays[i]
  // set length of iteration to maxLength
  /* END SOLUTION */
};

// Takes a multidimensional array and converts it to a one-dimensional array.
// The new array should contain all elements of the multidimensional array.
//
// Hint: Use Array.isArray to check if something is an array
_.zip = function (...args) {

  // get max array length

  // map of subarray lengths
  let arrLengths = _.map(args, subArr => subArr.length);
  // console.log(maxMap)

  // // max of the subarray.lengths
  let max = Math.max(...arrLengths);
  // // reduce practice
  // let max = _.reduce(maxMap, (max, elem) => {
  //   if (elem > max) max = elem;
  //   return max;
  // })
  // console.log(max)

  // make an array the length of the longest array
  let zipArr = Array(max);
  // console.log(zipArr);

  // run loop

  // // for 
  // for (let i = 0; i < max; i++) {
  //    zipArr[i] = (_.map(args, arg => arg[i]))
  // //  zipArr[i] = _.pluck(args, i)
  //   console.log(zipArr, i, zipArr[i], args, args[i]);
  // }
  
  // // each
  _.each(zipArr, (val, i) => {
    //  zipArr[i] = (_.map(args, arg => arg[i]))
    zipArr[i] = _.pluck(args, i)
    // console.log(zipArr, i, zipArr[i], args, args[i]);
  })

  // console.log(zipArr, val, i, zipArr[i], _.pluck(array, i));
  return zipArr;
};


// return _.map(collection, item => item[key]);
// Takes a multidimensional array and converts it to a one-dimensional array.
// The new array should contain all elements of the multidimensional array.
//
// Hint: Use Array.isArray to check if something is an array

// recursively
_.flatten = function (nestedArray) {
  return _.reduce(nestedArray, (flatArr, subArr) => {
    if (Array.isArray(subArr)) {
      return flatArr.concat(_.flatten(subArr));
    } else {
      return flatArr.concat(subArr);
    }
  }, [])
};

// more streamlined recursively
_.flatten = function (nestedArray, result = []) {
  return _.reduce(nestedArray, (result, baseElement) => {
    if (Array.isArray(baseElement)) {
      _.flatten(baseElement, result);
    } else {
      result.push(baseElement);
    }
    return result;
  }, result);
};

// // conditional operator version
// _.flatten = function(nestedArray) {
  //   return _.reduce(nestedArray, (flatArr, subArr) => {
    //     return Array.isArray(subArr) ?
//       flatArr.concat(_.flatten(subArr)) :
//       flatArr.concat(subArr);
//     }, [])
// };

// ES6 version that works everywhere else... but subArr is not iterable here
// _.flatten = function(nestedArray) {
  //   return _.reduce(nestedArray, (flatArr, subArr) =>
  //     // return Array.isArray(subArr) ?
  //     //   flatArr.concat(_.flatten(subArr)) :
  //       [...flatArr, ...subArr], [])
// };

// summary helper function for set functions
_.counts = function (arr) {
  return _.reduce(arr, (hashCount, elem) => {
    hashCount[elem] = (hashCount[elem] || 0) + 1;
    // console.log(hashCount, elem, arr)
    return hashCount;
  }, {})
};
  // console.log(_.counts(['moe', 'curly', 'larry', 'moe', 'groucho'])) // => {moe: 2, curly: 1, larry: 1, groucho: 1}
  

  // Takes an arbitrary number of arrays and produces an array that contains

  // // every item shared between all the passed-in arrays.
  // // only compares sequentially - 
  // // (alternatively could compare 2nd to 1st and then run thru 1st to all) - 
  // // summarizing approach will be more flexible to adapt to other things
  // _.intersection = function(firstArgArr, ...args) {
    //   let combinedArr = [];
    //   _.each(args, (arg, i) => {
      //     _.each(arg, elem => {
        //       // console.log(firstArgArr, args, arg, i, firstArgArr.includes(elem), elem);
        //       if ((arg[i-1] || firstArgArr).includes(elem)) combinedArr.push(elem)
  //     })
  //   })
  //   return combinedArr;
  // };


_.intersection = function (...args) {
  let intersectArr = [];
  // flatten all arrays
  const flatArr = _.flatten(args);
  // build summary
  const summary = _.counts(flatArr);
  // collect only those things that appeared as often as total number of arrays compared
  const numArgArrays = args.length;
  // console.log(flatArr, summary, numArgArrays);
  const summaryObj = _.each(summary, (val, key) => {
    if (val === numArgArrays) { intersectArr.push(key) }
  });
  return intersectArr;
};

// Take the complete difference between one array and a number of other arrays.
// Only the elements present in all arrays will remain.
_.disjoint = function (...args) {
  let disjointArr = [];
  // flatten all arrays
  const flatArr = _.flatten(args);
  // build summary
  const summary = _.counts(flatArr);
  // collect only those things that appeared as often as total number of arrays compared
  const numArgArrays = args.length;
  // console.log(flatArr, summary, numArgArrays);
  const summaryObj = _.each(summary, (val, key) => {
    if (val === 1) { disjointArr.push(key) }
  });
  return disjointArr;
};

// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
_.difference = function (...args) {
  let differenceArr = [];
  // split first from rest
  let [firstArr, ...rest] = args;
  // flatten rest
  rest = _.flatten(rest);
  // loop thru each subsequent element
  _.each(firstArr, elem => {
    //   // check if in first array : add to differenceArr
    if (!(rest.includes(elem))) differenceArr.push(elem);
  })
  // console.log('args, firstArr, rest: ', args, firstArr, rest, differenceArr);
  return differenceArr;
}

// // underscore version
// _.difference = function (array) {
//           // flatten(value, shallow, strict, startindex)
//   var rest = flatten(arguments, true, true, 1);
//   return _.filter(array, function (value) {
//     return !_.contains(rest, value);
//   });
// };

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time.  See the Underbar readme for extra details
// on this function.
//
// Note: This is difficult! It may take a while to implement.
_.throttle = function (func, wait) {
};

}());
