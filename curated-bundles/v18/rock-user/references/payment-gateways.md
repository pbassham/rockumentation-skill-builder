---
description: "Use when users ask about payment gateways, payment processing, credit card terminals, transaction workflows, or selecting a payment processor for donations and purchases"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Payment Gateways

Payment Gateways

When we start getting into the concepts of how financial transactions work in our modern economy things can get confusing pretty quickly. Don't worry though, we not only want you to understand how to use Rock, we also want to help you to understand the concepts of what's going on behind the scenes. Let’s help to demystify the concept of payment gateways.

We're all familiar with the concept of checking out at the store. The clerk rings up our purchases at the register and once a total amount has been determined, we swipe our card through the credit card terminal and we're done. Using this analogy Rock would play the role of the register and the payment gateway is the digital equivalent of the credit card terminal. Like the register, Rock helps determine what is being purchased/donated and comes up with a total amount. Rock then takes the guest’s account information (either their credit card or checking account information) and sends it through the terminal (aka payment gateway).

![Gateway](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/payment-gateway-analogy.jpg)

Gateway Analogy

At that point the transaction has started its journey through the financial system. In many ways you're done with it, but let's track its journey and note some places that you'll need to initially configure.

![Gateway Overview](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/payment-gateways.png)

# Learn More

You're probably thinking this is all too much information. Understanding how this works though can save even a small organization tens of thousands of dollars. One large organization recently started saving over $200K per YEAR by understanding how this process works and ensuring they received the best rates.

We highly recommend reading this [Credit Card Processing 101](http://marketing.nmi.com/credit-card-processing-101.pdf) PDF from NMI. They've made the process easy to understand with a visual walk-thru.

# Available Payment Gateways

Rock supports several payment gateways. You can find the current vendors and additional details in the Rock Shop. Rock also comes with some gateways, which we'll talk about a little later.

So, you might be wondering which one you should select? Here are some factors to consider:

- **Do you already have a gateway?** If you already use a supported gateway, then it makes the most sense to keep using it.
- **PCI:** PCI is a credit card process standard to ensure the security of credit cards. Compliance with PCI is a very time-consuming process. Some gateways drastically reduce your PCI compliance requirements by ensuring that a visitor's credit card information never touches your server.
- **Fees:** Of course, fees are a huge consideration when looking at gateways. You'll want to consider the fees and rates of each before selecting a gateway.
- **Location:** Are you located outside the United States? For countries outside the continental US, please contact Carolyn Irwin directly at [cirwin@gotnp.com](mailto:cirwin@gotnp.com).

Because each giving vendor offers different packages, you'll want to discuss your needs with all of them to determine the best fit.

It's also important to make a strategic decision when selecting a gateway. As you start building a base of scheduled gifts it will be hard to transition them to a new gateway in the future. Their card data is stored in the gateway and most gateways will not give you your cardholder data back if you choose to move. See the *Transferring Gateways* section below if you find yourself in this situation.

# Configuring a Gateway

Payment gateways can be configured under Admin Tools \> Settings \> Financial Gateways. Many settings are similar between gateways, so we'll examine the *Test Gateway* as an example.

We created the Test Gateway to let you sample Rock's tools without having to configure an actual payment gateway. But don’t be fooled by the name. Changing the Gateway Type and providing real configuration makes the Test Gateway function like any other live gateway. To avoid potential issues, we recommend against changing its configuration.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/payment-gateway-settings-v18.png)

Payment Gateway Settings

## Other Configuration Steps

The Test Gateway doesn't require credentials or login information, but other gateways will. Typically you'll receive or create these credentials as part of your setup with the gateway provider.

After you're done setting up your gateway, you'll need to set it as the active gateway on giving pages.

# Transferring Gateways

As mentioned earlier, transitioning to a new payment gateway is difficult due to the way the payment gateway providers control the credit card details. Once you set up your new payment gateway, you have two things to consider:

1. You need to prevent people from setting up new giving transactions using the old gateway.
2. You want people with scheduled transactions tied to the old gateway to transfer to the new gateway.

The first item is easily accomplished by changing the block setting on the *Give Now* page to use the new gateway. The second item is a bit trickier.

There are some block setting options on the *Manage Giving Profiles* page that will help people transfer their scheduled transactions to the new gateway. Consider adjusting these settings from the Scheduled Transaction List Lava block:

- **Gateway Filter:** Setting a particular gateway here will cause only those scheduled transactions using this gateway to show up in the output list.
- **Transfer-To Gateway:** When set, the Edit button becomes a Transfer button if the scheduled transaction's gateway does not match the transfer-to gateway. When users press the Transfer button, they will be taken to the *Give Now* page with many details from their existing transaction copied onto the form. Once the new transaction is completed, their old scheduled transaction is automatically deleted.
- **Transfer Button Text:** This setting lets you control the text that appears on the transfer button.

