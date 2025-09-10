
// Small interactive script: copy buttons and stepper for walkthrough
document.addEventListener('DOMContentLoaded', function(){
  // Copy buttons
  document.querySelectorAll('.copy').forEach(btn=>{
    btn.addEventListener('click', async function(){
      const target = this.getAttribute('data-target');
      const text = document.getElementById(target).innerText;
      try{
        await navigator.clipboard.writeText(text);
        this.innerText = 'Copied!';
        setTimeout(()=> this.innerText = 'Copy', 1400);
      }catch(e){
        alert('Copy failed — you can manually select and copy.');
      }
    });
  });

  // Stepper
  const steps = [
    {title:'Prepare a safe lab', body:'Use a local VM or container. Never test systems without permission.'},
    {title:'Install prerequisites', body:'Install Python and download the sqlmap repository.'},
    {title:'Start the target', body:'Boot your lab web app (e.g., DVWA on localhost).'},
    {title:'Run discovery', body:'Use --dbs to enumerate databases (in your authorized lab).'},
    {title:'Inspect structure', body:'Use -D databasename --tables to list tables.'},
    {title:'Extract for analysis', body:'Use -T tablename --dump to retrieve fields for analysis.'},
    {title:'Session-based testing', body:'If site requires cookies, capture them in your lab and use --cookie.'}
  ];
  let cur = 0;
  const display = document.getElementById('stepDisplay');
  const tracker = document.getElementById('stepTracker');
  function render(i){
    const s = steps[i];
    display.innerHTML = '<h3>Step '+(i+1)+' — '+s.title+'</h3><p>'+s.body+'</p>';
    tracker.innerText = 'Step '+(i+1)+' / '+steps.length;
  }
  render(cur);
  document.getElementById('prevStep').addEventListener('click', ()=>{ if(cur>0) {cur--; render(cur);} });
  document.getElementById('nextStep').addEventListener('click', ()=>{ if(cur<steps.length-1){cur++; render(cur);} });

  // Open ZIP button (will instruct user to download from assistant-provided link)
  document.getElementById('openZipBtn').addEventListener('click', ()=> alert('Download the site ZIP from the assistant message and extract it. Then open index.html in your browser.'));
});
