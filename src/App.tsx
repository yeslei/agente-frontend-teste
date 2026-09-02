import { useEffect, useRef, useState } from 'react'

const cases = [
  {id:'CODE_TES',title:'Código & testes',desc:'Sintaxe, imports e comportamento inesperado.',log:"Failed to resolve import './PipelineCard'",agent:'CodeTestAgent',file:'src/App.tsx',color:'#c8ff67'},
  {id:'BUILD_DEPENDENCY',title:'Build & dependências',desc:'Pacotes ausentes, lockfiles e conflitos de versão.',log:'npm ERR! unable to resolve dependency tree',agent:'BuildDependencyAgent',file:'package.json',color:'#71d4ff'},
  {id:'ORKFLOW_ENVIRONMENT',title:'Workflow & ambiente',desc:'Node, caminhos, permissões e GitHub Actions.',log:'The engine node is incompatible. Expected >=20',agent:'WorkflowEnvironmentAgent',file:'.github/workflows/pages.yml',color:'#ff9b71'},
]

const stages=['Falha','Classificação','Especialista','Patch','Validação']

export default function App(){
  const [choice,setChoice]=useState(0),[step,setStep]=useState(4),[running,setRunning]=useState(false)
  const timers=useRef<number[]>([]),item=cases[choice]
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[])
  function simulate(){timers.current.forEach(clearTimeout);timers.current=[];setStep(0);setRunning(true);stages.slice(1).forEach((_,i)=>timers.current.push(window.setTimeout(()=>{setStep(i+1);if(i===3)setRunning(false)},(i+1)*650)))}
  return <main>
    <header><a className="brand" href="#top"><b>CI</b> REPAIR LAB</a><nav><a href="#flow">Arquitetura</a><a href="#cases">Cenários</a></nav><span className="live"><i/> Pipeline monitorada</span></header>
    <section className="hero" id="top"><div className="heroCopy"><small>MVP acadêmico · LangGraph + AWS Bedrock</small><h1>Falhas entram.<br/><em>Patches saem.</em><br/>A pipeline decide.</h1><p>Observe agentes especializados classificando, reparando e validando falhas reais de integração contínua.</p><button onClick={simulate} disabled={running}>{running?'Executando pipeline…':'Simular reparo'} <span>↗</span></button></div>
    <div className="console" aria-live="polite"><div className="consoleHead"><span>● run #0042</span><strong>{running?'RUNNING':'PASS'}</strong></div><div className="logs"><p>12:41:11 <b>ERROR</b> {item.log}</p><p>12:41:13 category=<strong>{item.id}</strong></p><p>12:41:15 route=<strong>{item.agent}</strong></p><p>12:41:19 patch=<strong>{item.file}</strong></p><p>12:41:27 validation=<em>PASS</em></p></div><div className="stages">{stages.map((s,i)=><div className={i<=step?'done':''} key={s}><span>{i<step||step===4?'✓':i===step?'●':i+1}</span><small>{s}</small></div>)}</div></div></section>
    <section className="architecture" id="flow"><small>Arquitetura mínima</small><h2>Um fluxo. Três especialistas.<br/>Uma resposta determinística.</h2><div className="flow">{['CI Failure','LLM Classifier','LangGraph Router',item.agent,'Validator','PASS'].map((x,i)=><div className={i===5?'pass':''} key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div></section>
    <section className="cases" id="cases"><div className="sectionHead"><div><small>Cenários controlados</small><h2>Escolha uma falha.</h2></div><p>O modelo é o mesmo. O contexto, as ferramentas e o foco mudam conforme a categoria.</p></div><div className="grid">{cases.map((c,i)=><button className={`card ${i===choice?'selected':''}`} style={{'--accent':c.color} as React.CSSProperties} onClick={()=>{setChoice(i);setStep(4)}} key={c.id}><span>0{i+1}</span><i>{i===0?'</>':i===1?'□+':'⚙'}</i><small>{c.id}</small><h3>{c.title}</h3><p>{c.desc}</p><b>{c.agent} →</b></button>)}</div></section>
    <footer><span className="brand"><b>CI</b> REPAIR LAB</span><p>Falhou. Classificou. Reparou. Validou.</p><span>Python · LangGraph · Bedrock</span></footer>
  </main>
}

