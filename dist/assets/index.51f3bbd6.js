var C=Object.defineProperty;var z=(i,e,t)=>e in i?C(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var o=(i,e,t)=>(z(i,typeof e!="symbol"?e+"":e,t),t);import{p as k}from"./vendor.a21a2c2c.js";const B=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}};B();class L{constructor(e,t,s,n,r=!0){o(this,"name");o(this,"dimension");o(this,"xMin");o(this,"xMax");o(this,"maximization");this.name=e,this.dimension=t,this.xMin=s,this.xMax=n,this.maximization=r}evaluate(e){return 0}}class E extends L{constructor(e,t,s,n,r=!0){super(e,t,s,n,r)}}class M extends E{constructor(e,t=!0){super("Alpine Problem",e,0,10,t)}evaluate(e){let t=1;for(let s=0;s<this.dimension;s++)t*=Math.sin(e.x[s])*Math.sqrt(e.x[s]);return t}}class P extends E{constructor(e){super("Sphere Problem",e,-5.12,5.12,!1)}evaluate(e){let t=0;for(let s=0;s<this.dimension;s++)t+=Math.pow(e.x[s],2);return t}}class I{constructor(e,t){o(this,"fitness");o(this,"x");o(this,"problem");this.x=e,this.fitness=0,this.problem=t}evaluate(){this.fitness=this.problem.evaluate(this)}copy(){let e=new I([...this.x],this.problem);return e.fitness=this.fitness,e}}class N{constructor(){o(this,"popSize",0)}reset(){}}class W extends N{constructor(e,t,s=5e3){super();o(this,"popSize");o(this,"maxIter");o(this,"t");o(this,"alpha");o(this,"beta");o(this,"delta");o(this,"a");o(this,"A");o(this,"C");this.popSize=e,this.maxIter=s,this.t=0,this.alpha=null,this.beta=null,this.delta=null,this.a=2,this.A=new Array(3).fill(0).map(()=>new Array(t).fill(0)),this.C=new Array(3).fill(0).map(()=>new Array(t).fill(0))}updateParameters(){for(let e=0;e<3;e++)for(let t=0;t<this.A[0].length;t++)this.A[e][t]=this.a*(2*Math.random()-1),this.C[e][t]=2*Math.random();this.a=2*(1-this.t/this.maxIter)}updatePositions(e){if(!this.alpha||!this.beta||!this.delta)return null;this.updateParameters();for(let t=0;t<e.problem.dimension;t++){const s=Math.abs(this.C[0][t]*this.alpha.x[t]-e.x[t]),n=this.alpha.x[t]-this.A[0][t]*s,r=Math.abs(this.C[1][t]*this.alpha.x[t]-e.x[t]),p=this.alpha.x[t]-this.A[1][t]*r,v=Math.abs(this.C[2][t]*this.alpha.x[t]-e.x[t]),a=this.alpha.x[t]-this.A[2][t]*v;let u=(n+p+a)/3;u<e.problem.xMin?u=e.problem.xMin:u>e.problem.xMax&&(u=e.problem.xMax),e.x[t]=u}return e}updateChiefWolves(e){var t,s,n,r,p,v;if(e.length&&e[0].problem.maximization?e=e.sort((a,u)=>u.fitness-a.fitness):e=e.sort((a,u)=>a.fitness-u.fitness),!this.alpha||!this.beta||!this.delta){this.alpha=e[0].copy(),this.beta=e[1].copy(),this.delta=e[2].copy();return}if(e.length&&e[0].problem.maximization)for(let a=0;a<e.length&&!(e[a].fitness<this.delta.fitness);a++)e[a].fitness>((t=this.alpha)==null?void 0:t.fitness)?(this.delta=this.beta.copy(),this.beta=this.alpha.copy(),this.alpha=e[a].copy()):e[a].fitness>((s=this.beta)==null?void 0:s.fitness)?(this.delta=this.beta.copy(),this.beta=e[a].copy()):e[a].fitness>((n=this.delta)==null?void 0:n.fitness)&&(this.delta=e[a].copy());else for(let a=0;a<e.length&&!(e[a].fitness>this.delta.fitness);a++)e[a].fitness<((r=this.alpha)==null?void 0:r.fitness)?(this.delta=this.beta.copy(),this.beta=this.alpha.copy(),this.alpha=e[a].copy()):e[a].fitness<((p=this.beta)==null?void 0:p.fitness)?(this.delta=this.beta.copy(),this.beta=e[a].copy()):e[a].fitness<((v=this.delta)==null?void 0:v.fitness)&&(this.delta=e[a].copy())}reset(){this.t=0,this.alpha=null,this.beta=null,this.delta=null,this.a=2}}const c=100;let d=Math.min(document.getElementById("map-container").offsetHeight,document.getElementById("map-container").offsetWidth),b=d,S;const g=2,_=250;let l=new M(g),m=[],x=0,h=new W(document.getElementById("wolves-number").valueAsNumber,g,_);document.getElementById("control-button-start").addEventListener("click",()=>{x===4?(y(),x=2):x!==0&&(x=2)});document.getElementById("wolves-number").addEventListener("change",i=>{h.popSize=i.target.valueAsNumber,y()});let f=new Array(c).fill(0).map(()=>new Array(c).fill(0)),A=0,w=0,H=function(i){i.setup=function(){S=i.createCanvas(b,d),S.parent("map-container"),y(),h.updateParameters(),h.updateChiefWolves(m)},i.draw=function(){j(),T(),i.resizeCanvas(b,d,!0),i.background(0);const e=l.xMax-l.xMin;for(let t=0;t<f.length;t++)for(let s=0;s<f.length;s++){const n=f[t][s];n>0?i.fill(230,230-230*n/A,25):i.fill(230-230*n/w,230,25),i.noStroke(),i.rect(t*b/c,s*d/c,b/c+1,d/c+1)}if(h.t<h.maxIter&&x===2){for(let t=0;t<h.popSize;t++)h.updatePositions(m[t]),m[t].evaluate();h.updateChiefWolves(m),document.getElementById("best-solution-fitness").innerHTML=h.alpha.fitness.toString(),h.t+=1}h.t>=h.maxIter&&(x=4);for(let t=0;t<h.popSize;t++)i.fill("white"),i.circle(b*(m[t].x[0]-l.xMin)/e,d*(m[t].x[1]-l.xMin)/e,7)}};function O(){if(l.dimension!=2)throw new RangeError("Cannot compute a map with a dimension different from 2.");f=new Array(c).fill(0).map(()=>new Array(c).fill(0));let i;const e=(l.xMax-l.xMin)/c;for(let t=0;t<c;t++)for(let s=0;s<c;s++)i=new I([l.xMin+t*e,l.xMin+s*e],l),i.evaluate(),f[t][s]=i.fitness}function T(){d=Math.min(document.getElementById("map-container").offsetHeight,document.getElementById("map-container").offsetWidth),b=d}function j(){switch(document.getElementById("problem-select").value){case"alpine":l instanceof M||(l=new M(g),y());break;case"sphere":l instanceof P||(l=new P(g),y());break;default:l instanceof M||(l=new M(g),y());break}}function y(){x=0,w=0,A=0,O(),h.reset();for(let e=0;e<f.length;e++)for(let t=0;t<f.length;t++)f[e][t]<w&&(w=f[e][t]),f[e][t]>A&&(A=f[e][t]);let i;m=[];for(let e=0;e<h.popSize;e++){i=new I([],l);for(let t=0;t<l.dimension;t++)i.x.push(Math.random()*(l.xMax-l.xMin)+l.xMin);i.evaluate(),m.push(i)}x=1}new k(H);