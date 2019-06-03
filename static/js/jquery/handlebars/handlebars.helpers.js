/**!
Handlebars Helpers
**/

//var Handlebars = require('handlebars');

/* Increment index by one */
Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});


/* Custom Listing */
Handlebars.registerHelper('list', function(items, options) {
    var out = "<ul>";

    for (var i = 0, l = items.length; i < l; i++) {
        out = out + "<li>" + options.fn(items[i]) + "</li>";
    }

    return out + "</ul>";
});

/* Set selected attribute for select box */
// Handlebars.registerHelper('setSelected', function (input, value) {
//  if(input == value){
//      return 'selected';
//  } else {
//      return '';
//  }
// });

/* Set Selected for select box */
// Usage:
// <select>
//     {{#setSelected CurrentSort}}
//     <option value="1">Most Recent First</option>
//     <option value="2">Most Recent Last</option>
//     <option value="3">Fewest Helpful Votes</option>
//     {{/setSelected}}
// </select>
// Reference: https://stackoverflow.com/questions/13046401/how-to-set-selected-select-option-in-handlebars-template
Handlebars.registerHelper('setSelected', function(selected, options) {
    return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
});

/* Set checked attribut for select box */
/* Usage: @{{setChecked active_flag '1'}} */
Handlebars.registerHelper('setChecked', function (input, value) {
    if(input == value){
        return 'checked';
    } else {
        return '';
    }
});

/* Switch and Case */

// Handlebars.registerHelper("switch", function(value, options) {
//   this._switch_value_ = value;
//   var html = options.fn(this); // Process the body of the switch block
//   delete this._switch_value_;
//   return html;
// });

// Handlebars.registerHelper("case", function(value, options) {
//   if (value == this._switch_value_) {
//     return options.fn(this);
//   }
// });


/*
Usage:-

{{#switch state}}
    {{#case "page1" "page2"}}page 1 or 2{{/case}}
    {{#case "page3"}}page3{{/case}}
    {{#case "page4"}}page4{{/case}}
    {{#case "page5"}}
            {{#switch s}}
                {{#case "3"}}s = 3{{/case}}
                {{#case "2"}}s = 2{{/case}}
                {{#case "1"}}s = 1{{/case}}
                {{#default}}unknown{{/default}}
            {{/switch}}
    {{/case}}
    {{#default}}page0{{/default}}
{{/switch}}

*/

Handlebars.__switch_stack__ = [];

Handlebars.registerHelper( "switch", function( value, options ) {
    Handlebars.__switch_stack__.push({
        switch_match : false,
        switch_value : value
    });
    var html = options.fn( this );
    Handlebars.__switch_stack__.pop();
    return html;
} );

Handlebars.registerHelper( "case", function( value, options ) {

    // Poly fill for array from for older browsers
    if (!Array.from) {
      Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
          var number = Number(value);
          if (isNaN(number)) { return 0; }
          if (number === 0 || !isFinite(number)) { return number; }
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
          // 1. Let C be the this value.
          var C = this;

          // 2. Let items be ToObject(arrayLike).
          var items = Object(arrayLike);

          // 3. ReturnIfAbrupt(items).
          if (arrayLike == null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          }

          // 4. If mapfn is undefined, then let mapping be false.
          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;
          if (typeof mapFn !== 'undefined') {
            // 5. else
            // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function');
            }

            // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 2) {
              T = arguments[2];
            }
          }

          // 10. Let lenValue be Get(items, "length").
          // 11. Let len be ToLength(lenValue).
          var len = toLength(items.length);

          // 13. If IsConstructor(C) is true, then
          // 13. a. Let A be the result of calling the [[Construct]] internal method 
          // of C with an argument list containing the single item len.
          // 14. a. Else, Let A be ArrayCreate(len).
          var A = isCallable(C) ? Object(new C(len)) : new Array(len);

          // 16. Let k be 0.
          var k = 0;
          // 17. Repeat, while k < len… (also steps a - h)
          var kValue;
          while (k < len) {
            kValue = items[k];
            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }
            k += 1;
          }
          // 18. Let putStatus be Put(A, "length", len, true).
          A.length = len;
          // 20. Return A.
          return A;
        };
      }());
    }


    var args = Array.from( arguments );
    var options = args.pop();
    var caseValues = args;
    var stack = Handlebars.__switch_stack__[Handlebars.__switch_stack__.length - 1];
    
    if ( stack.switch_match || caseValues.indexOf( stack.switch_value ) === -1 ) {
        return '';
    } else {
        stack.switch_match = true;
        return options.fn( this );
    }
} );

Handlebars.registerHelper( "default", function( options ) {
    var stack = Handlebars.__switch_stack__[Handlebars.__switch_stack__.length - 1];
    if ( !stack.switch_match ) {
        return options.fn( this );
    }
} );


/*
Custom If condtion 
Usage: {{#ifCond var1 '==' var2}}
Reference: https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
*/
Handlebars.registerHelper('ifCondition', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});


/* Time Ago helper */
Handlebars.registerHelper('timeago', function(text)
{
    var dateString= new Handlebars.SafeString(text);
    var date = moment(dateString, 'YYYY-MM-DD HH:mm:ss').fromNow();

    return date;
});


/* Format time to AM/PM  */
Handlebars.registerHelper('formattime', function(text)
{
    var dateString= new Handlebars.SafeString(text);
    var result;

    if(moment(dateString, 'HH:mm:ss').isValid()){
        result = moment(dateString, 'HH:mm:ss').format('LT');
    } else {
        result = 'N/A';
    }

    return result;
});

/* Format date from YYYY-MM-DD to DD/MM/YYY  */
/* Usage: @{{formatdate value}} */
Handlebars.registerHelper('formatdate', function(text)
{
    var dateString= new Handlebars.SafeString(text);
    var result;

    if(moment(dateString, 'YYYYY-MM-DD').isValid()){
        result = moment(dateString, 'YYYY-MM-DD').format('DD/MM/YYYY');
    } else {
        result = 'N/A';
    }

    return result;
});

/* Format date from YYYY-MM-DD to DD MMM, YYYY  */
/* Usage: @{{formatReadabledate value}} */
Handlebars.registerHelper('formatReadabledate', function(text)
{
    var dateString= new Handlebars.SafeString(text);
    var result;

    if(moment(dateString, 'YYYYY-MM-DD').isValid()){
        result = moment(dateString, 'YYYY-MM-DD').format('DD MMM, YYYY');
    } else {
        result = 'N/A';
    }

    return result;
});

/* Replace text helper */
/* Usage @{{replacetext var "Tap to view details" ""}} */
Handlebars.registerHelper('replacetext', function(sourceText, targetText, replaceText)
{
    var context = new Handlebars.SafeString(sourceText);
    var string = context.string;
    var result = string.replace(targetText, replaceText);

    return result;
});

/* Replace N/A text if value is null */
Handlebars.registerHelper('check_na_helper', function(value)
{
    if(value == null || value == ""){
        result = 'N/A';
    } else {
        result = value;
    }

    return result;
});

/* Hide/Show attendance view column based on flag value */
Handlebars.registerHelper('hide_or_show_attendance_column', function(value)
{
    if(value == 1){
        result = ';';
    } else {
        result = 'display:none;';
    }

    return result;
});

/** Multiple if conditions **/
/*
** Handler to check multiple conditions **
Usage:
{{#IfMultipleCondition list.length '>' 0 '&&' public '==' true}} 
    <p>condition satisfied</p>
{{/IfMultipleCondition}}
*/
Handlebars.registerHelper('IfMultipleCondition', function (v1,o1,v2,mainOperator,v3,o2,v4,options) {
    
  var operators = {
       '==': function(a, b){ return a==b},
       '===': function(a, b){ return a===b},
       '!=': function(a, b){ return a!=b},
       '!==': function(a, b){ return a!==b},
       '<': function(a, b){ return a<b},
       '<=': function(a, b){ return a<=b},
       '>': function(a, b){ return a>b},
       '>=': function(a, b){ return a>=b},
       '&&': function(a, b){ return a&&b},
       '||': function(a, b){ return a||b},
    }

  var a1 = operators[o1](v1,v2);
  var a2 = operators[o2](v3,v4);

  var isTrue = operators[mainOperator](a1, a2);

  return isTrue ? options.fn(this) : options.inverse(this);
});


// Set active class carousel
Handlebars.registerHelper("carouselactive", function(value, options)
{
    var result = '';

    if(value == 0){
        result = 'active';
    }
    return result;
});


// Replace null value with -
/* Usage: @{{replaceNull value}} */
Handlebars.registerHelper("replaceNull", function(value, options)
{
    var result = '';

    if(value == null || value == ''){
        result = '-';
    } else {
        result = value;
    }
    
    return result;
});


// Return compiled html
/* Usage: @{{returnHtml value}} */
Handlebars.registerHelper("parseHtml", function(value, options)
{
    var result = '';

    if(value == null || value == ''){
        result = '-';
    } else {
        result = value;
    }

    console.log($.parseHTML(result));
    
    return $.parseHTML(result);
});


/* Convert helper */
Handlebars.registerHelper('convertpercent', function(availableLeaves, allocatedLeaves)
{
   var a = parseFloat(availableLeaves);
   var b = parseFloat(allocatedLeaves);
   var c = a/b;
   var result = (c*100).toFixed(1);
   // var result = Math.round(resultVal);
   //console.log(result);
    return result;
});


/** Check if an item is in array for Handlebars **/
/*
** Check if an item is in array for Handlebars **
* Usage:
* {{#each hobbies}}
*  <div style="{{#ifIn id ../favourites }}color: red{{/ifIn}}">
*      {{ name }}
* </div>
* {{/each}}
*/
Handlebars.registerHelper('ifIn', function(currentLeaveType, list, options) {
    var leaveTypeCode;
    var isTrue = false;

    if(list.length > 0){
        // console.log(elem);
        // console.log(list.length);

        for(i = 0; i < list.length; i++){
            leaveTypeCode = list[i].leave_type_code;
            if(leaveTypeCode == currentLeaveType){
                isTrue = true;
            }
        }
    }

  return isTrue ? options.fn(this) : options.inverse(this);
});

/* Get extension type from aws filename */
/* Usage: @{{getExtension active_flag}} */
Handlebars.registerHelper('getExtension', function (filename) {
    // console.log(filename);
    var extensionType;
    var extension = filename.substr( (filename.lastIndexOf('.') +1) );
    switch(extension) {
        case 'jpg':
        case 'jpeg':
        case 'JPG':
        case 'JPEG':
        case 'png':
        case 'PNG':
            extensionType = 'image';
            // console.log('image');  
        break;                         
        default:
            extensionType = 'nonimage';
            // console.log('nonimage');
    }
    return extensionType;
});