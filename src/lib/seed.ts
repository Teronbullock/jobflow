import { seedAndTestUserOperations } from "@/services/user.service";

async function main() {
  try {
    await seedAndTestUserOperations();
    console.log('Database operations complete!');
  } catch (error) {
    console.error('An error occurred during DB operations:', error);
    process.exit(1);
  }
}

main();