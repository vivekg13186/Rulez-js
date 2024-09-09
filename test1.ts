import { parseRule ,evalRule} from "./rule";
import * as fs from "fs";

var ruleText = fs.readFileSync("test.csv", "utf8").toString();

var res = parseRule(ruleText);
console.log(res);

var input = { married:true ,sex:"female",age  :10 ,title :""}

evalRule(res,input);

console.log(input)