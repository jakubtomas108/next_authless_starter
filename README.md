### Authless Example

In this example, you will find out how to use the Authless REST API. Example is made with Next.js, Typescript and Chakra UI, but you can use whatever you want. The Authless-related stuff will be the same for every language/framework.

**All the Authless-related code can be found in `lib/authless.ts` file.**

**Take a look at the following summary of steps on how to use Authless:**

1. **Get your [Authless Identity Key](https://identity.authless.tech/createIdentity)**
2. Send authentication email ([sendVerificationLink API](https://app.swaggerhub.com/apis-docs/jakubtomas108/Authless/1.0#/default/post_sendVerificationLink)) to your user
3. Once the verification link is clicked, user is redirected to URL specified in step 2. Authless appends the `signature` search query to the `redirect_url`
4. Call the [verifySignature API](https://app.swaggerhub.com/apis-docs/jakubtomas108/Authless/1.0#/default/get_verifySignature) with the obtained `signature` query. If successful, you'll receive the user-related data specified in step 2
5. OPTIONAL If you plan to allow the user to navigate to a different page than the specified `redirect_url`, you need to store the signature (for example in `sessionStorage`) so you can access it from different pages.
6. OPTIONAL Make sure the user is accessing correct content by calling the [verifyCurrentTarget API](https://app.swaggerhub.com/apis-docs/jakubtomas108/Authless/1.0#/default/post_verifyCurrentTarget) with the `signature` query
7. Close the session by calling the [closeSession API](https://app.swaggerhub.com/apis-docs/jakubtomas108/Authless/1.0#/default/get_closeSession) with the `signature` query

All of the steps above are implemented in this example (expect the step 5, since we don't need to do a navigation between pages). Sending the authentication email is happening within file `components/Comment.tsx` and all the auth-related logic is happening in file `pages/edit.tsx`.

Note that implementation of Authless in this example is designed to be very simple to understand, but since Authless is unopinionated, it can be quite flexible in your own environment. You can design the authentication system in any way you wish, to fill your project needs. You can secure only small portion of your app (like this example does), or you can secure the whole app to your needs.

Our example is a comment section, where users can share their opinions. Users can of course edit their posts. We will use Authless to allow users to edit only posts that belongs to them. This simple example will explain the principles of Authless. Since we don't have any database for this example, we'll use the localStorage for storing the comments. Also no proper error handling is implemented in this example. I would recommend to implement your own logic for error handling in context of your application.

#### 1. Get an Authless Identity Key

First of all, you need to get the Authless Identity Key. Visit the [https://identity.authless.tech/createIdentity](https://identity.authless.tech/createIdentity) and fill out the form. Since Authless is passwordless, all you need to do is enter your email address and give your identity some title. You can have multiple Authless Identities connected to one email address, you just have to title them differently. After submitting the form, you'll receive the Identity Key into your email address.

Once you have the Identity Key, create `.env.local` file in root of the project, then copy the Identity Key from your email and paste it into the `.env.local` file. In addition, add the Authless API URL there as well.

```
NEXT_PUBLIC_AUTHLESS_API_URL={{API_URL}}
NEXT_PUBLIC_AUTHLESS_IDENTITY_KEY={{PASTE_YOUR_IDENTITY_KEY_HERE}}
```

#### 2. Run the example locally

Write the following into the terminal

```
$ npm i
$ npm run dev
```
