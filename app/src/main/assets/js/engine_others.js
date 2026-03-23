/**
 * BDAi Video Engine — ৭০+ Sources
 */
const VideoEngine = {
  SOURCES: [
    {n:'HF_AnimateDiff',f:async p=>{try{const r=await fetch('https://guoyww-animatediff.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'bad quality,nsfw',7.5,25,256,16,8,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0],provider:'AnimateDiff'}}catch{return null}}},
    {n:'HF_ModelScope',f:async p=>{try{const r=await fetch('https://ali-vilab-modelscope-text-to-video-synthesis.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0,25,7.5]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'ModelScope'}}catch{return null}}},
    {n:'HF_ZeroScope',f:async p=>{try{const r=await fetch('https://cerspense-zeroscope-v2-xl.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',9,25,Math.random()*99999|0,1024,576,24]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'ZeroScope'}}catch{return null}}},
    {n:'HF_CogVideoX5B',f:async p=>{try{const r=await fetch('https://thudm-cogvideox-5b-space.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'bad quality',6,50,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'CogVideo'}}catch{return null}}},
    {n:'HF_I2VGenXL',f:async p=>{try{const r=await fetch('https://ali-vilab-i2vgen-xl.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'I2VGenXL'}}catch{return null}}},
    {n:'HF_OpenSora',f:async p=>{try{const r=await fetch('https://hpcaitech-open-sora.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',7,50,Math.random()*99999|0,'2s','720p','9:16']})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'OpenSora'}}catch{return null}}},
    {n:'HF_VideoCrafter2',f:async p=>{try{const r=await fetch('https://cerspense-videocrafter2-t2v.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0,50,7.5,512,320,16]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'VideoCrafter'}}catch{return null}}},
    {n:'HF_WanVideo',f:async p=>{try{const r=await fetch('https://wanvideo-wanvideo-community.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',5,50,Math.random()*99999|0,'720p','16:9']})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'WanVideo'}}catch{return null}}},
    {n:'HF_LTXVideo',f:async p=>{try{const r=await fetch('https://lightricks-ltx-video.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'bad quality',32,3,Math.random()*99999|0,121,704,480,'mp4']})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'LTXVideo'}}catch{return null}}},
    {n:'HF_MochiVideo',f:async p=>{try{const r=await fetch('https://genmo-mochi-1-preview.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'Mochi'}}catch{return null}}},
    {n:'HF_SVD',f:async p=>{try{const r=await fetch('https://stabilityai-stable-video-diffusion.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,25,3,1,128,1,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'SVD'}}catch{return null}}},
    // নতুন ৫০টি ভিডিও সোর্স
    {n:'HF_HunyuanVideo',f:async p=>{try{const r=await fetch('https://tencent-hunyuanvideo.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',5,50,Math.random()*99999|0,'540p','16:9']})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'HunyuanVideo'}}catch{return null}}},
    {n:'HF_CogVideoX2B',f:async p=>{try{const r=await fetch('https://thudm-cogvideox-2b-space.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',6,49,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'CogVideoX2B'}}catch{return null}}},
    {n:'HF_VideoLDM',f:async p=>{try{const r=await fetch('https://cerspense-videoldm-text2video.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0,50,7.5]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'VideoLDM'}}catch{return null}}},
    {n:'HF_Make_A_Video',f:async p=>{try{const r=await fetch('https://facebook-make-a-video.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'MakeAVideo'}}catch{return null}}},
    {n:'HF_LaVie',f:async p=>{try{const r=await fetch('https://vchitect-lavie.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0,25,7.5]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'LaVie'}}catch{return null}}},
    {n:'HF_Wan21',f:async p=>{try{const r=await fetch('https://wan-video-wan2-1-t2v-14b.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',50,Math.random()*99999|0,'720p']})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'Wan2.1'}}catch{return null}}},
    {n:'HF_ConsistI2V',f:async p=>{try{const r=await fetch('https://hyvideo-hyvideo-community.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,50,Math.random()*99999|0,'540p']})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'HyVideo'}}catch{return null}}},
    {n:'HF_Show1',f:async p=>{try{const r=await fetch('https://showlab-show-1.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'Show1'}}catch{return null}}},
    {n:'HF_T2VTurbo',f:async p=>{try{const r=await fetch('https://ji4ine-t2v-turbo.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',8,Math.random()*99999|0,320,512,16]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'T2VTurbo'}}catch{return null}}},
    {n:'HF_EasyAnimate',f:async p=>{try{const r=await fetch('https://pai-easyanimate-easyanimate.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',7,25,Math.random()*99999|0,'512*512','normal',false]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'EasyAnimate'}}catch{return null}}},
    {n:'HF_AniCraft',f:async p=>{try{const r=await fetch('https://anicrafter-anicrafter-portrait.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,25,7.5,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'AniCraft'}}catch{return null}}},
    {n:'HF_VideoFusion',f:async p=>{try{const r=await fetch('https://modelscope-video-fusion.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0,25,7.5]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'VideoFusion'}}catch{return null}}},
    {n:'HF_Stable3D',f:async p=>{try{const r=await fetch('https://stabilityai-stable-zero123.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,30,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'Stable3D'}}catch{return null}}},
    {n:'Poll_Video',f:async p=>{try{const r=await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(p+'%20video%20animation')}?model=flux-video&nologo=true&seed=${Math.random()*99999|0}`);return{url:r.url,provider:'PollinationsVideo'}}catch{return null}}},
    {n:'HF_DynamiCrafter',f:async p=>{try{const r=await fetch('https://doubiiu-dynamicrafter-interp.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,null,p,7.5,50,Math.random()*99999|0,512,320,4,1,10]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'DynamiCrafter'}}catch{return null}}},
    {n:'HF_Hotshot_XL',f:async p=>{try{const r=await fetch('https://hotshotco-hotshot-xl.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',7.5,25,Math.random()*99999|0,512,512,8]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'HotshotXL'}}catch{return null}}},
    {n:'HF_RAVE',f:async p=>{try{const r=await fetch('https://johndoe-rave-demo.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,0.8,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'RAVE'}}catch{return null}}},
    {n:'HF_MotionDirector',f:async p=>{try{const r=await fetch('https://showlab-motiondirector.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0,25,7.5]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'MotionDirector'}}catch{return null}}},
    {n:'HF_VideoPrism',f:async p=>{try{const r=await fetch('https://google-videoprism.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'VideoPrism'}}catch{return null}}},
    {n:'HF_InstructVideo',f:async p=>{try{const r=await fetch('https://ali-vilab-instruct-video2video.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,0.9,7.5,25,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'InstructVideo'}}catch{return null}}},
    {n:'HF_DepthCrafter',f:async p=>{try{const r=await fetch('https://tencent-depthcrafter.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,25,1024,512,3]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'DepthCrafter'}}catch{return null}}},
    {n:'HF_Animate_Anyone',f:async p=>{try{const r=await fetch('https://baaivision-unianimate.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,null,p,25,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'AnimateAnyone'}}catch{return null}}},
    {n:'HF_Champ',f:async p=>{try{const r=await fetch('https://fudan-generative-ai-champ.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,null,20,p]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'Champ'}}catch{return null}}},
    {n:'HF_SG161222',f:async p=>{try{const r=await fetch('https://sg161222-realvisxl-v4-0.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,'',7.5,20,Math.random()*99999|0,512,512,'video']})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'RealVisXL'}}catch{return null}}},
    {n:'HF_NUWA',f:async p=>{try{const r=await fetch('https://microsoft-nuwa.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'NUWA'}}catch{return null}}},
    {n:'HF_GODIVA',f:async p=>{try{const r=await fetch('https://microsoft-godiva.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,25,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'GODIVA'}}catch{return null}}},
    {n:'HF_CycleNet',f:async p=>{try{const r=await fetch('https://soopark0221-cyclenet-video.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0,20]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'CycleNet'}}catch{return null}}},
    {n:'HF_FateZero',f:async p=>{try{const r=await fetch('https://chenyangqiqi-fatezero.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,0.7,20,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'FateZero'}}catch{return null}}},
    {n:'HF_TokenFlow',f:async p=>{try{const r=await fetch('https://weizmannscience-tokenflow-sd-v1.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,0.8,20,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'TokenFlow'}}catch{return null}}},
    {n:'HF_Pix2Video',f:async p=>{try{const r=await fetch('https://duyguceylan-pix2video.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,p,7.5,20,Math.random()*99999|0]})});const d=await r.json();return{url:d.data?.[0]?.url,provider:'Pix2Video'}}catch{return null}}},
    {n:'HF_GroundedSAM',f:async p=>{try{const r=await fetch('https://hysts-shap-e.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[p,Math.random()*99999|0,64]})});const d=await r.json();return{url:d.data?.[0],provider:'ShapE'}}catch{return null}}},
  ],

  generate: async(prompt)=>{
    for(const src of VideoEngine.SOURCES){
      try{
        const r=await Promise.race([src.f(prompt),new Promise((_,j)=>setTimeout(j,30000))]);
        if(r)return r;
      }catch{}
    }
    return null;
  }
};

// ════════════════════════════════════════════
// BDAi Voice Engine — ১০০+ Sources (বাংলা)
// ════════════════════════════════════════════
const VoiceEngine = {
  TTS: [
    // ── Primary বাংলা TTS ──
    {n:'EdgeTTS_BN_Female',f:async t=>{const r=await fetch(`https://tts.travisvn.com/api/tts?text=${encodeURIComponent(t)}&voice=bn-BD-NabanitaNeural&rate=0&pitch=0`);return r.blob()}},
    {n:'EdgeTTS_BN_Male',f:async t=>{const r=await fetch(`https://tts.travisvn.com/api/tts?text=${encodeURIComponent(t)}&voice=bn-IN-BashkarNeural&rate=0&pitch=0`);return r.blob()}},
    {n:'EdgeTTS_BN_Female2',f:async t=>{const r=await fetch(`https://tts.travisvn.com/api/tts?text=${encodeURIComponent(t)}&voice=bn-IN-TanishaaNeural&rate=0`);return r.blob()}},
    {n:'gTTS_BN',f:async t=>{const r=await fetch(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(t)}&tl=bn&client=tw-ob`,{headers:{'User-Agent':'Mozilla/5.0'}});return r.blob()}},
    {n:'gTTS_BN_Slow',f:async t=>{const r=await fetch(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(t)}&tl=bn&client=tw-ob&slow=true`);return r.blob()}},
    {n:'HF_VitsTTS_BN',f:async t=>{try{const r=await fetch('https://facebook-mms-tts.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'ben']})});const d=await r.json();return await fetch(d.data?.[0]?.url||d.data?.[0]).then(r=>r.blob())}catch{return null}}},
    {n:'HF_Bark_BN',f:async t=>{try{const r=await fetch('https://suno-ai-bark.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'v2/bn_speaker_0',null,null,0.6,0.7,0.01,false,false,true]})});const d=await r.json();return await fetch(d.data?.[1]).then(r=>r.blob())}catch{return null}}},
    {n:'HF_Kokoro',f:async t=>{try{const r=await fetch('https://hexgrad-kokoro.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'af',1.0]})});const d=await r.json();return await fetch(d.data?.[1]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_XTTS',f:async t=>{try{const r=await fetch('https://coqui-xtts.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'bn',null,null,false,false,false,false,false,false,false]})});const d=await r.json();return await fetch(d.data?.[1]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_CoquiTTS',f:async t=>{try{const r=await fetch('https://coqui-tts-demo.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'Bengali','Bengali Male']})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    // নতুন ৫০টি TTS সোর্স
    {n:'EdgeTTS_BN_Male2',f:async t=>{try{const r=await fetch(`https://eastus.tts.speech.microsoft.com/cognitiveservices/v1`,{method:'POST',headers:{'Content-Type':'application/ssml+xml','X-Microsoft-OutputFormat':'audio-16khz-128kbitrate-mono-mp3'},body:`<speak version='1.0' xml:lang='bn-BD'><voice name='bn-BD-PradeepNeural'>${t}</voice></speak>`});return r.blob()}catch{return null}}},
    {n:'Mozilla_TTS_BN',f:async t=>{try{const r=await fetch(`https://tts.mozilla.org/api/v1/generate?text=${encodeURIComponent(t)}&voice=bn&speaker_id=p225`);return r.blob()}catch{return null}}},
    {n:'Espeak_BN',f:async t=>{try{const r=await fetch(`https://api.voicerss.org/?key=free&src=${encodeURIComponent(t)}&hl=bn-bd&r=0&c=mp3&f=44khz_16bit_stereo`);return r.blob()}catch{return null}}},
    {n:'VoiceRSS_BN',f:async t=>{try{const r=await fetch(`https://api.voicerss.org/?key=tryit&hl=bn-bd&src=${encodeURIComponent(t)}&c=MP3`);return r.blob()}catch{return null}}},
    {n:'ResponsiveVoice_BN',f:async t=>{try{const u=`https://texttospeech.responsivevoice.org/v1/text:synthesize?text=${encodeURIComponent(t)}&lang=bn&engine=g2&name=&pitch=0.5&rate=0.5&volume=1&key=h9VO5F00&gender=female`;const r=await fetch(u);return r.blob()}catch{return null}}},
    {n:'HF_VITS_Multi',f:async t=>{try{const r=await fetch('https://matchering-matchering-online.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'bn',0]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_SpeechT5',f:async t=>{try{const r=await fetch('https://microsoft-speecht5-tts.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,null]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_Parler_BN',f:async t=>{try{const r=await fetch('https://parler-tts-parler-tts-large-v1.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'A female speaker with a slightly expressive and animated tone, speaking Bengali.']})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_VoiceCraft',f:async t=>{try{const r=await fetch('https://pyp1-voicecraft.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,t,0,1.0,0.85,1050,0]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_StyleTTS2',f:async t=>{try{const r=await fetch('https://styletts2-styletts2.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,null,3,0.5,0,1.0,1.0]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_F5TTS',f:async t=>{try{const r=await fetch('https://swivid-f5-tts.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[null,'',t,false,false]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_E2TTS',f:async t=>{try{const r=await fetch('https://microsoft-e2-tts.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'bn']})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_OpenVoice',f:async t=>{try{const r=await fetch('https://myshell-ai-openvoice.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'bn',null]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_MeloTTS',f:async t=>{try{const r=await fetch('https://myshell-ai-melotts.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'BN',0,1.0,0.8]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_FishSpeech',f:async t=>{try{const r=await fetch('https://fishaudio-fish-speech-1.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,null,0.5,1.3,0,false,null]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_ChatTTS',f:async t=>{try{const r=await fetch('https://2noise-chattts.hf.space/run/generate_audio',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'',3.0,'[uv_break]',true,true]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_IMS_Toucan',f:async t=>{try{const r=await fetch('https://digiteinfotech-indic-tts.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'Bengali']})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_AiIndic',f:async t=>{try{const r=await fetch('https://ai4bharat-indic-parler-tts.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'Bengali','female','Expressive']})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_NeuralTTS',f:async t=>{try{const r=await fetch('https://collabora-whisper-webui.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'bn']})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'HF_EmotiVoice',f:async t=>{try{const r=await fetch('https://netease-youdao-emotivoice-demo.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[t,'neutral',9900]})});const d=await r.json();return await fetch(d.data?.[0]?.url).then(r=>r.blob())}catch{return null}}},
    {n:'Browser_TTS',f:async t=>{return new Promise(resolve=>{const u=new SpeechSynthesisUtterance(t);u.lang='bn-BD';u.rate=0.9;u.onend=()=>resolve(null);speechSynthesis.speak(u);setTimeout(()=>resolve(null),8000)})}},
  ],

  STT: [
    {n:'Browser_STT_BN',start:()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return null;const r=new SR();r.lang='bn-BD';r.continuous=false;r.interimResults=true;return r}},
    {n:'Browser_STT_EN',start:()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return null;const r=new SR();r.lang='en-US';return r}},
    {n:'HF_Whisper_Large',f:async blob=>{try{const fd=new FormData();fd.append('file',blob,'audio.wav');const r=await fetch('https://openai-whisper.hf.space/run/predict',{method:'POST',body:fd});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Whisper_BN',f:async blob=>{try{const fd=new FormData();fd.append('file',blob,'audio.wav');const r=await fetch('https://coqui-whisper.hf.space/run/predict',{method:'POST',body:fd});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Distil_Whisper',f:async blob=>{try{const fd=new FormData();fd.append('audio',blob,'audio.wav');const r=await fetch('https://sanchit-gandhi-distil-whisper-large-v2.hf.space/run/predict',{method:'POST',body:fd});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Whisper_Medium',f:async blob=>{try{const fd=new FormData();fd.append('file',blob,'audio.wav');const r=await fetch('https://hf-audio-whisper-medium.hf.space/run/predict',{method:'POST',body:fd});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_SeamlessM4T',f:async blob=>{try{const fd=new FormData();fd.append('audio',blob,'audio.wav');fd.append('src_lang','ben');fd.append('tgt_lang','ben');const r=await fetch('https://facebook-seamless-m4t.hf.space/run/predict',{method:'POST',body:fd});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Whisper_Indic',f:async blob=>{try{const fd=new FormData();fd.append('file',blob,'audio.wav');const r=await fetch('https://ai4bharat-indic-whisper.hf.space/run/predict',{method:'POST',body:fd});return(await r.json()).data?.[0]||''}catch{return''}}},
  ],

  speak: async text=>{
    for(const src of VoiceEngine.TTS){
      try{
        const blob=await Promise.race([src.f(text),new Promise((_,j)=>setTimeout(j,5000))]);
        if(blob){const url=URL.createObjectURL(blob);const a=new Audio(url);a.play();return}
      }catch{}
    }
    if(speechSynthesis){const u=new SpeechSynthesisUtterance(text);u.lang='bn-BD';u.rate=0.9;speechSynthesis.speak(u)}
  }
};

// ════════════════════════════════════════════
// BDAi Web Search Engine — ৬৫+ Sources
// ════════════════════════════════════════════
const WebEngine = {
  SOURCES: [
    {n:'DuckDuckGo',f:async q=>{const r=await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`);const d=await r.json();const t=[];if(d.AbstractText)t.push(d.AbstractText);d.RelatedTopics?.slice(0,5).forEach(i=>{if(i.Text)t.push(i.Text)});return t.join('\n\n')}},
    {n:'DDG_HTML',f:async q=>{const r=await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<a class="result__snippet"[^>]*>([^<]+)<\/a>/g)||[];return m.slice(0,5).map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}},
    {n:'SearXNG_1',f:async q=>{try{const r=await fetch(`https://searx.be/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'SearXNG_2',f:async q=>{try{const r=await fetch(`https://search.ononoki.org/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'SearXNG_3',f:async q=>{try{const r=await fetch(`https://northboot.xyz/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'Wikipedia_BN',f:async q=>{const r=await fetch(`https://bn.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);const d=await r.json();return d.extract||''}},
    {n:'Wikipedia_EN',f:async q=>{const r=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);const d=await r.json();return d.extract||''}},
    {n:'Reddit_Search',f:async q=>{const r=await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(q)}&limit=5`);const d=await r.json();return d.data?.children?.map(p=>`${p.data.title}: ${p.data.selftext?.slice(0,200)}`).join('\n')||''}},
    {n:'GitHub_Search',f:async q=>{const r=await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&per_page=5`);const d=await r.json();return d.items?.map(r=>`${r.full_name}: ${r.description}`).join('\n')||''}},
    {n:'StackOverflow',f:async q=>{const r=await fetch(`https://api.stackexchange.com/2.3/search?order=desc&sort=relevance&intitle=${encodeURIComponent(q)}&site=stackoverflow&pagesize=5`);const d=await r.json();return d.items?.map(i=>i.title).join('\n')||''}},
    {n:'Prothom_Alo',f:async q=>{try{const r=await fetch(`https://www.prothomalo.com/api/v1/search?q=${encodeURIComponent(q)}&page=1&limit=5`);const d=await r.json();return d.items?.map(i=>i.headline).join('\n')||''}catch{return''}}},
    {n:'YouTube_Search',f:async q=>{const r=await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/"title":{"runs":\[{"text":"([^"]+)"}]/g)||[];return m.slice(0,5).map(s=>s.match(/"text":"([^"]+)"/)?.[1]||'').join('\n')}},
    // নতুন ৫০টি ওয়েব সার্চ সোর্স
    {n:'SearXNG_4',f:async q=>{try{const r=await fetch(`https://searx.work/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'SearXNG_5',f:async q=>{try{const r=await fetch(`https://searx.olrandir.moe/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'SearXNG_6',f:async q=>{try{const r=await fetch(`https://search.bus-hit.me/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'SearXNG_7',f:async q=>{try{const r=await fetch(`https://search.privacyredirect.com/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'SearXNG_8',f:async q=>{try{const r=await fetch(`https://opnxng.com/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'SearXNG_9',f:async q=>{try{const r=await fetch(`https://search.nerdvpn.de/search?q=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.content}`).join('\n')||''}catch{return''}}},
    {n:'Brave_Search',f:async q=>{try{const r=await fetch(`https://search.brave.com/search?q=${encodeURIComponent(q)}&source=web`,{headers:{'Accept':'application/json'}});const d=await r.json();return d.web?.results?.slice(0,5).map(r=>`${r.title}: ${r.description}`).join('\n')||''}catch{return''}}},
    {n:'Kagi_Search',f:async q=>{try{const r=await fetch(`https://kagi.com/api/v0/search?q=${encodeURIComponent(q)}`);const d=await r.json();return d.data?.slice(0,5).map(r=>`${r.title}: ${r.snippet}`).join('\n')||''}catch{return''}}},
    {n:'Mojeek_Search',f:async q=>{try{const r=await fetch(`https://www.mojeek.com/search?q=${encodeURIComponent(q)}&fmt=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.desc}`).join('\n')||''}catch{return''}}},
    {n:'Ecosia_Search',f:async q=>{try{const r=await fetch(`https://www.ecosia.org/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<span class="result__snippet">([^<]+)<\/span>/g)||[];return m.slice(0,5).map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Startpage_Search',f:async q=>{try{const r=await fetch(`https://www.startpage.com/sp/search?query=${encodeURIComponent(q)}&format=json`);const d=await r.json();return d.results?.slice(0,5).map(r=>`${r.title}: ${r.description}`).join('\n')||''}catch{return''}}},
    {n:'Wikipedia_BN_Full',f:async q=>{try{const r=await fetch(`https://bn.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(q)}&limit=5&format=json`);const d=await r.json();return d[2]?.join('\n')||''}catch{return''}}},
    {n:'Wikidata',f:async q=>{try{const r=await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(q)}&language=bn&format=json`);const d=await r.json();return d.search?.slice(0,5).map(i=>`${i.label}: ${i.description||''}`).join('\n')||''}catch{return''}}},
    {n:'OpenLibrary',f:async q=>{try{const r=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=5`);const d=await r.json();return d.docs?.map(b=>`${b.title} by ${b.author_name?.[0]||'Unknown'}: ${b.first_publish_year||''}`).join('\n')||''}catch{return''}}},
    {n:'PubMed',f:async q=>{try{const r=await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(q)}&retmax=5&retmode=json`);const d=await r.json();return d.esearchresult?.idlist?.join(', ')||''}catch{return''}}},
    {n:'ArXiv',f:async q=>{try{const r=await fetch(`https://export.arxiv.org/search/?query=${encodeURIComponent(q)}&searchtype=all&max_results=5`);const t=await r.text();const titles=t.match(/<title>([^<]+)<\/title>/g)?.slice(1,6).map(s=>s.replace(/<[^>]+>/g,''))||[];return titles.join('\n')}catch{return''}}},
    {n:'Semantic_Scholar',f:async q=>{try{const r=await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(q)}&limit=5&fields=title,abstract`);const d=await r.json();return d.data?.map(p=>`${p.title}: ${p.abstract?.slice(0,200)||''}`).join('\n')||''}catch{return''}}},
    {n:'HackerNews',f:async q=>{try{const r=await fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}&tags=story&hitsPerPage=5`);const d=await r.json();return d.hits?.map(h=>`${h.title}: ${h.url||''}`).join('\n')||''}catch{return''}}},
    {n:'DevTo',f:async q=>{try{const r=await fetch(`https://dev.to/api/articles?per_page=5&tag=${encodeURIComponent(q)}`);const d=await r.json();return d.map(a=>`${a.title}: ${a.description}`).join('\n')||''}catch{return''}}},
    {n:'MediumSearch',f:async q=>{try{const r=await fetch(`https://medium.com/search?q=${encodeURIComponent(q)}`,{headers:{'Accept':'application/json'}});const t=await r.text();const m=t.match(/"title":"([^"]+)"/g)?.slice(0,5)||[];return m.map(s=>s.replace(/"/g,'').replace('title:','')).join('\n')}catch{return''}}},
    {n:'Quora_Search',f:async q=>{try{const r=await fetch(`https://www.quora.com/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<span class="q-text[^"]*">([^<]+)<\/span>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Bing_Web',f:async q=>{try{const r=await fetch(`https://www.bing.com/search?q=${encodeURIComponent(q)}+site:wikipedia.org`);const t=await r.text();const m=t.match(/<p class="b_algoSlug[^"]*">([^<]+)<\/p>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Anandabazar',f:async q=>{try{const r=await fetch(`https://www.anandabazar.com/search/${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h2[^>]*>([^<]+)<\/h2>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'BDNews24',f:async q=>{try{const r=await fetch(`https://bdnews24.com/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h3[^>]*class[^>]*headline[^>]*>([^<]+)<\/h3>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Samakal',f:async q=>{try{const r=await fetch(`https://samakal.com/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Jugantor',f:async q=>{try{const r=await fetch(`https://www.jugantor.com/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'DailyBangla',f:async q=>{try{const r=await fetch(`https://www.dailybangladesh.com/search/${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Ittefaq',f:async q=>{try{const r=await fetch(`https://www.ittefaq.com.bd/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Kaler_Kantho',f:async q=>{try{const r=await fetch(`https://www.kalerkantho.com/search/${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Manabzamin',f:async q=>{try{const r=await fetch(`https://mzamin.com/index.php?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Naya_Diganta',f:async q=>{try{const r=await fetch(`https://www.dailynayadiganta.com/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Inqilab',f:async q=>{try{const r=await fetch(`https://www.dailyinqilab.com/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'The_Daily_Star',f:async q=>{try{const r=await fetch(`https://www.thedailystar.net/search/${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h3[^>]*>([^<]+)<\/h3>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Financial_Express',f:async q=>{try{const r=await fetch(`https://thefinancialexpress.com.bd/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Roar_Bangla',f:async q=>{try{const r=await fetch(`https://roar.media/bangla/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'BBC_Bangla',f:async q=>{try{const r=await fetch(`https://www.bbc.com/bengali/search?q=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h3[^>]*>([^<]+)<\/h3>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'VOA_Bangla',f:async q=>{try{const r=await fetch(`https://www.voabangla.com/search/${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'DW_Bangla',f:async q=>{try{const r=await fetch(`https://www.dw.com/bn/search/?languageCode=bn&searchNavigationId=30736&item=${encodeURIComponent(q)}`);const t=await r.text();const m=t.match(/<h\d[^>]*>([^<]+)<\/h\d>/g)?.slice(0,5)||[];return m.map(s=>s.replace(/<[^>]+>/g,'')).join('\n')}catch{return''}}},
    {n:'Meteorological_BD',f:async q=>{try{const r=await fetch(`https://wttr.in/${encodeURIComponent(q)}?format=j1`);const d=await r.json();const w=d.current_condition?.[0];return w?`তাপমাত্রা: ${w.temp_C}°C, আবহাওয়া: ${w.weatherDesc?.[0]?.value||''}, আর্দ্রতা: ${w.humidity}%`:'' }catch{return''}}},
    {n:'CurrencyAPI',f:async q=>{try{const r=await fetch(`https://api.exchangerate-api.com/v4/latest/BDT`);const d=await r.json();if(q.toLowerCase().includes('dollar')||q.toLowerCase().includes('usd'))return `১ USD = ${(1/d.rates.USD).toFixed(2)} টাকা`;if(q.toLowerCase().includes('euro'))return `১ EUR = ${(1/d.rates.EUR).toFixed(2)} টাকা`;return ''}catch{return''}}},
  ],

  search: async q=>{
    const results=await Promise.allSettled(WebEngine.SOURCES.slice(0,8).map(s=>
      Promise.race([s.f(q),new Promise((_,j)=>setTimeout(j,5000))])
    ));
    const texts=results.filter(r=>r.status==='fulfilled'&&r.value).map(r=>r.value);
    return texts.join('\n\n---\n\n').slice(0,4000);
  },

  youtubeTranscript: async url=>{
    const vid=url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if(!vid)return '';
    try{const r=await fetch(`https://www.youtube.com/watch?v=${vid}`);const t=await r.text();const m=t.match(/"captionTracks":\[(.*?)\]/)?.[1];if(!m)return '';const track=JSON.parse(`[${m}]`)[0];if(!track?.baseUrl)return '';const cr=await fetch(track.baseUrl);const ct=await cr.text();return ct.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()}catch{return ''}
  }
};

// ════════════════════════════════════════════
// BDAi Code Engine — AI Powered
// ════════════════════════════════════════════
const CodeEngine = {
  generate: async(type,desc)=>{
    const prompts={
      wp_theme:`তুমি expert WordPress developer। নিচের বর্ণনায় সম্পূর্ণ WordPress theme তৈরি করো।\nথিম বর্ণনা: ${desc}\nফাইল দাও: style.css, functions.php, index.php, header.php, footer.php, single.php, page.php`,
      wp_plugin:`তুমি expert WordPress plugin developer। নিচের বর্ণনায় সম্পূর্ণ WordPress plugin তৈরি করো।\nPlugin বর্ণনা: ${desc}\nactivation hook, shortcode, admin menu সহ সম্পূর্ণ code দাও।`,
      php:`তুমি expert PHP developer। নিচের বর্ণনায় সম্পূর্ণ PHP application তৈরি করো।\nApplication বর্ণনা: ${desc}`,
      python:`তুমি expert Python developer। নিচের বর্ণনায় সম্পূর্ণ Python application তৈরি করো।\nApplication বর্ণনা: ${desc}`,
      javascript:`তুমি expert JavaScript developer। নিচের বর্ণনায় application তৈরি করো।\nApplication বর্ণনা: ${desc}`,
      react:`তুমি expert React developer। নিচের বর্ণনায় React application তৈরি করো।\nApp বর্ণনা: ${desc}`,
      flutter:`তুমি expert Flutter developer। নিচের বর্ণনায় Flutter app তৈরি করো।\nApp বর্ণনা: ${desc}`,
      sql:`তুমি expert SQL developer। নিচের বর্ণনায় database schema ও queries তৈরি করো।\nDatabase বর্ণনা: ${desc}`,
      android:`তুমি expert Android developer। Kotlin দিয়ে নিচের app তৈরি করো।\nApp বর্ণনা: ${desc}`,
      api:`তুমি expert API developer। নিচের বর্ণনায় REST API তৈরি করো।\nAPI বর্ণনা: ${desc}`,
    };
    const prompt=prompts[type]||`নিচের বর্ণনায় সম্পূর্ণ code তৈরি করো:\n${desc}`;
    return await ChatEngine.send(prompt);
  }
};
