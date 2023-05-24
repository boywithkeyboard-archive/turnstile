export type TurnstileError =
  /**
   * The secret parameter was not passed.
   */
  | 'missing-input-secret'
  /**
   * The secret parameter was invalid or did not exist.
   */
  | 'invalid-input-secret'
  /**
   * The response parameter was not passed.
   */
  | 'missing-input-response'
  /**
   * The response parameter is invalid or has expired.
   */
  | 'invalid-input-response'
  /**
   * The request was rejected because it was malformed.
   */
  | 'bad-request'
  /**
   * The response parameter has already been validated before.
   */
  | 'timeout-or-duplicate'
  /**
   * An internal error happened while validating the response. The request can be retried.
   */
  | 'internal-error'

type SuccessfulResponse = {
  success: true
  /**
   * ISO timestamp for the time the challenge was solved.
   */
  challenge_ts: string
  /**
   * Hostname for which the challenge was served.
   */
  hostname: string
  /**
   * List of errors that occurred.
   */
  'error-codes': []
  /**
   * Customer widget identifier passed to the widget on the client side.
   *
   * This is used to differentiate widgets using the same sitekey in analytics. Its integrity is protected by modifications from an attacker. It is recommended to validate that the action matches an expected value.
   */
  action: string
  /**
   * Customer data passed to the widget on the client side.
   *
   * This can be used by the customer to convey state. It is integrity protected by modifications from an attacker.
   */
  cdata: string
}

type ErroneousResponse = {
  success: false
  /**
   * List of errors that occurred.
   */
  'error-codes': TurnstileError[]
}

export type VerifyOptions = {
  /**
   * The site’s secret key.
   */
  secret: string
  /**
   * The response provided by the Turnstile client-side render on your site.
   */
  response: string
  /**
   * The user’s IP address.
   */
  ip?: string
}

export async function verify(
  { secret, response, ip }: VerifyOptions,
): Promise<SuccessfulResponse | ErroneousResponse> {
  const formData = new FormData()

  formData.append('secret', secret)
  formData.append('response', response)

  if (ip) {
    formData.append('remoteip', ip)
  }

  const data = await (await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: formData,
    },
  )).json()

  return data
}
