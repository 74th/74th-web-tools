const colors = { title: '#1769D2', remote: '#7641C5' };
const tabs = [...document.querySelectorAll('[role="tab"]')];
const controlsPanel = document.querySelector('#panel-controls');
const titleTab = document.querySelector('#tab-title');
const remoteTab = document.querySelector('#tab-remote');
const colorValue = document.querySelector('#color-value');
const colorPicker = document.querySelector('#custom-color');
const jsonOutput = document.querySelector('#json-output');
const copyStatus = document.querySelector('#copy-status');
const remoteNote = document.querySelector('#remote-note');
let activeTarget = 'title';

function settingsFor(target, color) {
  const foreground = color.toUpperCase() === '#FFFFFF' ? '#000000' : '#FFFFFF';
  const colorCustomizations = target === 'title'
    ? {
        'titleBar.activeBackground': color,
        'titleBar.inactiveBackground': color,
        'titleBar.activeForeground': foreground,
        'titleBar.inactiveForeground': foreground,
      }
    : {
        'statusBarItem.remoteBackground': color,
        'statusBarItem.remoteForeground': foreground,
      };
  return { 'workbench.colorCustomizations': colorCustomizations };
}

function render() {
  const color = colors[activeTarget];
  colorValue.textContent = color;
  colorPicker.value = color.toLowerCase();
  document.querySelectorAll('.swatch').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.color === color));
  });
  jsonOutput.textContent = JSON.stringify(settingsFor(activeTarget, color), null, 2);
  document.querySelector('#target-description').textContent = activeTarget === 'title'
    ? 'ウィンドウ上部のタイトルバーに色を設定します。'
    : 'ステータスバーに表示される Remote SSH インジケーターに色を設定します。';
  document.querySelector('#preview-titlebar').style.backgroundColor = colors.title;
  document.querySelector('#preview-titlebar').style.color = colors.title.toUpperCase() === '#FFFFFF' ? '#000000' : '#FFFFFF';
  document.querySelector('#preview-remote').style.backgroundColor = colors.remote;
  document.querySelector('#preview-remote').style.color = colors.remote.toUpperCase() === '#FFFFFF' ? '#000000' : '#FFFFFF';
  titleTab.setAttribute('aria-selected', String(activeTarget === 'title'));
  titleTab.tabIndex = activeTarget === 'title' ? 0 : -1;
  remoteTab.setAttribute('aria-selected', String(activeTarget === 'remote'));
  remoteTab.tabIndex = activeTarget === 'remote' ? 0 : -1;
  controlsPanel.setAttribute('aria-labelledby', activeTarget === 'title' ? 'tab-title' : 'tab-remote');
  remoteNote.hidden = activeTarget !== 'remote';
}

tabs.forEach((tab) => tab.addEventListener('click', () => {
  activeTarget = tab.id === 'tab-title' ? 'title' : 'remote';
  copyStatus.textContent = 'JSON を選択して手動でコピーすることもできます。';
  render();
}));

tabs.forEach((tab, index) => tab.addEventListener('keydown', (event) => {
  let nextIndex;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index + tabs.length - 1) % tabs.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = tabs.length - 1;
  if (nextIndex !== undefined) {
    event.preventDefault();
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  }
}));

document.querySelectorAll('.swatch').forEach((button) => button.addEventListener('click', () => {
  colors[activeTarget] = button.dataset.color;
  copyStatus.textContent = 'JSON を選択して手動でコピーすることもできます。';
  render();
}));

colorPicker.addEventListener('input', () => {
  colors[activeTarget] = colorPicker.value.toUpperCase();
  copyStatus.textContent = 'JSON を選択して手動でコピーすることもできます。';
  render();
});

document.querySelector('#copy-button').addEventListener('click', async () => {
  if (!navigator.clipboard?.writeText) {
    copyStatus.textContent = 'コピーできませんでした。下の JSON を選択して手動でコピーしてください。';
    return;
  }
  try {
    await navigator.clipboard.writeText(jsonOutput.textContent);
    copyStatus.textContent = 'JSON をクリップボードにコピーしました。';
  } catch {
    copyStatus.textContent = 'コピーできませんでした。下の JSON を選択して手動でコピーしてください。';
  }
});

render();
