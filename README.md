# Fiatsend Documentation

This repository powers [docs.fiatsend.com](https://docs.fiatsend.com), Fiatsend's product and operations documentation.

## Documentation boundaries

- **docs.fiatsend.com** explains the Fiatsend product, recipient experience, business operations, coverage, fees, security, and support.
- **developer.fiatsend.com** is the source of truth for API contracts, SDKs, sandbox, webhooks, and all integration guidance.

Do not duplicate API references, endpoint examples, OpenAPI specifications, credentials, or webhook implementation details in this repository. Link to the developer portal instead.

## Local development

```bash
npm install
npm run start
```

Build the site before publishing:

```bash
npm run build
```

