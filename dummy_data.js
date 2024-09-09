var credit_scores = ["Poor", "Fair", "Good", "Excellent"];
var income_levels = ["Low", "Medium", "High"];

var dti_levels = ["Low", "Medium", "High"];
var result = ["Approve", "Reject"];
var risk = ["High", "Low","Medium"];

function arr_random(arr) {
    return arr[(Math.floor(Math.random() * arr.length))];
}
var op = false;
for (var a1 = 0; a1 < credit_scores.length; a1++) {
  for (var a2 = 0; a2 < income_levels.length; a2++) {
    for (var a3 = 0; a3 < income_levels.length; a3++) {
      console.log(
        [
          credit_scores[a1],
          income_levels[a2],
          Math.round(Math.random()*10000),
          income_levels[a3],
          arr_random(result),
          arr_random(risk)
        ].join(","),
      );
      op = !op;
    }
  }
}
