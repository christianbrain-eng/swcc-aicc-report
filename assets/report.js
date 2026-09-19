(() => {
 'use strict';
 document.getElementById('print-page').addEventListener('click',()=>window.print());
 document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const box=document.getElementById(button.dataset.copy),status=button.nextElementSibling;
  try{if(!navigator.clipboard)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(box.value);status.textContent='복사했습니다. 발송 전에 수신 조건을 확인하세요.';}
  catch(error){box.focus();box.select();try{if(!document.execCommand('copy'))throw new Error('copy unavailable');status.textContent='복사했습니다. 발송 전에 수신 조건을 확인하세요.';}catch(e){status.textContent='본문을 선택했습니다. Ctrl+C 또는 복사 메뉴를 사용하세요.';}}
 }));
 // Print long drafts without textarea clipping. No network or message sending.
 const printCopies=[];
 window.addEventListener('beforeprint',()=>{document.querySelectorAll('textarea').forEach(box=>{const pre=document.createElement('div');pre.textContent=box.value;pre.style.whiteSpace='pre-wrap';box.hidden=true;box.after(pre);printCopies.push([box,pre]);});});
 window.addEventListener('afterprint',()=>{printCopies.splice(0).forEach(([box,pre])=>{box.hidden=false;pre.remove();});});
 function revealHash(){
  let id;try{id=decodeURIComponent(location.hash.slice(1));}catch(e){return;}
  if(!id)return;
  const target=document.getElementById(id);if(!target)return;
  for(let node=target;node;node=node.parentElement){if(node.tagName==='DETAILS')node.open=true;}
  if(target.classList.contains('audit-item')){const detail=target.querySelector('details');if(detail)detail.open=true;}
  target.scrollIntoView({block:'start'});
 }
 window.addEventListener('hashchange',revealHash);revealHash();
})();
