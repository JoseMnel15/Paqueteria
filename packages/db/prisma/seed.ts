import { PrismaClient, RoleName } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      { name: RoleName.ADMIN },
      { name: RoleName.RECEPTION },
    ],
    skipDuplicates: true,
  });

  const adminEmail = 'admin@local.test';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    const adminRole = await prisma.role.findFirstOrThrow({ where: { name: RoleName.ADMIN } });
    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: adminEmail,
        passwordHash,
        roleId: adminRole.id,
        active: true,
      },
    });
    console.log('Seeded admin user -> email: admin@local.test, password: admin123');
  } else {
    console.log('Admin user already exists, skipping');
  }

  console.log('Roles created or verified:', roles.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
