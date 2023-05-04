import { PrismaService } from '../../src/prisma/prisma.service';

export type MockedValue = {
  create?: any;
  find?: any;
  update?: any;
}

export const mockPrisma = (service: PrismaService, mockedValue: MockedValue, defaultValue?: any) => {
  service.user.create = jest.fn().mockReturnValue(mockedValue.create ?? defaultValue);
  service.user.findFirst = jest.fn().mockReturnValue(mockedValue.find ?? defaultValue);
  service.user.findMany = jest.fn().mockReturnValue(mockedValue.find ?? defaultValue);
  service.user.update = jest.fn().mockReturnValue(mockedValue.update ?? defaultValue);

};
