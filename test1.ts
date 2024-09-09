import { parseRule, evalRule } from "./rule";
import * as fs from "fs";

var ruleText = fs.readFileSync("test1.csv", "utf8").toString();

var res = parseRule(ruleText);
console.log(res);

//var input = { married:true ,sex:"female",age  :10 ,title :""}
var input = {
  credit_scores: "Poor",
  income_levels: "Low",
  amount: 5000,
  dti_levels: "Medium",
  status: "",
  risk: "",
};
evalRule(res, input);

console.log(input);
