Steps to use Stripejs for react

1. Create Stripe.com account (https://stripe.com/)
2. Read documentation; https://stripe.com/docs/stripe-js/react
3. install => npm install --save @stripe/react-stripe-js @stripe/stripe-js
4. Goto stripe dashboard, turn on the test mode, go to developer tab
5. Get the API Keys (Publishable key/ client secret)
6. Follow the instructions in the documentation
7. CHeckout Session create api in server side
8. Create payment intent using the cart details
9. get Checkout session secret from the CHeckout Session create api
10. Bind that sesson url in the checkout component
11. Redirect to the stripe checkout page