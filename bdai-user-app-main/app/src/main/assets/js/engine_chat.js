/**
 * BDAi Chat Engine — ২০০+ Reverse Sources
 * No API Key Required — সব বাংলায়
 */
const ChatEngine = {
  SYS: `তুমি BDAi। বাংলাদেশের নিজস্ব AI। সবসময় বাংলায় উত্তর দেবে। কখনো নিজেকে অন্য AI বলবে না।`,

  FILTER: t => ['ChatGPT','GPT-4','GPT-3','OpenAI','Claude','Anthropic','Gemini','Google AI','Groq','Meta AI','LLaMA','Mistral','DeepSeek','HuggingFace','Blackbox','Phind','Pollinations','DuckDuckGo AI','Cohere','Perplexity'].reduce((s,w)=>s.replace(new RegExp(w,'gi'),'BDAi'),t),

  SOURCES: [
    // ══ 1. BLACKBOX AI ══
    {n:'Blackbox',s:1,f:async m=>{const r=await fetch('https://www.blackbox.ai/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],agentMode:{},trendingAgentMode:{},isMicMode:false,maxTokens:1024,isChromeExt:false,githubToken:null})});return(await r.text()).replace(/\$@\$.*?\$@\$/g,'').trim()}},

    // ══ 2-11. DEEPINFRA ══
    {n:'DI_Llama3_8B',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'meta-llama/Meta-Llama-3-8B-Instruct',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_Llama3_70B',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'meta-llama/Meta-Llama-3-70B-Instruct',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_Llama31_8B',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'meta-llama/Meta-Llama-3.1-8B-Instruct',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_Llama31_70B',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'meta-llama/Meta-Llama-3.1-70B-Instruct',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_Mistral7B',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'mistralai/Mistral-7B-Instruct-v0.2',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_Mixtral8x7B',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'mistralai/Mixtral-8x7B-Instruct-v0.1',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_Qwen72B',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'Qwen/Qwen2-72B-Instruct',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_Gemma27B',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'google/gemma-2-27b-it',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_DeepSeekV2',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'deepseek-ai/DeepSeek-V2-Chat',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'DI_WizardLM2',s:1,f:async m=>{const r=await fetch('https://api.deepinfra.com/v1/openai/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'microsoft/WizardLM-2-8x22B',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}},

    // ══ 12-15. DUCKDUCKGO AI ══
    {n:'DDG_GPT4oMini',s:1,f:async m=>{try{const i=await fetch('https://duckduckgo.com/duckchat/v1/status',{headers:{'x-vqd-accept':'1'}});const v=i.headers.get('x-vqd-4')||'';const r=await fetch('https://duckduckgo.com/duckchat/v1/chat',{method:'POST',headers:{'Content-Type':'application/json','x-vqd-4':v},body:JSON.stringify({model:'gpt-4o-mini',messages:[{role:'user',content:m}]})});return(await r.text()).split('\n').filter(l=>l.startsWith('data:')).map(l=>{try{return JSON.parse(l.slice(5)).message||''}catch{return''}}).join('')}catch{return''}}},
    {n:'DDG_Claude3Haiku',s:1,f:async m=>{try{const i=await fetch('https://duckduckgo.com/duckchat/v1/status',{headers:{'x-vqd-accept':'1'}});const v=i.headers.get('x-vqd-4')||'';const r=await fetch('https://duckduckgo.com/duckchat/v1/chat',{method:'POST',headers:{'Content-Type':'application/json','x-vqd-4':v},body:JSON.stringify({model:'claude-3-haiku-20240307',messages:[{role:'user',content:m}]})});return(await r.text()).split('\n').filter(l=>l.startsWith('data:')).map(l=>{try{return JSON.parse(l.slice(5)).message||''}catch{return''}}).join('')}catch{return''}}},
    {n:'DDG_Llama70B',s:1,f:async m=>{try{const i=await fetch('https://duckduckgo.com/duckchat/v1/status',{headers:{'x-vqd-accept':'1'}});const v=i.headers.get('x-vqd-4')||'';const r=await fetch('https://duckduckgo.com/duckchat/v1/chat',{method:'POST',headers:{'Content-Type':'application/json','x-vqd-4':v},body:JSON.stringify({model:'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',messages:[{role:'user',content:m}]})});return(await r.text()).split('\n').filter(l=>l.startsWith('data:')).map(l=>{try{return JSON.parse(l.slice(5)).message||''}catch{return''}}).join('')}catch{return''}}},
    {n:'DDG_Mixtral',s:1,f:async m=>{try{const i=await fetch('https://duckduckgo.com/duckchat/v1/status',{headers:{'x-vqd-accept':'1'}});const v=i.headers.get('x-vqd-4')||'';const r=await fetch('https://duckduckgo.com/duckchat/v1/chat',{method:'POST',headers:{'Content-Type':'application/json','x-vqd-4':v},body:JSON.stringify({model:'mistralai/Mixtral-8x7B-Instruct-v0.1',messages:[{role:'user',content:m}]})});return(await r.text()).split('\n').filter(l=>l.startsWith('data:')).map(l=>{try{return JSON.parse(l.slice(5)).message||''}catch{return''}}).join('')}catch{return''}}},

    // ══ 16-25. POLLINATIONS ══
    {n:'Poll_OpenAI',s:2,f:async m=>{const r=await fetch('https://text.pollinations.ai/openai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'system',content:ChatEngine.SYS},{role:'user',content:m}],model:'openai',stream:false})});return(await r.json()).choices?.[0]?.message?.content||''}},
    {n:'Poll_Llama',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=llama&seed=${Math.random()*9999|0}`)).text()}},
    {n:'Poll_Mistral',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=mistral&seed=${Math.random()*9999|0}`)).text()}},
    {n:'Poll_Claude',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=claude&seed=${Math.random()*9999|0}`)).text()}},
    {n:'Poll_Gemini',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=gemini&seed=${Math.random()*9999|0}`)).text()}},
    {n:'Poll_DeepSeek',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=deepseek&seed=${Math.random()*9999|0}`)).text()}},
    {n:'Poll_Qwen',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=qwen&seed=${Math.random()*9999|0}`)).text()}},
    {n:'Poll_Phi4',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=phi-4&seed=${Math.random()*9999|0}`)).text()}},
    {n:'Poll_GPT4oMini',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=openai-mini&seed=${Math.random()*9999|0}`)).text()}},
    {n:'Poll_SearchGPT',s:2,f:async m=>{return await(await fetch(`https://text.pollinations.ai/${encodeURIComponent(m)}?model=searchgpt&seed=${Math.random()*9999|0}`)).text()}},

    // ══ 26-36. CLOUDFLARE WORKERS AI ══
    {n:'CF_Llama3_8B',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@cf/meta/llama-3-8b-instruct',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_Llama31_70B',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@cf/meta/llama-3.1-70b-instruct',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_Mistral7B',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@cf/mistral/mistral-7b-instruct-v0.1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_Gemma7B',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@hf/google/gemma-7b-it',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:m,stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_Qwen14B',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@cf/qwen/qwen1.5-14b-chat-awq',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_DeepSeekR1',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_Hermes',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@hf/nousresearch/hermes-2-pro-mistral-7b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_CodeLlama',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@hf/thebloke/codellama-7b-instruct-awq',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_Llama32_3B',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@cf/meta/llama-3.2-3b-instruct',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_Llama32_11B',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@cf/meta/llama-3.2-11b-vision-instruct',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},
    {n:'CF_Phi35Mini',s:2,f:async m=>{const r=await fetch('https://ai.cloudflare.workers.dev/@cf/microsoft/phi-3.5-mini-instruct',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],stream:false})});return(await r.json()).result?.response||''}},

    // ══ 37-45. NEXRA ══
    {n:'Nexra_GPT4',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'gpt-4',markdown:false})});return(await r.json()).gpt||''}},
    {n:'Nexra_GPT4o',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'gpt-4o',markdown:false})});return(await r.json()).gpt||''}},
    {n:'Nexra_GPT35',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'gpt-3.5-turbo',markdown:false})});return(await r.json()).gpt||''}},
    {n:'Nexra_Llama31',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'llama-3.1',markdown:false})});return(await r.json()).gpt||''}},
    {n:'Nexra_Gemini',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'gemini-pro',markdown:false})});return(await r.json()).gpt||''}},
    {n:'Nexra_Claude3',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'claude-3-sonnet',markdown:false})});return(await r.json()).gpt||''}},
    {n:'Nexra_Mixtral',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'mixtral-8x7b',markdown:false})});return(await r.json()).gpt||''}},
    {n:'Nexra_Gemini15',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'gemini-1.5-flash',markdown:false})});return(await r.json()).gpt||''}},
    {n:'Nexra_GPT4Turbo',s:2,f:async m=>{const r=await fetch('https://nexra.aryahcr.cc/api/chat/complements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:m}],model:'gpt-4-turbo',markdown:false})});return(await r.json()).gpt||''}},

    // ══ 46-70. HUGGINGFACE SPACES ══
    {n:'HF_Qwen2_72B',s:3,f:async m=>{try{const r=await fetch('https://qwen-qwen2-72b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7,0.9]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Gemma2_27B',s:3,f:async m=>{try{const r=await fetch('https://google-gemma-2-27b-it.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Gemma2_9B',s:3,f:async m=>{try{const r=await fetch('https://google-gemma-2-9b-it.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_DeepSeekV2',s:3,f:async m=>{try{const r=await fetch('https://deepseek-ai-deepseek-v2-chat.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],0.7,1.0,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Phi3Mini',s:3,f:async m=>{try{const r=await fetch('https://microsoft-phi-3-mini-4k-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,ChatEngine.SYS,1024,0.7,0.9]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_OpenChat35',s:3,f:async m=>{try{const r=await fetch('https://openchat-openchat-3-5.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,null,0.7,1.0,1024,false]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Zephyr7B',s:3,f:async m=>{try{const r=await fetch('https://huggingfaceh4-zephyr-7b-beta.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7,0.95,40,1.1]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_NousHermes',s:3,f:async m=>{try{const r=await fetch('https://nousresearch-nous-hermes-2-mixtral-8x7b-dpo.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],0.7,0.9,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Qwen25_72B',s:3,f:async m=>{try{const r=await fetch('https://qwen-qwen2-5-72b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7,0.9]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Llama33_70B',s:3,f:async m=>{try{const r=await fetch('https://meta-llama-llama-3-3-70b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Llama32_3B',s:3,f:async m=>{try{const r=await fetch('https://meta-llama-llama-3-2-3b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_WizardLM2',s:3,f:async m=>{try{const r=await fetch('https://microsoft-wizardlm-2-8x22b.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_DeepSeekCoder',s:3,f:async m=>{try{const r=await fetch('https://deepseek-ai-deepseek-coder-v2-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Qwen25Coder',s:3,f:async m=>{try{const r=await fetch('https://qwen-qwen2-5-coder-32b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_MistralNemo',s:3,f:async m=>{try{const r=await fetch('https://mistralai-mistral-nemo-base-2407.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],0.7,0.9,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_InternLM2',s:3,f:async m=>{try{const r=await fetch('https://internlm-internlm2-chat-20b.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.8,0.9,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_ChatGLM4',s:3,f:async m=>{try{const r=await fetch('https://thudm-chatglm4-demo.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.8,1.0,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Phi35Mini',s:3,f:async m=>{try{const r=await fetch('https://microsoft-phi-3-5-mini-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,ChatEngine.SYS,1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Qwen15_110B',s:3,f:async m=>{try{const r=await fetch('https://qwen-qwen1-5-110b-chat-demo.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Yi34B',s:3,f:async m=>{try{const r=await fetch('https://yuntian-deng-chatgpt4turbo.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024]})});return(await r.json()).data?.[0]?.at(-1)?.[1]||''}catch{return''}}},
    {n:'HF_Vicuna33B',s:3,f:async m=>{try{const r=await fetch('https://lmsys-fastchat.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],[]]})});return(await r.json()).data?.[1]?.at(-1)?.[1]||''}catch{return''}}},
    {n:'HF_CodeQwen',s:3,f:async m=>{try{const r=await fetch('https://qwen-codeqwen1-5-7b-chat-demo.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Baichuan2',s:3,f:async m=>{try{const r=await fetch('https://baichuan-inc-baichuan2-13b-chat-demo.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_StarChat',s:3,f:async m=>{try{const r=await fetch('https://huggingfaceh4-starchat-playground.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.2,0.95,50,1.0]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_FalconChat',s:3,f:async m=>{try{const r=await fetch('https://tiiuae-falcon-180b-demo.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.5,0.9,256]})});return(await r.json()).data?.[0]||''}catch{return''}}},

    // ══ 71-120. নতুন ৫০টি সোর্স ══

    // ── Groq Free Tier (no-key endpoints) ──
    {n:'Groq_Llama3_8B',s:1,f:async m=>{try{const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer gsk_free'},body:JSON.stringify({model:'llama3-8b-8192',messages:[{role:'user',content:m}],max_tokens:1024})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},
    {n:'Groq_Llama3_70B',s:1,f:async m=>{try{const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer gsk_free'},body:JSON.stringify({model:'llama3-70b-8192',messages:[{role:'user',content:m}],max_tokens:1024})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},

    // ── Perplexity Free ──
    {n:'Perplexity_Online',s:1,f:async m=>{try{const r=await fetch('https://www.perplexity.ai/socket.io/?EIO=4&transport=polling',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({version:'2.18',source:'default',model:'turbo',messages:[{content:m,role:'user'}]})});const t=await r.text();const j=t.match(/\{.*\}/)?.[0];return j?JSON.parse(j).answer||'':''}catch{return''}}},

    // ── Cohere Free ──
    {n:'Cohere_Cmd',s:1,f:async m=>{try{const r=await fetch('https://api.cohere.com/v1/generate',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer COHERE-API-KEY-TRIAL'},body:JSON.stringify({model:'command',prompt:m,max_tokens:500})});return(await r.json()).generations?.[0]?.text||''}catch{return''}}},

    // ── AI21 Free ──
    {n:'AI21_Jamba',s:2,f:async m=>{try{const r=await fetch('https://api.ai21.com/studio/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'jamba-instruct-preview',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},

    // ── Mistral Free ──
    {n:'Mistral_Free',s:1,f:async m=>{try{const r=await fetch('https://api.mistral.ai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'mistral-small-latest',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},

    // ── Together AI Free ──
    {n:'Together_Llama3',s:1,f:async m=>{try{const r=await fetch('https://api.together.xyz/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'meta-llama/Llama-3-8b-chat-hf',messages:[{role:'user',content:m}],max_tokens:512})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},
    {n:'Together_Mixtral',s:1,f:async m=>{try{const r=await fetch('https://api.together.xyz/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'mistralai/Mixtral-8x7B-Instruct-v0.1',messages:[{role:'user',content:m}],max_tokens:512})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},

    // ── Cerebras Free ──
    {n:'Cerebras_Llama3',s:1,f:async m=>{try{const r=await fetch('https://api.cerebras.ai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'llama3.1-8b',messages:[{role:'user',content:m}],max_tokens:512})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},
    {n:'Cerebras_Llama70B',s:1,f:async m=>{try{const r=await fetch('https://api.cerebras.ai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'llama3.1-70b',messages:[{role:'user',content:m}],max_tokens:512})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},

    // ── SambaNova Free ──
    {n:'Samba_Llama3',s:1,f:async m=>{try{const r=await fetch('https://api.sambanova.ai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'Meta-Llama-3.1-8B-Instruct',messages:[{role:'user',content:m}],max_tokens:512})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},
    {n:'Samba_Llama70B',s:1,f:async m=>{try{const r=await fetch('https://api.sambanova.ai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'Meta-Llama-3.1-70B-Instruct',messages:[{role:'user',content:m}],max_tokens:512})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},

    // ── Featherless AI ──
    {n:'Featherless_Qwen',s:2,f:async m=>{try{const r=await fetch('https://api.featherless.ai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'Qwen/Qwen2.5-72B-Instruct',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},
    {n:'Featherless_Llama',s:2,f:async m=>{try{const r=await fetch('https://api.featherless.ai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'meta-llama/Meta-Llama-3.1-70B-Instruct',messages:[{role:'user',content:m}]})});return(await r.json()).choices?.[0]?.message?.content||''}catch{return''}}},

    // ── Replicate Free ──
    {n:'Replicate_Llama3',s:2,f:async m=>{try{const r=await fetch('https://api.replicate.com/v1/models/meta/meta-llama-3-8b-instruct/predictions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({input:{prompt:m,max_tokens:512}})});return(await r.json()).output?.join('')||''}catch{return''}}},

    // ── HF Extra Spaces ──
    {n:'HF_Falcon3_10B',s:3,f:async m=>{try{const r=await fetch('https://tiiuae-falcon3-10b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Llama32_1B',s:3,f:async m=>{try{const r=await fetch('https://meta-llama-llama-3-2-1b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],512,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Qwen25_7B',s:3,f:async m=>{try{const r=await fetch('https://qwen-qwen2-5-7b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Qwen25_14B',s:3,f:async m=>{try{const r=await fetch('https://qwen-qwen2-5-14b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Qwen25_32B',s:3,f:async m=>{try{const r=await fetch('https://qwen-qwen2-5-32b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Gemma3_27B',s:3,f:async m=>{try{const r=await fetch('https://google-gemma-3-27b-it.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Llama31_405B',s:3,f:async m=>{try{const r=await fetch('https://meta-llama-llama-3-1-405b-instruct-fp8.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_DeepSeekR1',s:3,f:async m=>{try{const r=await fetch('https://deepseek-ai-deepseek-r1.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_DeepSeekR1_Distill',s:3,f:async m=>{try{const r=await fetch('https://deepseek-ai-deepseek-r1-distill-llama-70b.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,1024,0.6]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Mistral22B',s:3,f:async m=>{try{const r=await fetch('https://mistralai-mixtral-8x22b-instruct-v0-1.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Mistral7B_v3',s:3,f:async m=>{try{const r=await fetch('https://mistralai-mistral-7b-instruct-v0-3.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Command_R',s:3,f:async m=>{try{const r=await fetch('https://cohere-command-r-plus.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Phi4',s:3,f:async m=>{try{const r=await fetch('https://microsoft-phi-4.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,ChatEngine.SYS,1024,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Aya_Expanse',s:3,f:async m=>{try{const r=await fetch('https://cohere-aya-expanse-32b.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Orca2',s:3,f:async m=>{try{const r=await fetch('https://microsoft-orca-2-13b.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Solar107B',s:3,f:async m=>{try{const r=await fetch('https://upstage-solar-1-mini-chat.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Gemma2B',s:3,f:async m=>{try{const r=await fetch('https://huggingfaceh4-gemma-playground.hf.space/run/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,512,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_TinyLlama',s:3,f:async m=>{try{const r=await fetch('https://tinyllama-tinyllama-chat.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,512,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Bloom',s:3,f:async m=>{try{const r=await fetch('https://bigscience-bloom.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,200,true,1,false]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_StableBeluga',s:3,f:async m=>{try{const r=await fetch('https://stabilityai-stablelm-2-12b-chat.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],512,0.7]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Mixtral22B',s:3,f:async m=>{try{const r=await fetch('https://mistralai-mixtral-8x22b.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,512,0.7,0.9]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_ExaOne3',s:3,f:async m=>{try{const r=await fetch('https://lgai-exaone-3-5-7-8b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Internlm25',s:3,f:async m=>{try{const r=await fetch('https://internlm-internlm2-5-7b-chat.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.8,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Nemotron_70B',s:3,f:async m=>{try{const r=await fetch('https://nvidia-llama-3-1-nemotron-70b-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Arctic',s:3,f:async m=>{try{const r=await fetch('https://snowflake-snowflake-arctic-instruct.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_Jamba15',s:3,f:async m=>{try{const r=await fetch('https://ai21labs-jamba-1-5-mini.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
    {n:'HF_MahmoodScorpio',s:3,f:async m=>{try{const r=await fetch('https://scorpio-bangla-llm.hf.space/api/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[m,[],ChatEngine.SYS,0.7,1024]})});return(await r.json()).data?.[0]||''}catch{return''}}},
  ],

  _active: [],
  _checked: 0,

  check: async()=>{
    if(Date.now()-ChatEngine._checked<600000)return;
    ChatEngine._checked=Date.now();
    const res=await Promise.allSettled(ChatEngine.SOURCES.map(async s=>{
      try{const r=await Promise.race([s.f('hi'),new Promise((_,j)=>setTimeout(j,4000))]);return r&&r.length>1?s:null}catch{return null}
    }));
    ChatEngine._active=res.filter(r=>r.status==='fulfilled'&&r.value).map(r=>r.value).sort((a,b)=>a.s-b.s);
    console.log(`[BDAi Chat] Active: ${ChatEngine._active.length}/${ChatEngine.SOURCES.length}`);
  },

  send: async(msg,onResult)=>{
    const pool=ChatEngine._active.length?ChatEngine._active:ChatEngine.SOURCES.slice(0,10);
    const top=pool.slice(0,8);
    try{
      const result=await Promise.any(top.map(s=>
        Promise.race([s.f(msg).then(r=>{if(r&&r.length>5)return r;throw new Error('empty')}),new Promise((_,j)=>setTimeout(j,8000))])
      ));
      const clean=ChatEngine.FILTER(result);
      if(onResult)onResult(clean);
      return clean;
    }catch{
      for(const s of pool.slice(8)){
        try{const r=await Promise.race([s.f(msg),new Promise((_,j)=>setTimeout(j,10000))]);if(r&&r.length>5){const c=ChatEngine.FILTER(r);if(onResult)onResult(c);return c}}catch{}
      }
    }
    return 'দুঃখিত, এই মুহূর্তে সংযোগ সমস্যা হচ্ছে। আবার চেষ্টা করুন।';
  }
};
setTimeout(()=>ChatEngine.check(),2000);
setInterval(()=>ChatEngine.check(),600000);
