// 调用浏览器的下载
function downloadFile(url, name = '') {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  a.remove()
}

function CopyText(text) {
  const textarea = document.createElement('textarea')
  textarea.style.position = 'fixed'
  textarea.style.top = 0
  textarea.style.left = 0
  textarea.style.border = 'none'
  textarea.style.outline = 'none'
  textarea.style.resize = 'none'
  textarea.style.background = 'transparent'
  textarea.style.color = 'transparent'

  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  const result = document.execCommand('copy')
  document.body.removeChild(textarea)
  return result
}

export default { downloadFile, CopyText }
