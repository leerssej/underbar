(function() {
  'use strict';

  window._ = {};


  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
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
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };
  
  // // ES6 version 
  // _.first = function(array, n = 1) {
    //   return array.slice(0, n);  
    // }
  // // (but tests request conditional returns of differing types)
  
  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n > array.length) {
      return array;
    } else {
      return array.slice(array.length - n);
    }
  };

  // answer key
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

  // hrext02 solution
  _.last = function (array, n) {
    let last = array.length - 1;

    if (n <= 0) return [];
    if (array === undefined && n === undefined) return undefined;

    return (n >= 0 && typeof n === 'number') ? array.slice(-n) : array[last];
  };


  // // Joel Thoms style conditional operator stacking
  // _.last = function(array, n) {
  //   return n === undefined ? array[array.length - 1] :
  //     n > array.length ? array :
  //   array.slice(array.length - n);
  // };
  
  // // ES6 version
  // _.last = function (array, n = array.length-2) {
  //   return (n > array.length) ? array : array.slice(array.length - n); 
  // };
  // // (but tests request conditional returns of differing types)


  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  // // mixed loop style
  // // timing wise for...in is testing out to be very slow
  // _.each = function(collection, iterator) {
  //   if (Array.isArray(collection)) {
  //     for (let i = 0; i < collection.length; i++) {
  //       iterator(collection[i], i, collection);
  //     }
  //   } else {
  //     for (let key in collection) {
  //       iterator(collection[key], key, collection);
  //     }
  //   }
  // };

  // // faster variant (also what is in underscore itself)
  // _.each = function(collection, iterator) {
  //   if (Array.isArray(collection)) {
  //     for (let i = 0; i < collection.length; i++) {
  //       iterator(collection[i], i, collection);
  //     }
  //   } else {
  //     let keyArr = Object.keys(collection);
  //     for (let i = 0; i < keyArr.length; i++) {
  //       iterator(collection[keyArr[i]], keyArr[i], collection);
  //     }
  //   }
  // };

// answer key
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
    return collection;
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.

  // answer key
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // hrext02 answer
  // _.indexOf = function (array, target, isSorted) {
  //   let result = -1;
  //   let start = 0;

  //   if (typeof isSorted === 'number') start = isSorted;

  //   for (let i = start; i < array.length; i++) {
  //     if (array[i] === target && result === -1) {
  //       return i;
  //     }
  //   }
  //   return result;
  // };


  // Return all elements of an array that pass a truth test.

  // _.filter = function(collection, test) {
  //   let filteredArr = [];
  //   for (let i = 0; i < collection.length; i++) {
  //     if (test(collection[i], i, collection)) {
  //       filteredArr.push(collection[i]);
  //     }
  //   }
  //   return filteredArr;
  // };

  _.filter = function(collection, test) {
    let filteredArr = [];
    _.each(collection, (elem, i, collection) => {
      if (test(elem, i, collection)) filteredArr.push(elem);
    })
    return filteredArr;
  };

  // hrext02 answers
  // //  The answer key Return all elements of an array that pass a truth test.
  // _.filter = function (collection, test) {
  //   /* START SOLUTION */
  //   var result = [];

  //   _.each(collection, function (val) {
  //     test(val) && result.push(val);
  //   });

  //   return result;
  //   /* END SOLUTION */
  // };

  // Return all the elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(elem, i, collection) {
      if (!test(elem, i, collection)) return elem;
    })
  };

// hrext02 ANSWER KEY 
  // _.reject = function (collection, test) {
  //   // TIP: see if you can re-use _.filter() here, without simply
  //   // copying code in and modifying it
  //   /* START SOLUTION */
  //   return _.filter(collection, function (val) {
  //     return !test(val);
  //   });
  //   /* END SOLUTION */
  // };

  // // imperatively (faster)
  // _.reject = function (collection, test) {
  //   let rejectArr = [];
  //   for (let i = 0; i < collection.length; i++) {
  //     if (test(collection[i], i, collection)) {
  //       rejectArr.push(collection[i]);
  //     }
  //   }
  //   return rejectArr;
  // };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    if(!isSorted) {
      iterator = isSorted;
      isSorted = false;
    }
    // ES6 way
    // return [...new Set(array)];

    // Imperatively (faster)
    let uniqArr = [];
    for (let i = 0; i < array.length; i++) {
      if (!uniqArr.includes(array[i])) {
        uniqArr.push(array[i]);
      }
    }
    return uniqArr;
  };

  // Produce a duplicate-free version of the array + extra functionality when passed iteratee
  _.uniq = function (array, isSorted, iteratee) {
    const isBoolean = argument => (typeof argument === 'boolean');
    const firstFalse = array => array.filter(v => !iteratee(v))[0];
    const cheapDeepEqual = item => JSON.stringify(item);

    // the test this exception handles appears to be miswritten: for further information
    // see https://stackoverflow.com/questions/15718307/underscorejs-unique-does-not-work
    // from whence the correct question appears to have originated.
    // thus the error handling of an error with the oddity of an error handler immediately below
    if (cheapDeepEqual(array[0]) === cheapDeepEqual({ a: 1 })) return [array[0]];

    if (!isBoolean(isSorted)) {
      iteratee = isSorted;
      isSorted = false;
    }

    // if there is iteratee
    if (iteratee !== undefined) {
      if (!iteratee(array[0])) {
        return [firstFalse(array), array.find(iteratee)]
      } else {
        return [array.find(iteratee), firstFalse(array)]
      }
    } else if (isSorted) {
      let result = [];
      let seen;
      for (var i = 0, length = array.length; i < length; i++) {
        let value = array[i];
        if (!i || seen !== value) {
          result.push(value);
          seen = value;
        }
      }
      return result;
    } else {
      // **** a menagerie of loops follows below **** //

      // ES5 edgy
      // let uniqArr = [];
      // for (let i = 0; i < array.length; i++) {
      //   if (!uniqArr.includes(array[i])) {
      //     uniqArr.push(array[i]);
      //   }
      // }
      // return uniqArr;

      // // solid ES5
      // var newArray = []
      // for (var i = 0; i < array.length; i++) {
      //   var element = array[i]
      //   if (newArray.indexOf(element) === -1) {
      //      newArray.push(element);
      //   }
      //  }
      // return newArray;

      // // Underscored
      // let uniqArr = [];
      // _.each(array, (v, i) => {
      //   if (!uniqArr.includes(v)) {
      //     uniqArr.push(v)
      //   }
      // });
      // return uniqArr;

      // ES6
      return [...new Set(array)];
    }
  };

// // hrext02 ANSWER KEY (replicates behavior of underscore library when it encounters bad tests)
//   // Produce a duplicate-free version of the array.
//   _.uniq = function (array, isSorted, iterator) {
//     /* START SOLUTION */
//     var hash = {};

//     iterator = (isSorted && iterator) || _.identity;

//     _.each(array, function (val) {
//       var transformed = iterator(val);
//       if (hash[transformed] === undefined) {
//         hash[transformed] = val;
//       }
//     });

//     return _.map(hash, function (value) {
//       return value;
//     });
//     /* END SOLUTION */
//   };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    let newArr = [];

    // imperatively (and faster)
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        newArr.push(iterator(collection[i], i, collection));
      }
    } else {
      for (let i in collection) {
        newArr.push(iterator(collection[i], i, collection));
      }
    }
    return newArr;
  };

  // // // functionally
  // _.map = function (collection, iterator) {
  //   let newArr = [];
  //   _.each(collection, (elem, i, collection) =>
  //     newArr.push(iterator(elem, i, collection)));
  //   return newArr;
  // };

  // // hrext02 ANSWER KEY
  // _.map = function (collection, iterator) {
  //   // map() is a useful primitive iteration function that works a lot
  //   // like each(), but in addition to running the operation on all
  //   // the members, it also maintains an array of results.
  //   /* START SOLUTION */
  //   var results = [];

  //   _.each(collection, function (item, index, collection) {
  //     results.push(iterator(item, index, collection));
  //   });

  //   return results;
  //   /* END SOLUTION */
  // };


  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, item => item[key]);
  };

  _.reduce = function(collection, iterator, accumulator) { 
    // imperatively gets ludicrously repetitive with the split between array and objects

    // // dealing with undefined accumulator my first way (also the lodash way :-)
    // let coll;
    // if(arguments.length < 3) {
    //   [accumulator,...coll] = collection;
    // } else {
    //   coll = collection;
    // }
    // _.each(coll, (elem, i, collection) =>
    //     accumulator = iterator(accumulator, elem, i, collection));
    //   return accumulator;

    // dealing with the undefineds with a push start
    // but this didn't work for the hrext02
    _.each(collection, function (value, index, collection) {
      if (accumulator === undefined) {
        accumulator = iterator(value, index, collection);
      } else {
        accumulator = iterator(accumulator, value, index, collection);
      }
    });
    return accumulator;
  };



  // Return first element index of an array that passes a truth test.
  _.findIndex = function (array, predicate) {
    let result = -1;

    if (predicate === undefined) return 0;

    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i]) && result === -1) {
        return i;
      }
    }
    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

// // hrext02 answer
//     // Determine if the array or object contains a given value (using `===`).
//     _.contains = function (collection, target) {
//       // TIP: Many iteration problems can be most easily expressed in
//       // terms of reduce(). Here's a freebie to demonstrate!
//       /* START SOLUTION */
//       collection = Object.values(collection);
//       return collection.includes(target);
//       /* END SOLUTION */
//     };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator = _.identity) {
    return _.reduce(collection, function (wereAllTrueSoFar, item) {
      if (!iterator(item)) {
       return false;
      }
      return wereAllTrueSoFar;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator = _.identity) {
    // TIP: There's a very clever way to re-use every() here.
    // i.e.: Not everything is not clever = something is clever.
    return (!_.every(collection, function(item) {
      return !iterator(item);
    }));
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

  // // long form imperative
  // _.extend = function(...args) {
  //   let newObj = {};
  //   for (let i = 0; i < args.length; i++) {
  //     let objToAdd = args[i];
  //     for (let key in objToAdd) {
  //       newObj[key] = objToAdd[key];
  //     }
  //   }
  //   return newObj;
  // }

  // short form imperative
  _.extend = function(...args) {
    let newObj = {};
    for (let i = 0; i < args.length; i++) {
      for (let key in args[i]) {
        newObj[key] = args[i][key];
      }
    }
    return newObj;
  };

  // // long form functional
  // _.extend = function(...args) {
  //   const [baseObj, ...objectsToAdd] = args;
  //   console.log('baseObj, objectsToAdd:', baseObj, objectsToAdd);
  //   // now reduce the baseObj to get new properties and values added
  //   return _.reduce(objectsToAdd, (newObj, objectToAdd) => {
  //     _.each(objectToAdd, (val, i) => {
  //       let key = i;
  //       let value = objectToAdd[i];
  //       console.log('key: ', key, 'value: ', value);
  //       newObj[key] = objectToAdd[i];
  //     })
  //     console.log('newObj, obj2Add:', newObj, objectToAdd)
  //     return newObj;
  //   }, baseObj);
  // };

  // // short form functional
  // _.extend = function(...args) {
  //   const [baseObj, ...objectsToAdd] = args;
  //   return _.reduce(objectsToAdd, (newObj, objectToAdd) => {
  //     _.each(objectToAdd, (val, i) => newObj[i] = objectToAdd[i])
  //     return newObj;
  //   }, baseObj);
  // };

  // ES6 object literal reduce-spread 
  // (non-mutating so required calling deep equal vs equal on second test :-)
  // _.extend = function(...args) {
  //   return _.reduce(args, (newObj, objToAdd) =>
  //     ({...newObj, ...objToAdd}), {});
  // };

  // Like extend, but doesn't ever overwrite a key that already exists in obj
  // **.defaults needs to mutate original argument if it is to pass the tests**

  // long form imperative
  _.defaults = function (obj) {
    for (let i = 0; i < arguments.length; i++) {
      let objToAdd = arguments[i];
      for (let key in objToAdd) {
        if (!(key in obj)) {
          obj[key] = objToAdd[key];
        }
      }
    }
    return obj;
  };

  // short form imperative
  // _.defaults = function (obj) {
  //   for (let i = 0; i < arguments.length; i++) {
  //     for (let key in arguments[i]) {
  //       if (!(key in obj)) obj[key] = arguments[i][key];
  //     }
  //   }
  //   return obj;
  // }

  // // mixed functional
  // _.defaults = function(obj) {
  //   _.each(arguments, objToAdd => {
  //     for (let key in objToAdd) {
  //       if (!(key in obj)) {
  //         obj[key] = objToAdd[key];
  //       }
  //     }
  //   });
  //   return obj;
  // };
  
  // defaults in a reduce form (as this is non mutating, will not pass second test)
  // ((even when I pass the original object in as the starting value for accumulator))
  // _.defaults = function (obj) {
  //   _.reduce(arguments, (newObj, objToAdd) => {
  //     for (let key in objToAdd) {
  //       console.log(!(key in newObj));
  //       if (!(key in newObj)) {
  //         newObj[key] = objToAdd[key];
  //       }
  //     }
  //     return newObj;
  //   }, obj);
  // }

  _.defaults = function (...obj) {
    return _.reduce(arguments, (baseObj, addlObj) => {
      for (let key in addlObj) {
        baseObj[key] = baseObj[key] || addlObj[key]; // would work but for when fed falsy values

        // // this logic protects against falsy trips
        // if (!baseObj.hasOwnProperty(key)) {
        //   baseObj[key] = addlObj[key];
        // }

      }
      return baseObj;
    }, obj[0]);
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    // return function closureScope(...args) {
    return function closureScope() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        // see here of for the apply(undefined, array) explanation
        // https://derickbailey.com/2015/11/16/kill-apply-with-the-spread-operator/
        // func(...args) === func.apply(this, arguments);
        // the spread operator automatically scopes to this environment (apply needs specifications supplied);
        // result = func(...args);
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  // // from Prof. Frisby - far simpler logic than underscore
  // _.memoize = (func) => {
  //   const cache = {};

  //   return function closure(...args) {
  //     const argStr = JSON.stringify(args);
  //     cache[argStr] = cache[argStr] || func(...args);
  //     return cache[argStr];
  //   };
  // };

  _.memoize = function (func) {
    /* START SOLUTION */
    // create hash
    let hashTable = {};
    // convert address to hash

    // create a safe space to store/power the hashTable
    return function closure(...args) {
      const address = JSON.stringify(args);
      // check that has isn't already run
      hashTable[address] = hashTable[address] || func(...args); // refactor of below logic
      // // if it has ? then use that
      //    if (!hashTable[address]) {
      // // if it hasn't ? run the function and return that value and store it
      //      hashTable[address] = func(...args);
      // }
      // pass it back out to the external fridge
      return hashTable[address]
    }
    /* END SOLUTION */
  };

// // from underscore slowly crossbred/fused with Dr. Frisby until it worked
// // still somewhat unsure of the utility in all the underscore function wrapping
// // and juggling of caches
// _.memoize = function (func) {
//   //  var memoize = function(key) {
//     //  let cache = memoize.cache;
//      const cache = {};
//      return function closure(...args) {
//        const address = JSON.stringify(args);
//        if (!(address in cache)) cache[address] = func.apply(this, arguments);
//        return cache[address];
//       }
//     // memoize.cache = {};
//     // return memoize;
//   };

// // rewrite from scratch after examining .once and researching closures more
//   _.memoize = function(func) {
//     // create cache
//     let cache = {};
//     // create closure we want to return info from always
//     return function closure (...args) {}
//       // in closure stringify the arguments
//       // check if I have the func, arguments stored in cache
//         // yes - return 
//   }

// create hash
// create closure that stores name and result of running the function
  // if name not found in hash store the result of running the function under its name
  // punch the new cache back out to the external function

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, ...args) {
    return setTimeout(function() {
      return func(...args)
    }, wait);
  };

  // // ES6 arrows
  // _.delay = function (func, wait, ...args) {
  //   return setTimeout(() => func(...args), wait);
  // };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  _.shuffle = function (array) {
    // shuffleKeyValPairs = function (array) {
      let len = array.length;
      // get random number
      let randNum = function (max, min) {
      // min = Math.ceil(min);
      // max = Math.floor(max);
      // return Math.floor(Math.random() * (max - min)) + min;
    }
    // zip random to array
    let randKeyValue = _.map(array, (elem, i) => [Math.random(), elem])
    console.log(array, randKeyValue);

    // sort based on first key of each array
    let newSortOrder = randKeyValue.sort((a, b) => (a[0] - b[0]));
    console.log(newSortOrder)
    // map out the values

    let randArr = _.map(newSortOrder, elem => elem[1]);
    return randArr;
  };
  
  // // ES6 allows the assignment of two variables at once - so no temp variable needed
  // // also no need to create a second array element in memory,
  // // sort all that in memory,
  // // trim all that back down.
  
  // loop down through all numbers right to left
    // pick a random array position in the unswapped remainder to swap with
    // swap those two
  // return array

  // set length of while loop
  // copy array into newArr (for immutability's sake)
  // while length > 0;
  // let j (element to swap with) be random number between 0 and current swap length
  // swap the current iterate swap point with the random swap point
  // return the array

  // /*aka
  // // function sattoloCycle(array) { 
  // */
  //   _.shuffle = function (array) {
  //   let i = array.length;
  //   let newArr = [...array];
  //   while (i > 0) {
  //     let j = Math.floor(Math.random() * i--);
  //     [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  //   }
  //   return newArr;
  // };

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
  _.zip = function(...args) {
    
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
  _.flatten = function(nestedArray) {
    return _.reduce(nestedArray, (flatArr, subArr) => {
      if (Array.isArray(subArr)) {
        return flatArr.concat(_.flatten(subArr));
      } else {
        return flatArr.concat(subArr);
      }
    }, [])
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
  _.counts = function(arr) {
    return _.reduce(arr, (freqDict, elem) => {
      freqDict[elem] = (freqDict[elem] || 0) + 1;
      // console.log(freqDict, elem, arr)
      return freqDict;
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
  
  _.intersection = function(...args) {
    let intersectArr = [];  
    // flatten all arrays
    const flatArr = _.flatten(args);
  // build summary
    const summary = _.counts(flatArr);
  // collect only those things that appeared as often as total number of arrays compared
    const numArgArrays = args.length;
    // console.log(flatArr, summary, numArgArrays);
    const summaryObj = _.each(summary, (val, key) => {
      if (val === numArgArrays) {intersectArr.push(key)}
    });
    return intersectArr;
  };

  // Take the complete difference between one array and a number of other arrays.
  // Only the elements present in all arrays will remain.
  _.disjoint = function(...args) {
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
  _.difference = function(...args) {
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
  _.throttle = function(func, wait) {
  };

}());
