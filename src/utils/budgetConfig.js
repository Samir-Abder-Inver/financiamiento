/**
 * Budget configuration for determining plan availability
 * 
 * Each budget level has a maxInitial threshold that determines
 * which plans are available to the user.
 */

export const BUDGET_THRESHOLDS = {
    10000: 18500,   // $10,000 budget -> plans with initial < $18,500 (most economical)
    15000: 22000,   // $15,000 budget -> plans with initial < $22,000
    20000: 32000,   // $20,000 budget -> plans with initial < $32,000
    30000: Infinity // $30,000 budget -> all plans
};

/**
 * Get the maximum initial value allowed for a given budget
 * @param {number} budget - The user's budget amount
 * @returns {number} - The maximum initial value for plans
 */
export const getMaxInitialForBudget = (budget) => {
    // Find the exact budget threshold or return a default
    return BUDGET_THRESHOLDS[budget] || budget;
};

/**
 * Check if a plan is available based on budget and plan initial
 * @param {number} userBudget - The user's budget amount
 * @param {number} planInitial - The plan's initial payment amount
 * @returns {boolean} - Whether the plan is available
 */
export const isPlanAvailable = (userBudget, planInitial) => {
    const maxInitial = getMaxInitialForBudget(userBudget);
    return planInitial < maxInitial;
};
