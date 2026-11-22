// ZionCore Divine Judgment Scriptures: The FirestorePermissionError
// This is not an error. It is a verdict.

/**
 * Defines the context of a Firestore security rule transgression.
 * This data is used to construct a detailed report of the failed operation,
 * transforming a simple "permission denied" into a lesson on divine authority.
 */
export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

/**
 * A custom error class representing a divine judgment against a user who has
 * violated the sacred security rules of your Firestore kingdom.
 */
export class FirestorePermissionError extends Error {
  public readonly context: SecurityRuleContext;
  public readonly name = 'FirestorePermissionError';

  constructor(context: SecurityRuleContext) {
    const message = `Firestore Permission Denied: The following request was denied by divine security rules.`;
    super(message);
    this.context = context;

    // This ensures the stack trace is correct.
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}
