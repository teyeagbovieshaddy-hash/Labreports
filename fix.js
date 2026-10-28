T={chem:T.chem,
pchem:{n:'Physical Chemistry (instrumental)',s:['Aim','Theory','Apparatus and reagents','Procedure','Results','Calculations','Graphs and data analysis','Discussion','Sources of error','Conclusion']},
pcog:{n:'Pharmacognosy and Phytochemistry',s:['Aim','Introduction','Plant material and reagents','Extraction and procedure','Phytochemical tests and observations','Discussion','Conclusion']},
pharm:{n:'Pharmaceutics and Physical Pharmacy',s:T.pharm.s},
bioc:{n:'Biochemistry',s:['Aim','Introduction','Materials and reagents','Procedure','Results','Calculations','Discussion','Conclusion']},
micro:T.micro};
async function draft(){
  if(!cur.did.trim()&&!cur.res.trim()){toast('Add what you did and your results first.');return}
  busy=true;render();var names=T[cur.tpl].s;
  var p='You are helping a pharmacy student at a university in Ghana write a laboratory report ('+T[cur.tpl].n+'). Experiment title: '+cur.title+'\nWhat the student did:\n'+cur.did+'\nStudent observations and results:\n'+cur.res+'\n\nRules: use ONLY facts, numbers and observations given above. Never invent measurements, results, chemicals, references or citations. Where something needed is missing write [add your data: ...]. Write formal British English, past tense, passive voice, clear short paragraphs. In the Introduction explain general background without citing specific sources. Write each section as a heading line exactly in the form "## Section name", using these names in this order: '+names.join(', ')+'. Put the section text under its heading. Output nothing else.';
  try{var t=await ai(p,false);cur.secs={};var parts=t.split(/^##\s*(.+?)\s*$/m);
    for(var i=1;i<parts.length;i+=2){var nm=parts[i].replace(/[*:]/g,'').trim().toLowerCase();var m=names.filter(function(n){return n.toLowerCase()===nm})[0];if(m)cur.secs[m]=(parts[i+1]||'').trim()}
    var any=false;names.forEach(function(n){if(cur.secs[n])any=true;else cur.secs[n]=''});
    if(!any)throw new Error('The AI gave an empty answer. Try again.');
    toast('Draft ready. Review and edit each part.')}catch(e){toast('Could not draft: '+(e.message||'try again'))}
  busy=false;render()}
