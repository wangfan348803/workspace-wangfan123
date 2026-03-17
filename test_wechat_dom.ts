import { findExistingChromeDebugPort, tryConnectExisting } from './skills/baoyu-post-to-wechat/scripts/cdp.ts';

async function main() {
  try {
    const port = await findExistingChromeDebugPort();
    console.log('port:', port);
    const cdp = await tryConnectExisting(port);
    if (!cdp) {
        console.log('No CDP connection');
        return;
    }
    const targets = await cdp.send('Target.getTargets');
    
    // Find editor tab
    const editorTab = targets.targetInfos.find((t: any) => t.type === 'page' && (t.url.includes('appmsg') || t.url.includes('draft')));
    if (!editorTab) {
        console.log('No editor tab found. Available tabs:', targets.targetInfos.filter(t => t.type==='page').map(t => t.url));
        cdp.close();
        return;
    }

    const res = await cdp.send('Target.attachToTarget', { targetId: editorTab.targetId, flatten: true });
    const sessionId = (res as any).sessionId;
    await cdp.send('Page.enable', {}, { sessionId });
    await cdp.send('Runtime.enable', {}, { sessionId });
    await cdp.send('DOM.enable', {}, { sessionId });

    // evaluate
    const result = await cdp.send('Runtime.evaluate', {
      expression: `JSON.stringify({
        hasProseMirror: !!document.querySelector('.ProseMirror'),
        hasUEditor: !!document.querySelector('#ueditor_0'),
        hasOldEditor: !!document.querySelector('.js_pmEditorArea'),
        pmContent: document.querySelector('.ProseMirror')?.innerText?.slice(0, 100),
        titleVal: document.querySelector('#title')?.value,
        coverImages: Array.from(document.querySelectorAll('img[src*="getimg"]')).map(img => img.src)
      })`,
      returnByValue: true
    }, { sessionId });
    console.log('status:', (result as any).result.value);

    cdp.close();
  } catch (e) {
    console.error(e);
  }
}
main();
