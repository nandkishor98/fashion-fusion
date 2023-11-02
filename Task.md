// Product Detail

1. Out of stock

if product quantity < 1, the disabled true

2. Not of stock

a. Add to cart

- created a new reducer called updateCart, pass quantity and product in that function.

- Set the quantity using the state and pass that value to the update cart function using dispatch

  b. 4 random Pics

  - create a new empty array state; random4pics; set the state using useEffect hook

  - if products is empty, use fetchProduct from product slice to fill the data

c. Product detail fetch

      - create service called getById
      - create slice called getProduct
      - bind the extrareducers to getProduct
      - in productDetail page, create a function called getProduct with callback function called getProduct of slice.
      - useselector to get the product from the state, and display with the html

d. Category Name instead of ID

- use aggregate function with match, lookup, unwind, addFields
- return the first item of the array as result[0]
- use product?.category_name in the product detail page

admin login concept

<!-- 0. Setup constant

1. create service called auth -->

<!-- 2. create slice called auth -->

<!-- 3. connect to store -->

<!-- 4. call that feature in login page if logged in -->

if login is correct, redirect user to /admin/dashboard page

1. Write utils to check the token
2. Write authSlice to handle the error using rejectedwithValue in the function
3. redirect user if successful login
4. else show the error
5. if user has valid token, check for token validity else redirect user to login page
6. allow user to access the admin dashboard

// navbar routing for admin

1. authReducer convert to persist; by adding persist feature to authReducer
2. Create Admin Navbar
3. Check for isLoggedIn State in app.jsx route
4. Create Logout Route
   a. Create reducer for unsetting all the states
   b. create remove the access token from application
   c. on logout button press, call step a and b

5. Since we are logged in as admin, send access token on every api call

6. Start create product list page

// Sign up Page

1. Sign up => call that API route to register the user
2. on register success, redirect user to add their token
3. You have successfully registered; show this message

4. Create 2 component called Verify and Regenerate

5. Create hook called useSignUp; Call functions such as register, verify, regenerate in it

6. Bind verify component with verify and regenerate hooks

7. handle the errors

File Upload in Add Product Page

<!-- 1. Use React input type file to add the file into reactjs -->
<!-- 2. Update the state of the file in array format -->

<!-- 3. add all the payload in the form data -->
<!-- 4. Set request header to form Data -->
<!-- 5. submit the data into be from API using axios -->

6. success => product successfully added => redirect to products list page
   failure => stay in the same page => display Something went wrong message