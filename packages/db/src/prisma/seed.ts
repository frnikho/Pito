import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient()
import {Role} from '@pito/types';

const defaultRole: Role = {
  user: {
    viewMyAccount: true,
    updateMyAccount: true,
    deleteMyAccount: true,
    view: true,
    update: false,
    delete: false,
  },
  epic: {

  },
  team: {

  },
  document: {

  },
  sprint: {

  },
  template: {

  },
  workspaceStatus: {

  },
  workspace: {
    delete: false,
    view: false,
    update: false,
    create: true,
    deleteOwned: true,
    updateOwned: true,
    viewOwned: true,
  },
  attachment: {

  },
  teamPolicy: {

  },
  userStory: {

  },
  workingTime: {

  },
  workspaceLabel: {

  },
  directory: {

  },
  library: {

  },
  role: {

  }
}

async function main() {
  const createdRole = await prisma.role.create({
    data: {
      name: 'Default',
      description: 'Default seeded role',
      default: true,
      user: defaultRole.user,
      sprint: defaultRole.sprint,
      document: defaultRole.document,
      epic: defaultRole.epic,
      template: defaultRole.template,
      team: defaultRole.team,
      teamPolicy: defaultRole.teamPolicy,
      userStory: defaultRole.userStory,
      workspaceLabel: defaultRole.workspaceLabel,
      workingTime: defaultRole.workingTime,
      workspace: defaultRole.workspace,
      workspaceStatus: defaultRole.workspaceStatus,
      attachment: defaultRole.attachment,
      role: defaultRole.role,
    }
  });
  console.log(createdRole);
}

main().then(async () => {
  console.log('Successfully seeded database !');
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect();
})