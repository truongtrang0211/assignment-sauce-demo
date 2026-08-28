import { validateEmailList } from './email-validator';

const sampleInput = [
  'john@test.com',
  'invalid-email',
  'mary@example.org',
  'john@test.com',
  'JOHN@test.com',
  'hello@world',
  'qa_user@company.io'
];

const result = validateEmailList(sampleInput);

console.log('Result:', JSON.stringify(result, null, 2));

const expectedValid = ['john@test.com', 'mary@example.org', 'john@test.com', 'qa_user@company.io'];
const expectedInvalid = ['invalid-email', 'JOHN@test.com', 'hello@world'];
const expectedDuplicates = ['john@test.com'];

const isPass =
  JSON.stringify(result.validEmails) === JSON.stringify(expectedValid) &&
  JSON.stringify(result.invalidEmails) === JSON.stringify(expectedInvalid) &&
  JSON.stringify(result.duplicateEmails) === JSON.stringify(expectedDuplicates);

if (isPass) {
  console.log('\n[PASS] Email Validator logic verified successfully!');
} else {
  console.error('\n[FAIL] Assertion failed.');
  process.exit(1);
}
