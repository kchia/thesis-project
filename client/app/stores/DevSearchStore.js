var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DevSearchConstants = require('../constants/DevSearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var countryData = {
"BRN":{"2013":1,"2014":3,"fillKey":"Python","allLangs":[["Python",2],["CSS",1],["JavaScript",1],["Shell",1]],"countryCode3":"BRN","countryCode2":"BN","countryName":"Brunei Darussalam"},
"THA":{"2013":302,"2014":584,"fillKey":"JavaScript","allLangs":[["JavaScript",250],["CSS",128],["PHP",120],["Java",118],["Python",111],["Ruby",87],["C",66],["Objective-C",56],["C++",55],["Shell",53],["Go",35],["C#",32],["CoffeeScript",32],["VimL",28],["Swift",21],["OCaml",13],["Perl",11],["Arduino",10],["Emacs Lisp",6],["Visual Basic",6],["Elixir",5],["R",5],["Scala",5],["TeX",5],["AppleScript",4],["Clojure",4],["Lua",4],["Makefile",4],["Puppet",4],["Common Lisp",3],["Erlang",3],["Haskell",3],["ActionScript",2],["Assembly",2],["Dart",2],["Objective-C++",2],["PowerShell",2],["Prolog",2],["Rust",2],["AutoIt",1],["Crystal",1],["Frege",1],["Groovy",1],["Haxe",1],["Julia",1],["LiveScript",1],["Logos",1],["Matlab",1],["Nimrod",1],["Pascal",1],["Processing",1],["Squirrel",1],["TypeScript",1],["Vala",1],["XSLT",1]],"countryCode3":"THA","countryCode2":"TH","countryName":"Thailand"},
"USA":{"2013":47736,"2014":74250,"fillKey":"JavaScript","allLangs":[["JavaScript",29335],["CSS",15776],["Python",15359],["Ruby",12699],["Java",10682],["C++",7139],["Shell",7096],["C",7074],["PHP",6999],["Objective-C",4867],["C#",4015],["Go",3912],["CoffeeScript",2831],["VimL",2712],["R",1544],["Swift",1491],["Scala",1468],["JavaScript",1456],["Perl",1380],["TeX",1045],["Clojure",1025],["Emacs Lisp",997],["Ruby",864],["OCaml",829],["Haskell",730],["Python",695],["CSS",662],["Rust",571],["Lua",539],["Groovy",443],["Matlab",418],["Puppet",410],["Arduino",409],["PowerShell",393],["Java",381],["TypeScript",380],["Shell",378],["Objective-C",377],["Go",342],["Erlang",310],["Elixir",297],["C",281],["Assembly",259],["XSLT",253],["C++",247],["Visual Basic",229],["CoffeeScript",205],["Julia",203],["Processing",203],["PHP",194],["Makefile",192],["Scheme",172],["VimL",170],["ActionScript",150],["Swift",141],["FORTRAN",131],["Common Lisp",130],["D",118],["Haxe",116],["Racket",115],["Prolog",110],["F#",108],["Dart",106],["Scala",105],["AppleScript",101],["Objective-C++",95],["AGS Script",83],["ASP",82],["C#",80],["OCaml",69],["Verilog",68],["Nix",58],["Crystal",57],["Cuda",57],["Clojure",56],["Perl",56],["ColdFusion",54],["Apex",48],["OpenSCAD",48],["OpenEdge ABL",47],["Pascal",44],["Vala",44],["IDL",43],["Emacs Lisp",41],["LiveScript",41],["Rust",40],["Max",39],["PureScript",38],["Tcl",38],["VHDL",38],["Kotlin",35],["Elm",33],["Mathematica",33],["Gosu",32],["Logos",32],["Standard ML",31],["SQF",30],["Haskell",30],["Coq",29],["Game Maker Language",27],["R",26],["Erlang",25],["AutoHotkey",24],["Lua",23],["Nemerle",23],["Groovy",22],["Awk",20],["XQuery",20],["SAS",19],["Squirrel",19],["M",19],["Puppet",18],["Nimrod",18],["Pure Data",17],["nesC",16],["Stata",16],["VCL",16],["SQL",15],["TeX",15],["TypeScript",15],["Propeller Spin",15],["Elixir",14],["GAP",14],["SourcePawn",14],["Thrift",14],["Arduino",13],["BlitzBasic",13],["LabVIEW",13],["Perl6",13],["Frege",12],["Gnuplot",12],["J",12],["Mercury",12],["Objective-C++",11],["Processing",11],["Red",11],["SuperCollider",11],["Julia",10],["Objective-J",10],["AGS Script",9],["XSLT",9],["Agda",9],["DM",9],["DOT",9],["MoonScript",9],["NetLogo",9],["SystemVerilog",9],["Matlab",8],["Ada",8],["ANTLR",8],["Eiffel",8],["Io",8],["ActionScript",7],["AppleScript",7],["Assembly",7],["Arc",7],["Elm",6],["Thrift",6],["AutoIt",6],["Bluespec",6],["Delphi",6],["Factor",6],["REALbasic",6],["wisp",6],["Rebol",5],["UnrealScript",5],["Common Lisp",5],["Haxe",5],["Makefile",5],["Brightscript",5],["Bro",5],["COBOL",5],["Hack",5],["Lasso",5],["Apex",4],["F#",4],["PowerShell",4],["Prolog",4],["Visual Basic",4],["AspectJ",4],["ATS",4],["Boo",4],["Inform 7",4],["Smalltalk",4],["Scilab",3],["Slash",3],["Crystal",3],["LiveScript",3],["PureScript",3],["Scheme",3],["Augeas",3],["Cycript",3],["Fantom",3],["Grammatical Framework",3],["Idris",3],["LSL",3],["ColdFusion",2],["D",2],["Dart",2],["Gosu",2],["IDL",2],["Logos",2],["M",2],["Mercury",2],["Nix",2],["OpenEdge ABL",2],["Racket",2],["Red",2],["Standard ML",2],["Vala",2],["Bison",2],["Dylan",2],["Forth",2],["Glyph",2],["Hy",2],["JSONiq",2],["Papyrus",2],["Ragel in Ruby Host",2],["Self",1],["Turing",1],["XC",1],["XML",1],["Xojo",1],["XProc",1],["Xtend",1],["Zephir",1],["ABAP",1],["Arc",1],["AutoHotkey",1],["AutoIt",1],["Dylan",1],["Factor",1],["FORTRAN",1],["Idris",1],["MoonScript",1],["nesC",1],["Nimrod",1],["Opal",1],["Scilab",1],["SQL",1],["Tcl",1],["APL",1],["Ceylon",1],["Chapel",1],["CLIPS",1],["Ecl",1],["EmberScript",1],["Fancy",1],["GAMS",1],["GDScript",1],["Grace",1],["Harbour",1],["Isabelle",1],["KRL",1],["Logtalk",1],["LOLCODE",1],["LookML",1],["Mirah",1],["Monkey",1],["Nu",1],["ooc",1],["Parrot",1],["PAWN",1],["PigLatin",1],["PogoScript",1]],"countryCode3":"USA","countryCode2":"US","countryName":"United States"}
};

var languageData = {};
var developersByLanguage = {};
var developersByCountry = {};
/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

var DevSearchStore = assign({}, EventEmitter.prototype, {
  //ajax request to the server
  //server returns a json of all the countries, much like our mock data above.
  getCountryDataFromServer: function() {
    $.ajax({
      url: 'api/1/allCountriesAllLanguages',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        countryData = data;
        this.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getAllFiles', status, err.toString());
      }.bind(this)
    });

    var returnedData = countryData;
  },

  getLanguageData: function(language) {

    $.ajax({
      url: 'api/1/countriesForLanguage?' + language,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        languageData = data || returnData;
        this.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getAllFiles', status, err.toString());
      }.bind(this)
    });

    var returnedData = {"ARE":{"fillKey":78},"AFG":{"fillKey":1},"ALB":{"fillKey":13},"ARM":{"fillKey":37},"AGO":{"fillKey":3},"ATA":{"fillKey":5},"ARG":{"fillKey":660},"AUT":{"fillKey":493},"AUS":{"fillKey":1867},"AZE":{"fillKey":11},"BIH":{"fillKey":27},"BRB":{"fillKey":1},"BGD":{"fillKey":233},"BEL":{"fillKey":657},"BFA":{"fillKey":1},"BGR":{"fillKey":381},"BHR":{"fillKey":6},"BDI":{"fillKey":1},"BEN":{"fillKey":29},"BMU":{"fillKey":5},"BRN":{"fillKey":1},"BOL":{"fillKey":34},"BRA":{"fillKey":1741},"BHS":{"fillKey":1},"BTN":{"fillKey":1},"BWA":{"fillKey":1},"BLR":{"fillKey":321},"BLZ":{"fillKey":1},"CAN":{"fillKey":3436},"COD":{"fillKey":5},"CHE":{"fillKey":774},"CHL":{"fillKey":243},"CMR":{"fillKey":5},"CHN":{"fillKey":7546},"COL":{"fillKey":229},"CRI":{"fillKey":94},"CUB":{"fillKey":16},"CPV":{"fillKey":1},"CYP":{"fillKey":40},"CZE":{"fillKey":475},"DEU":{"fillKey":4509},"DNK":{"fillKey":615},"DOM":{"fillKey":60},"DZA":{"fillKey":25},"ECU":{"fillKey":43},"EST":{"fillKey":137},"EGY":{"fillKey":151},"ERI":{"fillKey":78},"ESP":{"fillKey":1565},"ETH":{"fillKey":3},"FIN":{"fillKey":572},"FRO":{"fillKey":2},"FRA":{"fillKey":3635},"GBR":{"fillKey":5313},"GRD":{"fillKey":4},"GEO":{"fillKey":31},"GGY":{"fillKey":2},"GHA":{"fillKey":36},"GIB":{"fillKey":8},"GRL":{"fillKey":2},"GMB":{"fillKey":1},"GLP":{"fillKey":3},"GRC":{"fillKey":273},"GTM":{"fillKey":48},"GUY":{"fillKey":1},"HKG":{"fillKey":236},"HND":{"fillKey":14},"HRV":{"fillKey":118},"HUN":{"fillKey":303},"IDN":{"fillKey":525},"IRL":{"fillKey":428},"ISR":{"fillKey":377},"IMN":{"fillKey":2},"IND":{"fillKey":3098},"IRQ":{"fillKey":14},"IRN":{"fillKey":170},"ISL":{"fillKey":72},"ITA":{"fillKey":1108},"JEY":{"fillKey":7},"JAM":{"fillKey":17},"JOR":{"fillKey":39},"JPN":{"fillKey":2120},"KEN":{"fillKey":99},"KGZ":{"fillKey":19},"KHM":{"fillKey":29},"KOR":{"fillKey":577},"KWT":{"fillKey":10},"CYM":{"fillKey":1},"KAZ":{"fillKey":58},"LBN":{"fillKey":29},"LIE":{"fillKey":1},"LKA":{"fillKey":124},"LTU":{"fillKey":124},"LUX":{"fillKey":62},"LVA":{"fillKey":117},"LBY":{"fillKey":2},"MAR":{"fillKey":61},"MCO":{"fillKey":3},"MDA":{"fillKey":65},"MNE":{"fillKey":7},"MDG":{"fillKey":13},"MKD":{"fillKey":37},"MMR":{"fillKey":26},"MNG":{"fillKey":11},"MAC":{"fillKey":9},"MTQ":{"fillKey":1},"MLT":{"fillKey":22},"MUS":{"fillKey":11},"MDV":{"fillKey":8},"MWI":{"fillKey":4},"MEX":{"fillKey":395},"MYS":{"fillKey":163},"MOZ":{"fillKey":3},"NAM":{"fillKey":8},"NGA":{"fillKey":74},"NIC":{"fillKey":27},"NLD":{"fillKey":1774},"NOR":{"fillKey":653},"NPL":{"fillKey":75},"NIU":{"fillKey":1},"NZL":{"fillKey":514},"OMN":{"fillKey":1},"PAN":{"fillKey":18},"PER":{"fillKey":70},"PYF":{"fillKey":2},"PNG":{"fillKey":1},"PHL":{"fillKey":314},"PAK":{"fillKey":158},"POL":{"fillKey":806},"PRI":{"fillKey":34},"PSE":{"fillKey":8},"PRT":{"fillKey":485},"PRY":{"fillKey":16},"QAT":{"fillKey":9},"REU":{"fillKey":3},"ROU":{"fillKey":365},"SRB":{"fillKey":135},"RUS":{"fillKey":2405},"RWA":{"fillKey":13},"SAU":{"fillKey":33},"SDN":{"fillKey":2},"SWE":{"fillKey":1133},"SGP":{"fillKey":409},"SVN":{"fillKey":113},"SVK":{"fillKey":114},"SMR":{"fillKey":2},"SEN":{"fillKey":5},"SOM":{"fillKey":5},"SLV":{"fillKey":43},"SYR":{"fillKey":12},"TCA":{"fillKey":2},"THA":{"fillKey":250},"TJK":{"fillKey":3},"TUN":{"fillKey":54},"TUR":{"fillKey":482},"TTO":{"fillKey":8},"TWN":{"fillKey":737},"TZA":{"fillKey":11},"UKR":{"fillKey":1294},"UGA":{"fillKey":27},"USA":{"fillKey":1456},"URY":{"fillKey":90},"UZB":{"fillKey":21},"VCT":{"fillKey":1},"VEN":{"fillKey":151},"VIR":{"fillKey":1},"VNM":{"fillKey":323},"YEM":{"fillKey":3},"ZAF":{"fillKey":354},"ZMB":{"fillKey":2},"ZWE":{"fillKey":3}};
    //ajax request with the language
    //server return a formatted json with only information for that langauge
    //or maybe we build that logic into the client, right here in this function
  },

  getDeveloperCountByLanguage: function() {
    $.ajax({
      url: 'api/1/developerCountyByLanguage',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        developersByLanguage = data || returnedData;
        this.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getDeveloperCountByLanguage', status, err.toString());
      }.bind(this)
    });

    var returnedData= [{"language":"JavaScript","activeProgrammers":224050},{"language":"Java","activeProgrammers":139127},{"language":"Python","activeProgrammers":116128},{"language":"CSS","activeProgrammers":113774},{"language":"PHP","activeProgrammers":80705},{"language":"C++","activeProgrammers":70489},{"language":"Ruby","activeProgrammers":70029},{"language":"C","activeProgrammers":67456},{"language":"Shell","activeProgrammers":45709},{"language":"C#","activeProgrammers":44479},{"language":"Objective-C","activeProgrammers":37411},{"language":"Go","activeProgrammers":22434},{"language":"CoffeeScript","activeProgrammers":16843},{"language":"VimL","activeProgrammers":15904},{"language":"R","activeProgrammers":12313},{"language":"Scala","activeProgrammers":10446},{"language":"Swift","activeProgrammers":9763},{"language":"TeX","activeProgrammers":9233},{"language":"Perl","activeProgrammers":9091},{"language":"Lua","activeProgrammers":5853},{"language":"Emacs Lisp","activeProgrammers":5601},{"language":"Clojure","activeProgrammers":4742},{"language":"Haskell","activeProgrammers":4433},{"language":"OCaml","activeProgrammers":4304},{"language":"Matlab","activeProgrammers":4007},{"language":"Groovy","activeProgrammers":3868},{"language":"TypeScript","activeProgrammers":3693},{"language":"Arduino","activeProgrammers":3023},{"language":"Rust","activeProgrammers":2851},{"language":"PowerShell","activeProgrammers":2768},{"language":"Erlang","activeProgrammers":2396},{"language":"Puppet","activeProgrammers":2246},{"language":"XSLT","activeProgrammers":1994},{"language":"Assembly","activeProgrammers":1895},{"language":"ActionScript","activeProgrammers":1858},{"language":"Visual Basic","activeProgrammers":1794},{"language":"Processing","activeProgrammers":1413},{"language":"Makefile","activeProgrammers":1397},{"language":"Elixir","activeProgrammers":1231},{"language":"ASP","activeProgrammers":1164},{"language":"D","activeProgrammers":1101},{"language":"Julia","activeProgrammers":1026},{"language":"Scheme","activeProgrammers":1006},{"language":"Haxe","activeProgrammers":983},{"language":"Objective-C++","activeProgrammers":934},{"language":"Prolog","activeProgrammers":896},{"language":"F#","activeProgrammers":888},{"language":"Common Lisp","activeProgrammers":861},{"language":"Dart","activeProgrammers":766},{"language":"Pascal","activeProgrammers":753},{"language":"FORTRAN","activeProgrammers":749},{"language":"AGS Script","activeProgrammers":638},{"language":"Stata","activeProgrammers":559},{"language":"Racket","activeProgrammers":512},{"language":"Verilog","activeProgrammers":500},{"language":"VHDL","activeProgrammers":495},{"language":"Vala","activeProgrammers":471},{"language":"AppleScript","activeProgrammers":430},{"language":"Kotlin","activeProgrammers":425},{"language":"DM","activeProgrammers":381},{"language":"Mathematica","activeProgrammers":344},{"language":"SQF","activeProgrammers":338},{"language":"Cuda","activeProgrammers":332},{"language":"IDL","activeProgrammers":318},{"language":"Logos","activeProgrammers":305},{"language":"Nix","activeProgrammers":295},{"language":"OpenSCAD","activeProgrammers":289},{"language":"Tcl","activeProgrammers":274},{"language":"Crystal","activeProgrammers":273},{"language":"AutoHotkey","activeProgrammers":261},{"language":"Game Maker Language","activeProgrammers":258},{"language":"Apex","activeProgrammers":254},{"language":"LiveScript","activeProgrammers":252},{"language":"Standard ML","activeProgrammers":233},{"language":"OpenEdge ABL","activeProgrammers":228},{"language":"ColdFusion","activeProgrammers":218},{"language":"M","activeProgrammers":216},{"language":"Gosu","activeProgrammers":194},{"language":"Elm","activeProgrammers":194},{"language":"BlitzBasic","activeProgrammers":188},{"language":"Max","activeProgrammers":177},{"language":"SourcePawn","activeProgrammers":150},{"language":"PureScript","activeProgrammers":147},{"language":"Coq","activeProgrammers":138},{"language":"Nemerle","activeProgrammers":130},{"language":"Mercury","activeProgrammers":125},{"language":"nesC","activeProgrammers":121},{"language":"SQL","activeProgrammers":111},{"language":"Pure Data","activeProgrammers":108},{"language":"Nimrod","activeProgrammers":105},{"language":"XQuery","activeProgrammers":105},{"language":"Awk","activeProgrammers":99},{"language":"AutoIt","activeProgrammers":97},{"language":"VCL","activeProgrammers":92},{"language":"Xtend","activeProgrammers":89},{"language":"GAP","activeProgrammers":82},{"language":"LabVIEW","activeProgrammers":76},{"language":"Ada","activeProgrammers":74},{"language":"Gnuplot","activeProgrammers":74},{"language":"Red","activeProgrammers":73},{"language":"SystemVerilog","activeProgrammers":72},{"language":"SuperCollider","activeProgrammers":72},{"language":"Frege","activeProgrammers":70},{"language":"Smalltalk","activeProgrammers":70},{"language":"Agda","activeProgrammers":70},{"language":"Objective-J","activeProgrammers":68},{"language":"MoonScript","activeProgrammers":66},{"language":"ANTLR","activeProgrammers":65},{"language":"Perl6","activeProgrammers":63},{"language":"SAS","activeProgrammers":61},{"language":"Squirrel","activeProgrammers":59},{"language":"PAWN","activeProgrammers":51},{"language":"NetLogo","activeProgrammers":51},{"language":"Scilab","activeProgrammers":51},{"language":"DOT","activeProgrammers":50},{"language":"Eiffel","activeProgrammers":50},{"language":"Thrift","activeProgrammers":49},{"language":"J","activeProgrammers":46},{"language":"Propeller Spin","activeProgrammers":44},{"language":"Bison","activeProgrammers":43},{"language":"Arc","activeProgrammers":42},{"language":"Slash","activeProgrammers":41},{"language":"Idris","activeProgrammers":40},{"language":"Rebol","activeProgrammers":39},{"language":"Delphi","activeProgrammers":37},{"language":"AspectJ","activeProgrammers":35},{"language":"Io","activeProgrammers":35},{"language":"Brightscript","activeProgrammers":30},{"language":"XML","activeProgrammers":29},{"language":"Inform 7","activeProgrammers":29},{"language":"Factor","activeProgrammers":28},{"language":"Lasso","activeProgrammers":27},{"language":"Ceylon","activeProgrammers":27},{"language":"Bro","activeProgrammers":27},{"language":"PigLatin","activeProgrammers":26},{"language":"Augeas","activeProgrammers":26},{"language":"Forth","activeProgrammers":25},{"language":"Zephir","activeProgrammers":24},{"language":"wisp","activeProgrammers":24},{"language":"UnrealScript","activeProgrammers":24},{"language":"LSL","activeProgrammers":23},{"language":"xBase","activeProgrammers":22},{"language":"COBOL","activeProgrammers":20},{"language":"Bluespec","activeProgrammers":19},{"language":"XC","activeProgrammers":19},{"language":"Parrot","activeProgrammers":19},{"language":"GDScript","activeProgrammers":18},{"language":"CLIPS","activeProgrammers":18},{"language":"Component Pascal","activeProgrammers":18},{"language":"REALbasic","activeProgrammers":17},{"language":"ATS","activeProgrammers":16},{"language":"Papyrus","activeProgrammers":16},{"language":"FLUX","activeProgrammers":15},{"language":"Hy","activeProgrammers":15},{"language":"Hack","activeProgrammers":15},{"language":"Mirah","activeProgrammers":14},{"language":"Boo","activeProgrammers":14},{"language":"Grammatical Framework","activeProgrammers":14},{"language":"ooc","activeProgrammers":13},{"language":"Isabelle","activeProgrammers":13},{"language":"Monkey","activeProgrammers":13},{"language":"Dylan","activeProgrammers":12},{"language":"LookML","activeProgrammers":11},{"language":"Xojo","activeProgrammers":11},{"language":"Cycript","activeProgrammers":11},{"language":"Nu","activeProgrammers":11},{"language":"Pan","activeProgrammers":10},{"language":"EmberScript","activeProgrammers":10},{"language":"GAMS","activeProgrammers":10},{"language":"Ragel in Ruby Host","activeProgrammers":10},{"language":"ABAP","activeProgrammers":9},{"language":"Fantom","activeProgrammers":9},{"language":"RobotFramework","activeProgrammers":7},{"language":"JSONiq","activeProgrammers":7},{"language":"PogoScript","activeProgrammers":7},{"language":"Clean","activeProgrammers":6},{"language":"Ecl","activeProgrammers":6},{"language":"XProc","activeProgrammers":6},{"language":"Volt","activeProgrammers":5},{"language":"Self","activeProgrammers":5},{"language":"Chapel","activeProgrammers":5},{"language":"BlitzMax","activeProgrammers":5},{"language":"LOLCODE","activeProgrammers":5},{"language":"Harbour","activeProgrammers":4},{"language":"Turing","activeProgrammers":4},{"language":"Pike","activeProgrammers":4},{"language":"KRL","activeProgrammers":4},{"language":"Logtalk","activeProgrammers":4},{"language":"Glyph","activeProgrammers":3},{"language":"IGOR Pro","activeProgrammers":3},{"language":"APL","activeProgrammers":3},{"language":"eC","activeProgrammers":2},{"language":"Oxygene","activeProgrammers":2},{"language":"Fancy","activeProgrammers":2},{"language":"Grace","activeProgrammers":2},{"language":"DCPU-16 ASM","activeProgrammers":2},{"language":"Ox","activeProgrammers":2},{"language":"Shen","activeProgrammers":2},{"language":"Cirru","activeProgrammers":1},{"language":"Alloy","activeProgrammers":1},{"language":"Dogescript","activeProgrammers":1},{"language":"Opal","activeProgrammers":1},{"language":"TXL","activeProgrammers":1},{"language":"repository_language","activeProgrammers":1},{"language":"E","activeProgrammers":1}];
  },

  getDeveloperCountByCountry: function() {

    $.ajax({
      url: 'api/1/developerCountyByLanguage',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        developersByCountry = data || returnedData;
        this.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getDeveloperCountByCountry', status, err.toString());
      }.bind(this)
    });

    var returnedData = [{"countryCode":"AD","programmers2014":1,"programmers2013":3},{"countryCode":"AE","programmers2014":169,"programmers2013":72},{"countryCode":"AF","programmers2014":5,"programmers2013":5},{"countryCode":"AG","programmers2014":3,"programmers2013":1},{"countryCode":"AL","programmers2014":26,"programmers2013":12},{"countryCode":"AM","programmers2014":80,"programmers2013":37},{"countryCode":"AO","programmers2014":9,"programmers2013":3},{"countryCode":"AQ","programmers2014":13,"programmers2013":7},{"countryCode":"AR","programmers2014":1598,"programmers2013":1071},{"countryCode":"AT","programmers2014":1373,"programmers2013":937},{"countryCode":"AU","programmers2014":4803,"programmers2013":3319},{"countryCode":"AZ","programmers2014":33,"programmers2013":13},{"countryCode":"BA","programmers2014":67,"programmers2013":35},{"countryCode":"BB","programmers2014":2,"programmers2013":3},{"countryCode":"BD","programmers2014":499,"programmers2013":216},{"countryCode":"BE","programmers2014":1768,"programmers2013":1119},{"countryCode":"BF","programmers2014":3,"programmers2013":2},{"countryCode":"BG","programmers2014":868,"programmers2013":474},{"countryCode":"BH","programmers2014":14,"programmers2013":11},{"countryCode":"BI","programmers2014":1,"programmers2013":1},{"countryCode":"BJ","programmers2014":73,"programmers2013":39},{"countryCode":"BM","programmers2014":10,"programmers2013":7},{"countryCode":"BN","programmers2014":3,"programmers2013":1},{"countryCode":"BO","programmers2014":85,"programmers2013":51},{"countryCode":"BR","programmers2014":4441,"programmers2013":2797},{"countryCode":"BS","programmers2014":2,"programmers2013":1},{"countryCode":"BT","programmers2014":1,"programmers2013":1},{"countryCode":"BW","programmers2014":4,"programmers2013":1},{"countryCode":"BY","programmers2014":906,"programmers2013":619},{"countryCode":"BZ","programmers2014":2,"programmers2013":1},{"countryCode":"CA","programmers2014":8448,"programmers2013":5396},{"countryCode":"CD","programmers2014":7,"programmers2013":2},{"countryCode":"CH","programmers2014":2150,"programmers2013":1417},{"countryCode":"CI","programmers2014":1,"programmers2013":4},{"countryCode":"CL","programmers2014":607,"programmers2013":383},{"countryCode":"CM","programmers2014":9,"programmers2013":5},{"countryCode":"CN","programmers2014":16965,"programmers2013":9371},{"countryCode":"CO","programmers2014":566,"programmers2013":342},{"countryCode":"CR","programmers2014":248,"programmers2013":139},{"countryCode":"CU","programmers2014":40,"programmers2013":20},{"countryCode":"CW","programmers2014":4,"programmers2013":2},{"countryCode":"CY","programmers2014":83,"programmers2013":44},{"countryCode":"CZ","programmers2014":1424,"programmers2013":952},{"countryCode":"DE","programmers2014":12612,"programmers2013":8299},{"countryCode":"DK","programmers2014":1699,"programmers2013":1220},{"countryCode":"DM","programmers2014":1,"programmers2013":5},{"countryCode":"DO","programmers2014":126,"programmers2013":70},{"countryCode":"DZ","programmers2014":62,"programmers2013":36},{"countryCode":"EC","programmers2014":147,"programmers2013":71},{"countryCode":"EE","programmers2014":331,"programmers2013":236},{"countryCode":"EG","programmers2014":334,"programmers2013":189},{"countryCode":"ER","programmers2014":200,"programmers2013":103},{"countryCode":"ES","programmers2014":4005,"programmers2013":2722},{"countryCode":"ET","programmers2014":11,"programmers2013":4},{"countryCode":"FI","programmers2014":1443,"programmers2013":941},{"countryCode":"FJ","programmers2014":1,"programmers2013":1},{"countryCode":"FO","programmers2014":2,"programmers2013":2},{"countryCode":"FR","programmers2014":9158,"programmers2013":5874},{"countryCode":"GB","programmers2014":13400,"programmers2013":8877},{"countryCode":"GD","programmers2014":9,"programmers2013":2},{"countryCode":"GE","programmers2014":64,"programmers2013":41},{"countryCode":"GG","programmers2014":4,"programmers2013":3},{"countryCode":"GH","programmers2014":76,"programmers2013":51},{"countryCode":"GI","programmers2014":12,"programmers2013":8},{"countryCode":"GL","programmers2014":3,"programmers2013":2},{"countryCode":"GP","programmers2014":5,"programmers2013":4},{"countryCode":"GR","programmers2014":750,"programmers2013":512},{"countryCode":"GT","programmers2014":108,"programmers2013":61},{"countryCode":"HK","programmers2014":556,"programmers2013":331},{"countryCode":"HN","programmers2014":46,"programmers2013":41},{"countryCode":"HR","programmers2014":370,"programmers2013":254},{"countryCode":"HT","programmers2014":1,"programmers2013":1},{"countryCode":"HU","programmers2014":786,"programmers2013":513},{"countryCode":"ID","programmers2014":1258,"programmers2013":820},{"countryCode":"IE","programmers2014":1141,"programmers2013":713},{"countryCode":"IL","programmers2014":837,"programmers2013":525},{"countryCode":"IM","programmers2014":6,"programmers2013":5},{"countryCode":"IN","programmers2014":8134,"programmers2013":4494},{"countryCode":"IQ","programmers2014":31,"programmers2013":18},{"countryCode":"IR","programmers2014":415,"programmers2013":246},{"countryCode":"IS","programmers2014":144,"programmers2013":106},{"countryCode":"IT","programmers2014":2975,"programmers2013":1965},{"countryCode":"JE","programmers2014":21,"programmers2013":16},{"countryCode":"JM","programmers2014":41,"programmers2013":22},{"countryCode":"JO","programmers2014":79,"programmers2013":41},{"countryCode":"JP","programmers2014":5923,"programmers2013":4266},{"countryCode":"KE","programmers2014":230,"programmers2013":122},{"countryCode":"KG","programmers2014":53,"programmers2013":31},{"countryCode":"KH","programmers2014":64,"programmers2013":32},{"countryCode":"KM","programmers2014":1,"programmers2013":1},{"countryCode":"KR","programmers2014":1559,"programmers2013":1007},{"countryCode":"KW","programmers2014":28,"programmers2013":15},{"countryCode":"KY","programmers2014":2,"programmers2013":4},{"countryCode":"KZ","programmers2014":141,"programmers2013":68},{"countryCode":"LB","programmers2014":62,"programmers2013":33},{"countryCode":"LC","programmers2014":2,"programmers2013":1},{"countryCode":"LI","programmers2014":2,"programmers2013":1},{"countryCode":"LK","programmers2014":300,"programmers2013":141},{"countryCode":"LS","programmers2014":1,"programmers2013":2},{"countryCode":"LT","programmers2014":366,"programmers2013":227},{"countryCode":"LU","programmers2014":136,"programmers2013":74},{"countryCode":"LV","programmers2014":263,"programmers2013":204},{"countryCode":"LY","programmers2014":5,"programmers2013":3},{"countryCode":"MA","programmers2014":135,"programmers2013":66},{"countryCode":"MC","programmers2014":4,"programmers2013":2},{"countryCode":"MD","programmers2014":120,"programmers2013":79},{"countryCode":"ME","programmers2014":16,"programmers2013":6},{"countryCode":"MG","programmers2014":24,"programmers2013":11},{"countryCode":"MK","programmers2014":84,"programmers2013":57},{"countryCode":"ML","programmers2014":7,"programmers2013":3},{"countryCode":"MM","programmers2014":51,"programmers2013":31},{"countryCode":"MN","programmers2014":27,"programmers2013":19},{"countryCode":"MO","programmers2014":18,"programmers2013":12},{"countryCode":"MQ","programmers2014":2,"programmers2013":4},{"countryCode":"MR","programmers2014":1,"programmers2013":1},{"countryCode":"MT","programmers2014":45,"programmers2013":19},{"countryCode":"MU","programmers2014":20,"programmers2013":16},{"countryCode":"MV","programmers2014":10,"programmers2013":6},{"countryCode":"MW","programmers2014":8,"programmers2013":7},{"countryCode":"MX","programmers2014":980,"programmers2013":679},{"countryCode":"MY","programmers2014":380,"programmers2013":249},{"countryCode":"MZ","programmers2014":5,"programmers2013":2},{"countryCode":"NA","programmers2014":16,"programmers2013":6},{"countryCode":"NC","programmers2014":1,"programmers2013":2},{"countryCode":"NG","programmers2014":152,"programmers2013":60},{"countryCode":"NI","programmers2014":53,"programmers2013":28},{"countryCode":"NL","programmers2014":4746,"programmers2013":3093},{"countryCode":"NO","programmers2014":1763,"programmers2013":1181},{"countryCode":"NP","programmers2014":199,"programmers2013":111},{"countryCode":"NZ","programmers2014":1344,"programmers2013":861},{"countryCode":"OM","programmers2014":5,"programmers2013":4},{"countryCode":"PA","programmers2014":43,"programmers2013":34},{"countryCode":"PE","programmers2014":171,"programmers2013":133},{"countryCode":"PF","programmers2014":4,"programmers2013":4},{"countryCode":"PG","programmers2014":1,"programmers2013":1},{"countryCode":"PH","programmers2014":740,"programmers2013":486},{"countryCode":"PK","programmers2014":379,"programmers2013":208},{"countryCode":"PL","programmers2014":2429,"programmers2013":1526},{"countryCode":"PR","programmers2014":84,"programmers2013":59},{"countryCode":"PS","programmers2014":19,"programmers2013":12},{"countryCode":"PT","programmers2014":1255,"programmers2013":795},{"countryCode":"PY","programmers2014":46,"programmers2013":33},{"countryCode":"QA","programmers2014":20,"programmers2013":8},{"countryCode":"RE","programmers2014":6,"programmers2013":3},{"countryCode":"RO","programmers2014":898,"programmers2013":622},{"countryCode":"RS","programmers2014":349,"programmers2013":196},{"countryCode":"RU","programmers2014":6475,"programmers2013":4471},{"countryCode":"RW","programmers2014":21,"programmers2013":5},{"countryCode":"SA","programmers2014":87,"programmers2013":45},{"countryCode":"SD","programmers2014":7,"programmers2013":3},{"countryCode":"SE","programmers2014":3198,"programmers2013":2181},{"countryCode":"SG","programmers2014":1022,"programmers2013":585},{"countryCode":"SI","programmers2014":302,"programmers2013":200},{"countryCode":"SK","programmers2014":333,"programmers2013":223},{"countryCode":"SL","programmers2014":2,"programmers2013":2},{"countryCode":"SM","programmers2014":4,"programmers2013":2},{"countryCode":"SN","programmers2014":14,"programmers2013":11},{"countryCode":"SO","programmers2014":5,"programmers2013":2},{"countryCode":"SV","programmers2014":87,"programmers2013":54},{"countryCode":"SY","programmers2014":28,"programmers2013":25},{"countryCode":"TC","programmers2014":2,"programmers2013":2},{"countryCode":"TD","programmers2014":1,"programmers2013":1},{"countryCode":"TF","programmers2014":1,"programmers2013":1},{"countryCode":"TH","programmers2014":584,"programmers2013":302},{"countryCode":"TJ","programmers2014":14,"programmers2013":4},{"countryCode":"TN","programmers2014":124,"programmers2013":89},{"countryCode":"TR","programmers2014":1150,"programmers2013":696},{"countryCode":"TT","programmers2014":16,"programmers2013":9},{"countryCode":"TW","programmers2014":1677,"programmers2013":1039},{"countryCode":"TZ","programmers2014":36,"programmers2013":17},{"countryCode":"UA","programmers2014":3325,"programmers2013":2253},{"countryCode":"UG","programmers2014":58,"programmers2013":33},{"countryCode":"US\r\n","programmers2014":3315,"programmers2013":2471},{"countryCode":"US","programmers2014":74250,"programmers2013":47736},{"countryCode":"UY","programmers2014":270,"programmers2013":184},{"countryCode":"UZ","programmers2014":43,"programmers2013":23},{"countryCode":"VC","programmers2014":1,"programmers2013":2},{"countryCode":"VE","programmers2014":344,"programmers2013":199},{"countryCode":"VI","programmers2014":1,"programmers2013":2},{"countryCode":"VN","programmers2014":834,"programmers2013":392},{"countryCode":"XK","programmers2014":11,"programmers2013":11},{"countryCode":"YE","programmers2014":5,"programmers2013":4},{"countryCode":"YT","programmers2014":1,"programmers2013":1},{"countryCode":"ZA","programmers2014":851,"programmers2013":574},{"countryCode":"ZM","programmers2014":5,"programmers2013":3},{"countryCode":"ZW","programmers2014":13,"programmers2013":5}];
  },

  getContractorData: function(country) {
    //invokes getOdeskData and geteLanceData()
  }, 

  getODeskData: function(country) {
    $.ajax({
      url: 'api/1/allCount',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        countryData = data;
        this.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/1/getAllFiles', status, err.toString());
      }.bind(this)
    });
  },

  geteLanceData: function(country) {
    //make api calls to get the oDesk data
  },

  getCountryDataFromStore: function() {
    return countryData;
  },

  getProfileDataFromStore: function() {
    return profileData;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
   //outgoing callbacks/changes

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  //incoming callbacks/changes

  switch(action.actionType) {

    case DevSearchConstants.DEVSEARCH_TOGGLE_COMPLETE_ALL:
      if (DevSearchStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      DevSearchStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = DevSearchStore;
