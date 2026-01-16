# OAuth 2.0 Authorization Code + PKCE Demo

## Overview
This project demonstrates a **minimal OAuth 2.0 implementation** using the
**Authorization Code flow with PKCE**, built with:

- Separate **Auth Server**
- Separate **API (Resource) Server**
- **React + TypeScript** frontend

The focus is on correctness, security, and clarity rather than overengineering.

---

## Chosen OAuth Flow

### Authorization Code Flow with PKCE

This flow is chosen because:
- It is the **recommended OAuth flow for SPAs**
- No client secret is required
- PKCE protects against authorization code interception attacks

**Flow Summary:**
1. Frontend generates `code_verifier` and `code_challenge`
2. User is redirected to the Auth Server `/authorize`
3. Auth Server issues an authorization code
4. Frontend exchanges `code + code_verifier` for tokens

---

## Token Lifecycle

### Access Token
- Short-lived (5 minutes)
- JWT issued by Auth Server
- Used to access protected APIs
- Sent as: `Authorization: Bearer <access_token>`

### Refresh Token
- Long-lived
- Issued during initial authentication
- Used to obtain new access tokens without re-login

**Lifecycle:**

    Login → Access Token → Expiry → Refresh Token → New Access Token


---

## Security Considerations

- Authorization Code + PKCE (RFC 7636)
- Single-use authorization codes
- Short-lived access tokens
- JWT signature validation on API server
- Separation of Auth Server and Resource Server
- No client secrets stored in frontend

> HTTPS, persistent storage, and refresh token rotation are omitted for demo simplicity.

---

## Frontend Integration Touchpoints

The React frontend:
- Generates PKCE `code_verifier` and `code_challenge`
- Redirects the user to the Auth Server
- Handles OAuth callback and token exchange
- Stores access token in memory
- Uses refresh token to renew access tokens
- Calls protected APIs using Bearer tokens

---

## Architecture (High Level)

    [ React Frontend ]
    |
    | Authorization Code + PKCE
    v
    [ Auth Server ]
    |
    | JWT Access Token
    v
    [ API Server ]


- **Auth Server**: Handles authentication and token issuance
- **API Server**: Protects resources and validates tokens
- **Frontend**: OAuth client and API consumer

---

## Summary

This project demonstrates:
- Correct OAuth 2.0 flow selection
- Secure token lifecycle management
- Clear separation of concerns
- End-to-end frontend and backend integration