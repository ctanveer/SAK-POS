# Bento - Point of Sale (POS)

Bento - POS system is designed to seamlessly connect the front and back of house. It is an all-in-one system where a Bento staff can serve all in-house customer needs, from managing tables, to taking customized orders, to processing payments and completing order

## Main Features

1. **Table Management and Reservation:** View real-time table availability, reservations, change table status, view current ongoing order status.
2. **Order History:** View past customer orders with order details
3. **Order Management:** Menu based on current inventory status. Menu can be sorted by time of day and categories. Option to customize orders based on pre-defined add ons options and special notes. Connected to Kitchen Display System to receive instant order updates.
4. **Payment Management:** Adding waiter tip, bill-splitting, option to pay by cash or card and e-bill generated and sent to customer email
5. **Waiter Data:** Data for waiter is sent to HR, to monitor waiter efficiency and server performance.

## Folder Structure

**_Client_**

```
└── 📁pos
    └── 📁client
        └── 📁src
            └── 📁app
                └── app-routing.module.ts
                └── app.component.css
                └── app.component.html
                └── app.component.spec.ts
                └── app.component.ts
                └── app.module.ts
                └── 📁components
                    └── 📁navbar
                    └── 📁splash-logo
                └── 📁interceptors
                    └── 📁auth-interceptor
                    └── 📁error-interceptor
                    └── 📁token-interceptor
                └── 📁models
                └── 📁pages
                    └── 📁auth-redirect-page
                    └── 📁editor-page
                    └── 📁homepage
                    └── 📁order-history-page
                    └── 📁order-page
                    └── 📁page-container
                    └── 📁payment-page
                    └── 📁process-payment-page
                    └── 📁reservation-page
                    └── 📁tables-page
                └── 📁services
                    └── 📁auth-api
                    └── discount.service.ts
                    └── email.service.ts
                    └── hr.service.ts
                    └── menu.service.ts
                    └── order.service.ts
                    └── payment.service.ts
                    └── paymentlog.service.ts
                    └── reservation.service.ts
                    └── 📁socket
                    └── table.service.ts
                    └── tablelog.service.ts
                    └── 📁toast-message
            └── 📁assets
            └── 📁environments
            └── index.html
            └── main.ts
            └── styles.css
        └── package.json
        └── tsconfig.json
```

**_Server_**

```
└── 📁pos
    └── 📁server
        └── config.ts
        └── 📁controllers
            └── auth.controller.ts
            └── customer.controller.ts
            └── discount.controller.ts
            └── email.controller.ts
            └── hr.controller.ts
            └── menu.controller.ts
            └── order.controller.ts
            └── paymentLog.controller.ts
            └── reservation.controller.ts
            └── table.controller.ts
            └── tableLog.controller.ts
        └── 📁interfaces
        └── 📁logo
        └── 📁middleware
        └── 📁models
            └── 📁customer
            └── 📁order
            └── 📁paymentLog
            └── 📁table
            └── 📁tableLog
        └── 📁routers
            └── auth.router.ts
            └── customer.router.ts
            └── discount.router.ts
            └── email.router.ts
            └── hr.router.ts
            └── menu.router.ts
            └── order.router.ts
            └── paymentLog.router.ts
            └── reservation.router.ts
            └── table.router.ts
            └── tableLog.router.ts
        └── 📁services
            └── email.service.ts
            └── skeleton.service.ts
        └── 📁utils
        └── index.ts
        └── .env.example
        └── package.json
        └── tsconfig.json
```

## Getting Started

### How to Run the App Locally

To run the app on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/ctanveer/SAK-POS.git`
2. Navigate to the server directory: `cd pos/server`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open another terminal
6. Navigate to client directory: `cd pos/client`
7. Install dependencies: `npm install`
8. Start the client: `ng serve --configuration=development --o`

### Live Link

Access the live version of the app at [Bento POS](https://pos-bento.vercel.app/).
