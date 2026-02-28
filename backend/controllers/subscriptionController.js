import Subscription from '../models/Subscription.js';

// @desc    Get subscription status for current clinic
// @route   GET /api/subscriptions/mine
// @access  Private/Admin
const getMySubscription = async (req, res, next) => {
    try {
        let subscription = await Subscription.findOne({ clinicAdmin: req.user._id });

        // If no subscription exists, create a default "Free" one
        if (!subscription) {
            subscription = await Subscription.create({
                clinicAdmin: req.user._id,
                planTier: 'Free',
            });
        }

        res.json(subscription);
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle subscription plan (Simulate upgrade/downgrade)
// @route   PUT /api/subscriptions/toggle
// @access  Private/Admin
const toggleSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOne({ clinicAdmin: req.user._id });

        if (!subscription) {
            res.status(404);
            throw new Error('Subscription records not found');
        }

        subscription.planTier = subscription.planTier === 'Free' ? 'Pro' : 'Free';
        const updatedSubscription = await subscription.save();

        res.json(updatedSubscription);
    } catch (error) {
        next(error);
    }
};

export { getMySubscription, toggleSubscription };
