export namespace turnstile {
  export type errorMessage =
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

  export type success = {
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

  export type error = {
    success: false
    /**
     * List of errors that occurred.
     */
    'error-codes': turnstile.errorMessage[]
  }

  export async function verify({
    secret,
    response,
    ip
  }: {
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
  }): Promise<turnstile.success | turnstile.error> {
    const form = new FormData()
  
    form.append('secret', secret)
    form.append('response', response)
  
    if (ip)
      form.append('remoteip', ip)

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form
    })
  
    return await res.json() as turnstile.success | turnstile.error
  }
}
