// 调用浏览器的下载
function downloadFile(url, name = '') {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  a.remove()
}
