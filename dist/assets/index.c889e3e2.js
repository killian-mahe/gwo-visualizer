var z=Object.defineProperty;var L=(i,e,t)=>e in i?z(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var o=(i,e,t)=>(L(i,typeof e!="symbol"?e+"":e,t),t);import{p as N}from"./vendor.a21a2c2c.js";const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}};T();class H{constructor(e,t,n,s,r=!0){o(this,"name");o(this,"dimension");o(this,"xMin");o(this,"xMax");o(this,"maximization");this.name=e,this.dimension=t,this.xMin=n,this.xMax=s,this.maximization=r}evaluate(e){return 0}}class I extends H{constructor(e,t,n,s,r=!0){super(e,t,n,s,r)}}class g extends I{constructor(e,t=!0){super("Alpine Problem",e,0,10,t)}evaluate(e){let t=1;for(let n=0;n<this.dimension;n++)t*=Math.sin(e.x[n])*Math.sqrt(e.x[n]);return t}}class S extends I{constructor(e){super("Alpine 2 Problem",e,-10,10,!1)}evaluate(e){let t=0;for(let n=0;n<this.dimension;n++)t+=Math.abs(e.x[n]*Math.sin(e.x[n])+.1*e.x[n]);return t}}class k extends I{constructor(e){super("Sphere Problem",e,-5.12,5.12,!1)}evaluate(e){let t=0;for(let n=0;n<this.dimension;n++)t+=Math.pow(e.x[n],2);return t}}class B extends I{constructor(e){super("Ackley Problem",e,-32,32,!1)}evaluate(e){let t=0,n=0;for(let s=0;s<this.dimension;s++)t+=Math.pow(e.x[s],2);for(let s=0;s<this.dimension;s++)n+=Math.cos(2*Math.PI*e.x[s]);return-20*Math.exp(-.2*Math.sqrt(1/this.dimension*t))-Math.exp(1/this.dimension*n)+20+Math.exp(1)}}class E{constructor(e,t){o(this,"fitness");o(this,"x");o(this,"problem");this.x=e,this.fitness=0,this.problem=t}evaluate(){this.fitness=this.problem.evaluate(this)}copy(){let e=new E([...this.x],this.problem);return e.fitness=this.fitness,e}}class W{constructor(){o(this,"popSize",0)}reset(){}}class _ extends W{constructor(e,t,n=5e3){super();o(this,"popSize");o(this,"maxIter");o(this,"t");o(this,"alpha");o(this,"beta");o(this,"delta");o(this,"a");o(this,"A");o(this,"C");this.popSize=e,this.maxIter=n,this.t=0,this.alpha=null,this.beta=null,this.delta=null,this.a=2,this.A=new Array(3).fill(0).map(()=>new Array(t).fill(0)),this.C=new Array(3).fill(0).map(()=>new Array(t).fill(0))}updateParameters(){for(let e=0;e<3;e++)for(let t=0;t<this.A[0].length;t++)this.A[e][t]=this.a*(2*Math.random()-1),this.C[e][t]=2*Math.random();this.a=2*(1-this.t/this.maxIter)}updatePositions(e){if(!this.alpha||!this.beta||!this.delta)return null;this.updateParameters();for(let t=0;t<e.problem.dimension;t++){const n=Math.abs(this.C[0][t]*this.alpha.x[t]-e.x[t]),s=this.alpha.x[t]-this.A[0][t]*n,r=Math.abs(this.C[1][t]*this.alpha.x[t]-e.x[t]),d=this.alpha.x[t]-this.A[1][t]*r,w=Math.abs(this.C[2][t]*this.alpha.x[t]-e.x[t]),l=this.alpha.x[t]-this.A[2][t]*w;let m=(s+d+l)/3;m<e.problem.xMin?m=e.problem.xMin:m>e.problem.xMax&&(m=e.problem.xMax),e.x[t]=m}return e}updateChiefWolves(e){var t,n,s,r,d,w;if(e.length&&e[0].problem.maximization?e=e.sort((l,m)=>m.fitness-l.fitness):e=e.sort((l,m)=>l.fitness-m.fitness),!this.alpha||!this.beta||!this.delta){this.alpha=e[0].copy(),this.beta=e[1].copy(),this.delta=e[2].copy();return}if(e.length&&e[0].problem.maximization)for(let l=0;l<e.length&&!(e[l].fitness<this.delta.fitness);l++)e[l].fitness>((t=this.alpha)==null?void 0:t.fitness)?(this.delta=this.beta.copy(),this.beta=this.alpha.copy(),this.alpha=e[l].copy()):e[l].fitness>((n=this.beta)==null?void 0:n.fitness)?(this.delta=this.beta.copy(),this.beta=e[l].copy()):e[l].fitness>((s=this.delta)==null?void 0:s.fitness)&&(this.delta=e[l].copy());else for(let l=0;l<e.length&&!(e[l].fitness>this.delta.fitness);l++)e[l].fitness<((r=this.alpha)==null?void 0:r.fitness)?(this.delta=this.beta.copy(),this.beta=this.alpha.copy(),this.alpha=e[l].copy()):e[l].fitness<((d=this.beta)==null?void 0:d.fitness)?(this.delta=this.beta.copy(),this.beta=e[l].copy()):e[l].fitness<((w=this.delta)==null?void 0:w.fitness)&&(this.delta=e[l].copy())}reset(){this.t=0,this.alpha=null,this.beta=null,this.delta=null,this.a=2}}const u=100;let p=Math.min(document.getElementById("map-container").offsetHeight,document.getElementById("map-container").offsetWidth),y=p,P=document.getElementById("simulation-speed").valueAsNumber,C;const M=2,O=500;let a=new g(M),x=[],c=0,h=new _(document.getElementById("wolves-number").valueAsNumber,M,O);document.getElementById("control-button-start").addEventListener("click",()=>{c===4?(b(),c=2):c!==0&&(c=2),document.getElementById("control-button-start").innerText="Start"});document.getElementById("control-button-pause").addEventListener("click",()=>{c===2&&(c=3,document.getElementById("control-button-start").innerText="Resume")});document.getElementById("wolves-number").addEventListener("change",i=>{h.popSize=i.target.valueAsNumber,b()});let f=new Array(u).fill(0).map(()=>new Array(u).fill(0)),v=0,A=0,R=function(i){i.setup=function(){C=i.createCanvas(y,p),C.parent("map-container"),document.getElementById("simulation-speed").addEventListener("change",e=>{P=e.target.valueAsNumber,i.frameRate(P)}),i.frameRate(P),b(),h.updateParameters(),h.updateChiefWolves(x)},i.draw=function(){X(),D(),i.resizeCanvas(y,p,!0),i.background(0);const e=a.xMax-a.xMin;console.log([A,v]);for(let t=0;t<f.length;t++)for(let n=0;n<f.length;n++){const s=f[t][n];s>0?i.fill(230,230-230*s/v,25):i.fill(230-230*s/A,230,25),i.noStroke(),i.rect(t*y/u,n*p/u,y/u+1,p/u+1)}if(h.t<h.maxIter&&c===2){for(let t=0;t<h.popSize;t++)h.updatePositions(x[t]),x[t].evaluate();h.updateChiefWolves(x),document.getElementById("best-solution-fitness").innerHTML=h.alpha.fitness.toString(),document.getElementById("a-value").innerHTML=(Math.round(h.a*100)/100).toString(),h.t+=1}h.t>=h.maxIter&&(c=4);for(let t=0;t<h.popSize;t++)i.fill("white"),i.circle(y*(x[t].x[0]-a.xMin)/e,p*(x[t].x[1]-a.xMin)/e,7);h.alpha&&(i.fill("blue"),i.rect(y*(h.alpha.x[0]-a.xMin)/e-5,p*(h.alpha.x[1]-a.xMin)/e-5,10,10))}};function j(){if(a.dimension!=2)throw new RangeError("Cannot compute a map with a dimension different from 2.");f=new Array(u).fill(0).map(()=>new Array(u).fill(0));let i;const e=(a.xMax-a.xMin)/u;for(let t=0;t<u;t++)for(let n=0;n<u;n++)i=new E([a.xMin+t*e,a.xMin+n*e],a),i.evaluate(),f[t][n]=i.fitness}function D(){p=Math.min(document.getElementById("map-container").offsetHeight,document.getElementById("map-container").offsetWidth),y=p}function X(){switch(document.getElementById("problem-select").value){case"alpine":a instanceof g||(a=new g(M),b());break;case"sphere":a instanceof k||(a=new k(M),b());break;case"alpine2":a instanceof S||(a=new S(M),b());break;case"ackley":a instanceof B||(a=new B(M),b());break;default:a instanceof g||(a=new g(M),b());break}}function b(){c=0,A=0,v=0,j(),h.reset();for(let e=0;e<f.length;e++)for(let t=0;t<f.length;t++)f[e][t]<A&&(A=f[e][t]),f[e][t]>v&&(v=f[e][t]);let i;x=[];for(let e=0;e<h.popSize;e++){i=new E([],a);for(let t=0;t<a.dimension;t++)i.x.push(Math.random()*(a.xMax-a.xMin)+a.xMin);i.evaluate(),x.push(i)}c=1}new N(R);
