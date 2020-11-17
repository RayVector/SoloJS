function formMsgData(msgData) {
  if (typeof msgData === 'object') {
    return Object.keys(msgData).join(',')
  }

  if (Array.isArray(msgData)) {
    return msgData.join(',')
  }

  return msgData
}


export default function(msg = 'SJS syntax error', msgData = []) {
  const name = 'SJS Error'
  console.error(`${name}: ${msg} ${formMsgData(msgData)}`)
}