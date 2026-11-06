// ตัวช่วย + สถานะ + ชั้นเก็บข้อมูล (Firestore หรือในหน้า)
const $=s=>document.querySelector(s),C=window.claude;
const h=(t,a={},...c)=>{const e=document.createElement(t);for(const k in a){if(k==='on')for(const v in a.on)e.addEventListener(v,a.on[v]);else e.setAttribute(k,a[k])}c.flat().filter(x=>x!=null&&x!==false).forEach(x=>e.append(x));return e};
const money=n=>'฿'+(Math.round(n*100)/100).toLocaleString('th-TH');
let db=null,dl=null,uid='local',pend=null,tab=0,unchecked=new Set();
const S={places:[],plan:[],exp:[],mem:[],meta:[],guest:[]};
const allM=()=>[...S.mem,...S.guest];
const uuid=()=>'l'+Math.random().toString(36).slice(2,9);
let fs=null,voteOpen=false,placesReady=false,seen=new Set();
// แจ้งเตือนเล็กๆ ด้านล่างจอ (แทน alert ที่บางเบราว์เซอร์บล็อก)
function toast(msg){let t=$('#toast');if(!t){t=h('div',{id:'toast',style:'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:10px;z-index:10000;max-width:90vw;font-size:14px'});document.body.append(t)}
 t.textContent=msg;t.style.display='block';clearTimeout(t._t);t._t=setTimeout(()=>t.style.display='none',3000)}
const fail=e=>{console.error(e);toast('บันทึกไม่สำเร็จ: '+(e&&(e.code||e.message)||e))};
const store={
 add(c,d){if(fs)return fs.collection(c).add(d).catch(fail);S[c].push({id:uuid(),...d});render()},
 set(c,id,d){if(fs)return fs.collection(c).doc(id).set(d).catch(fail);S[c]=S[c].filter(x=>x.id!==id).concat({id,...d});render()},
 upd(c,id,d){if(fs)return fs.collection(c).doc(id).update(d).catch(fail);const o=S[c].find(x=>x.id===id);if(o){for(const k in d){if(k.startsWith('votes.'))o.votes={...o.votes,[k.slice(6)]:d[k]};else o[k]=d[k]}render()}},
 del(c,id){if(fs)return fs.collection(c).doc(id).delete().catch(fail);S[c]=S[c].filter(x=>x.id!==id);render()}
};
const nm=id=>allM().find(m=>m.id===id)?.name||'ใครสักคน';
const tripName=()=>S.meta.find(m=>m.id==='trip')?.name||'ทริปของเรา';
const cnt=p=>Object.values(p.votes||{}).filter(Boolean).length;
const ranked=()=>[...S.places].sort((a,b)=>cnt(b)-cnt(a));
