export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
} as const;

export const SHIPPING = {
  valid: {
    firstName: 'Jane',
    lastName: 'Doe',
    postalCode: 'SW1A 1AA',
  },
} as const;
