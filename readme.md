## turnstile

A type-safe module to validate the response of the [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile) widget on the server.

```ts
import * as turnstile from 'https://deno.land/x/turnstile@v0.1.0/mod.ts'

const result = await turnstile.verify({
  secret: '...',
  response: '...',
  ip: '...'
})
```

###### [Learn more](https://developers.cloudflare.com/turnstile/get-started/server-side-validation)
