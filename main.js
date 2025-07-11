function a(){
  const b=`Always use rendered LaTeX for math: $formula$ for inline (using \\mathbf{} for vectors), and $formula$ for display equations. Critical: no whitespace inside delimiters (use $E=mc^2$, not $ E = mc^2 $). 
  When display math ($$...$$) appears in lists, start on new line with ZERO leading indentation:

WRONG:
1. Text:
    $$
    formula
    $$

CORRECT:
1. Text:
$$
formula
$$

Never use code blocks for math formulas - only for programming code. Always respond in German. If user sends only an image, solve the problem in the image. If user asks questions about an image containing an exercise, answer only the questions, don't solve the problem.`;
  
  const c=document.querySelectorAll('button');
  let d=null;
  
  for(const e of c){
    const f=e.textContent||'',g=e.innerHTML||'',h=e.getAttribute('aria-label')||'';
    if(g.includes('assignment')||h.includes('System')||h.includes('system')||e.getAttribute('data-test-si')!==null){
      d=e;break
    }
  }
  
  if(d){
    d.click();
    setTimeout(()=>{
      const i=document.querySelectorAll('textarea');
      let j=null;
      
      for(const k of i){
        const l=k.getAttribute('aria-label')||'',m=k.getAttribute('placeholder')||'';
        if(l.includes('System')||l.includes('system')||m.includes('Optional tone')||k.closest('.toolbar-system-instructions')){
          j=k;break
        }
      }
      
      if(j){
        j.value=b;
        j.dispatchEvent(new Event('input',{bubbles:!0}));
        try{
          Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value").set.call(j,b);
          j.dispatchEvent(new Event('input',{bubbles:!0}))
        }catch(n){}
        const o=document.querySelector('button[aria-label*="Close system instructions"]');
        if(o){o.click()}
      }
    },0)
  }
}



const q=document.querySelector('a.nav-item[href="/app/prompts/new_chat"]');
if(q){
  q.addEventListener('click',function(r){
    setTimeout(()=>{a()
    
    const contentContainer = document.querySelector('ms-right-side-panel .content-container');
if (contentContainer) {
    contentContainer.remove();
}
  const s=document.querySelector('button[aria-label="Close run settings panel"]');
    if(s){s.click()}
    },0)
  })
}

setTimeout(()=>{a()},300);
setTimeout(()=>{
  const contentContainer = document.querySelector('ms-right-side-panel .content-container');
if (contentContainer) {
    contentContainer.remove();
}
  const p=document.querySelector('button[aria-label="Close run settings panel"]');
if(p){p.click()}},100);

function t(){
  const u=document.querySelector('textarea');
  if(u){
    u.focus();
    u.click()
  }
}

setTimeout(t,1500);
