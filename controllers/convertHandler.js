function ConvertHandler() {
  const regex = /[a-z]+|[^a-z]+/gi; //separate alpha chars from non-alpha chars

  this.getNum = function (input) {
    let result = input.match(regex)[0]

    //if no number present, default to 1
    let numberRegex = /\d/
    if (numberRegex.test(result) === false) {
      result = '1'
    }

    //validate fractions -- only allow a single '/'
    if (result.toString().includes('/')) {
      let slashSplit = result.toString().split('/')
      if (slashSplit.length != 2) {
        return undefined
      }
      result = parseFloat(slashSplit[0]) / parseFloat(slashSplit[1]);
    }

    if (isNaN(result)) {
      return undefined
    }

    return parseFloat(result);
  };

  this.getUnit = function (input) {
    let result = input.match(regex)[1]
    
    //if it's just a unit by itself, return the first index "mi" "kg" etc
    if(!result){
      result = input.match(regex)[0]
    }
    result = result.toLowerCase();
    if (result == 'l') {
      result = 'L'
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit.toLowerCase()) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = initNum.toString() + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum.toString() + " " + this.spellOutUnit(returnUnit);
    return result;
  };

}

module.exports = ConvertHandler;
