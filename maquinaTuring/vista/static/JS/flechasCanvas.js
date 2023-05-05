var campo = document.getElementById("flechaCurva1");
var ctx = campo.getContext("2d");
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(100, 75, 50, 0.7*Math.PI, 0.3 * Math.PI);
ctx.font="2mm"
ctx.stroke();
campo = document.getElementById("flechaCurva2");
ctx = campo.getContext("2d");
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(100, 75, 50, 1.7*Math.PI, 1.3 * Math.PI);
ctx.font="2mm"
ctx.stroke();
campo = document.getElementById("flechaCurva3");
ctx = campo.getContext("2d");
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(100, 75, 50, 0.7*Math.PI, 0.3 * Math.PI);
ctx.font="2mm"
ctx.stroke();