import Stripe from 'stripe';
import UserModel from '../models/user.model.js';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
    100: 50,
    200: 120,
    500: 300
}

export const createCreditOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { amount } = req.body;

        if(!CREDIT_MAP[amount]) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${CREDIT_MAP[amount]} Credits`,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId,
                credits: CREDIT_MAP[amount]
            }
        })

        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: "Stripe checkout session creation failed"});
    }
}

export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        res.status(400).json({ message: "Webhook error" });
    }

    if(event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const userId = session.metadata.userId;
        const creditsToAdd = Number(session.metadata.credits);

        if(!userId || !creditsToAdd) {
            return res.status(400).json({ message: "Invalid session data" });
        }

        const user = await UserModel.findByIdAndUpdate(userId, {
            $inc: { credits: creditsToAdd },
            $set: { isCreditAvailable: true },
        }, { new: true });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ received: true });
    }
}