import md5 from 'js-md5'

// 调用浏览器的下载
function DownloadFile(url, name = '') {
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

function GetAlipaylink(outTradeNo, name, money, returnUrl) {
  const params = [
    { key: 'pid', value: 7266 },
    { key: 'type', value: 'alipay' },
    { key: 'out_trade_no', value: outTradeNo },
    { key: 'notify_url', value: 'notify_url' },
    { key: 'return_url', value: returnUrl },
    { key: 'name', value: name },
    { key: 'money', value: money },
    { key: 'sitename', value: '小水管' },
  ].sort((a, b) => (a.key > b.key ? 1 : -1))
  const sortParams = `${params.map(item => `${item.key}=${item.value}`).join('&')}`
  return `http://pay.sddyun.cn/submit.php?${sortParams}&sign_type=MD5&sign=${md5(params)}`
}

export default { DownloadFile, CopyText, GetAlipaylink }
