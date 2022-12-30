// chrome: play() failed because the user didn't interact with the document first.
// firefox: The play method is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
// ios: NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.

export default function autoPlayFailCheck(errMsg: string) {
  const msgs = [
    'interact with the document first',
    'denied permission',
    'The operation was aborted.'
  ]
  for (const m of msgs) {
    if (errMsg.includes(m)) {
      return true
    }
  }
  return false
}