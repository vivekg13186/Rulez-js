type RuleAction = string;

type RuleHeader = {
  fieldName: string;
  operator: Function;
};

type RuleDef = {
  ruleHeader: RuleHeader[];
  ruleActions: RuleAction[];
  ruleMatchers: RuleMatcher[];
};

type RuleMatcher = {
  values: any[];
  actions: any[];
};

function getConFun(a:string) {
  //console.log(a)
  switch (a) {
    case "startsWith":
      return function (a:any, b:any) {
        return a.startsWith(b);
      };
    case "gt":
      return function (a:any, b:any) {
        return a > b;
      };
      case "lt":
      return function (a:any, b:any) {
        return a < b;
      };case "eq":
      return function (a:any, b:any) {
        return a === b;
      };
    default:
      return function () {
        true;
      };
  }
}
//eq(name),action(name)
function parseRuleHeader(line: string): RuleDef {
  var ruleDef: RuleDef = {
    ruleHeader: [],
    ruleActions: [],
    ruleMatchers: [],
  };
  var elements = line.split(",");
  for (var i = 0; i < elements.length; i++) {
    var a = elements[i].trim().split("(");
    var fieldname = a[1].substring(0, a[1].length - 1);
    if (a[0] == "action") {
      ruleDef.ruleActions.push(fieldname);
    } else {
      var fun = getConFun(a[0]);
      ruleDef.ruleHeader.push({
        fieldName: fieldname,
        operator: fun,
      });
    }
  }
  return ruleDef;
}

function toValue(a:string) {
  switch (a) {
    case "true":
      return true;
    case "false":
      return false;
    default: {
      var num = Number(a);
      if (isNaN(num)) {
        return a;
      } else {
        return num;
      }
    }
  }
}
function parseRuleMatcher(lines: string[], ruleDef: RuleDef) {
  for (var i = 0; i < lines.length; i++) {
    var matcher: RuleMatcher = {
      values: [],
      actions: [],
    };
    var l = lines[i];
    var a = l.split(",").map(toValue);
    var w = 0;
    for (var k = 0; k < ruleDef.ruleHeader.length; k++) {
      matcher.values.push(a[w]);
      w++;
    }
    for (var k = 0; k < ruleDef.ruleActions.length; k++) {
      matcher.actions.push(a[w]);
      w++;
    }
    ruleDef.ruleMatchers.push(matcher);
  }
}

function cleanLine(l:string):string {
  if (l.endsWith("\r")) {
    l = l.substring(0, l.length - 1);
  }
  return l.trim();
}
export function parseRule(text: string): RuleDef {
  var lines = text.split("\n");
  var ruleDef = parseRuleHeader(lines[0]);
  var condition_lines:string[] =[];
  for (var i = 1; i < lines.length; i++) {
    condition_lines .push(cleanLine(lines[i]));
  }
  parseRuleMatcher(condition_lines,ruleDef);
  return ruleDef;
}


export function evalRule(ruleDef: RuleDef, obj: any){
  for(var m=0;m<ruleDef.ruleMatchers.length;m++){
    var matchfor = ruleDef.ruleMatchers[m];
    var outcomes:any[]=[];
    for(var i=0;i<matchfor.values.length;i++){
       var mvalue = matchfor.values[i];
       var rh = ruleDef.ruleHeader[i];
      //console.log(obj[rh.fieldName],mvalue,rh.operator.toString());
      outcomes.push(rh.operator(obj[rh.fieldName],mvalue))
    }
    if(outcomes.indexOf(false)==-1){
     //console.log(outcomes)
      for(var a=0;a<ruleDef.ruleActions.length;a++){
        var fieldname = ruleDef.ruleActions[a];
        obj[fieldname] =matchfor.actions[a];
      }
    }
  }
   
}