import bcrypt from 'bcryptjs';

const password = 'your_desired_password';
const saltRounds = 12;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log('Password hash:', hash);
  console.log('Add this to your .env.local file as ADMIN_PASSWORD_HASH');
});
