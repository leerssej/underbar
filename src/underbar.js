(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (val) {
    /* START SOLUTION */
    return val;
    /* END SOLUTION */
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    /* START SOLUTION */
    // When the input n not is provided, we return a single value from the array,
    // rather than an array of values
    if (n === undefined) {
      return array[array.length - 1];
    }
    return array.slice(Math.max(0, array.length - n));
    /* END SOLUTION */
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
    /* START SOLUTION */
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
    /* END SOLUTION */
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    /* START SOLUTION */
    var result = [];

    _.each(collection, function (val) {
      test(val) && result.push(val);
    });

    return result;
    /* END SOLUTION */
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    /* START SOLUTION */
    return _.filter(collection, function (val) {
      return !test(val);
    });
    /* END SOLUTION */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array, isSorted, iterator) {
    /* START SOLUTION */
    var hash = {};

    iterator = (isSorted && iterator) || _.identity;

    _.each(array, function (val) {
      var transformed = iterator(val);
      if (hash[transformed] === undefined) {
        hash[transformed] = val;
      }
    });

    return _.map(hash, function (value) {
      return value;
    });
    /* END SOLUTION */
  };

  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    /* START SOLUTION */
    var results = [];

    _.each(collection, function (item, index, collection) {
      results.push(iterator(item, index, collection));
    });

    return results;
    /* END SOLUTION */
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function (collection, iterator, accumulator) {
    /* START SOLUTION */
    var initializing = arguments.length === 2;

    _.each(collection, function (val) {
      if (initializing) {
        initializing = false;
        accumulator = val;
      } else {
        accumulator = iterator(accumulator, val);
      }
    });

    return accumulator;
    /* END SOLUTION */
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    collection = Object.values(collection);
    return collection.includes(target);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator = _.identity) {
    return _.reduce(collection, (acc, element) => {
      if (!iterator(element)) {
        return false;
      }
      return acc;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator = _.identity) {
    return !_.every(collection, element =>
      !iterator(element));
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  // ES5 Approach
  // _.extend = function(obj) {
  //   const baseObj = arguments[0];

  //   for (var i = 1; i < arguments.length; i++) {
  //     let addlObj = arguments[i];
  //     for (var key in addlObj) {
  //       baseObj[key] = addlObj[key];
  //     }
  //   }

  //   return baseObj;
  // };

  // // ES6 approach
  _.extend = function (...args) {
    return _.reduce(args, (newObj, addlObj) =>
      ({ ...newObj, ...addlObj }), {});
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (...obj) {
    return _.reduce(arguments, (baseObj, addlObj) => {
      for (let key in addlObj) {
        // baseObj[key] = baseObj[key] || addlObj[key]; // falsies trip this :(
        if (!baseObj.hasOwnProperty(key)) {
          baseObj[key] = addlObj[key];
        }
      }
      return baseObj;
    }, obj[0]);
  }

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    //   // TIP: These variables are stored in a "closure scope" (worth researching),
    //   // so that they'll remain available to the newly-generated function every
    //   // time it's called.

    let alreadyRun = false;
    let result;

    return function closureScope(...args) {
      if (!alreadyRun) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        // see here of for the apply(undefined, array) explanation
        // https://derickbailey.com/2015/11/16/kill-apply-with-the-spread-operator/
        // func(...args) === func.apply(this, arguments);
        // the spread operator automatically scopes to this environment (apply needs specifications supplied) 
        result = func(...args);
        // result = func.apply(this, arguments);
        alreadyRun = true;
      }
      return result;
    }
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    let hashTable = {};

    return function closure(...args) {
      const address = JSON.stringify(args);
      hashTable[address] = hashTable[address] || func(...args);
      return hashTable[address]
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait, ...args) {
    return setTimeout(() => func(...args), wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  _.shuffle = function (arr) {
    let randArr = [...arr];
    for (let i = arr.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * i);
      [randArr[i], randArr[randIndex]] = [randArr[randIndex], randArr[i]];
    }
    return randArr;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, ...args) {
    if (typeof functionOrKey === 'function') {
      return _.map(collection, elem => functionOrKey.call(elem));
    } else {
      return _.map(collection, elem => elem[functionOrKey].call(elem));
    }
  };

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
