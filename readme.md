## turnstile

> [!IMPORTANT]  
> Please [read this article](https://developers.cloudflare.com/turnstile/get-started/server-side-validation) to learn more.

### Setup

#### Deno

```ts
import { turnstile } from 'https://den.ooo/turnstile'
```

#### Node.js

```bash
npm i @boywithkeyboard/turnstile
```

```ts
import { turnstile } from '@boywithkeyboard/turnstile'
```

### Usage

```ts
// e.g.
async function handleRequest(req) {
  const body = await req.formData()

  const result = await turnstile.verify({
    secret: '...',
    response: body.get('cf-turnstile-response'),
    ip: req.headers.get('cf-connecting-ip')
  })
}
```
