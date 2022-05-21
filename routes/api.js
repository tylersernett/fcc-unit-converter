'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.route('/api/convert')

    .get((req, res) => {
      let input = req.query.input;
      console.log(input)
      let initNum = convertHandler.getNum(input)
      let initUnit = convertHandler.getUnit(input)
      let returnUnit = convertHandler.getReturnUnit(initUnit)
      if (!initNum && !returnUnit){
        res.json("invalid number and unit");
        return;
      } else if (!initNum) {
        res.json("invalid number");
        return;
      } else if (!returnUnit) {
        res.json("invalid unit");
        return;
      }
      
      let returnNum = convertHandler.convert(initNum, initUnit)
      
      let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

      let responseObject = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      }
      console.log(responseObject)
      res.json(responseObject)

    });

};
