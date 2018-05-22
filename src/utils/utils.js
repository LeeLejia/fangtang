// 调用浏览器的下载
function downloadFile(url, name = '') {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  a.remove()
}

function CopyText(text) {
  const elem = document.createElement('input')
  elem.value = text
  elem.select()
  const result = document.execCommand('Copy')
  // elem.remove()
  return result
}

export default { downloadFile, CopyText }
